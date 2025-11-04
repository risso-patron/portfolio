import { useState } from 'react';

export default function ImportManager({ onImport }) {
  const [previewData, setPreviewData] = useState(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState(null);
  const [importStats, setImportStats] = useState(null);

  // Manejar selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Verificar extensión
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      setError('Solo se aceptan archivos .csv o .txt');
      return;
    }

    setError(null);
    setPreviewData(null);
    setImportStats(null);

    // Leer y parsear el archivo
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const parsed = parseCSV(text);
        setPreviewData(parsed);
      } catch (err) {
        setError(`Error al leer el archivo: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  // Parsear CSV manualmente (sin dependencias externas)
  const parseCSV = (text) => {
    // Limpiar BOM (Byte Order Mark) y normalizar el texto
    let cleanText = text;
    
    // Eliminar BOM UTF-8 si existe
    if (cleanText.charCodeAt(0) === 0xFEFF) {
      cleanText = cleanText.slice(1);
    }
    
    // Reemplazar diferentes tipos de saltos de línea
    cleanText = cleanText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    const lines = cleanText.split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('El archivo debe tener al menos una fila de datos');
    }

    // Primera línea = headers
    // Limpiar caracteres especiales, tildes, espacios extras y convertir a minúsculas
    const rawHeaders = lines[0].split(',').map(h => h.trim());
    const normalizedHeaders = rawHeaders.map(h => 
      h.toLowerCase()
       .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
       .replace(/[^\w\s]/g, '') // Eliminar caracteres especiales excepto espacios
       .trim()
    );
    
    console.log('Headers detectados:', normalizedHeaders);
    console.log('Headers originales:', rawHeaders);
    
    // Validar headers requeridos (sin tildes para comparación)
    const requiredHeaders = ['tipo', 'descripcion', 'monto', 'fecha'];
    const missingHeaders = requiredHeaders.filter(h => !normalizedHeaders.includes(h));
    if (missingHeaders.length > 0) {
      // Mostrar headers detectados para debugging
      throw new Error(`Faltan columnas requeridas: ${missingHeaders.join(', ')}. Detectadas: ${normalizedHeaders.join(', ')}`);
    }

    // 🔥 CREAR MAPA DE ÍNDICES POR NOMBRE DE COLUMNA
    // Esto permite que las columnas estén en cualquier orden
    const columnIndexMap = {};
    normalizedHeaders.forEach((header, idx) => {
      columnIndexMap[header] = idx;
    });
    
    console.log('Mapa de columnas:', columnIndexMap);
    // Ejemplo: { tipo: 0, descripcion: 1, monto: 2, fecha: 3, categoria: 4 }
    // O si están desordenadas: { fecha: 0, tipo: 1, descripcion: 2, categoria: 3, monto: 4 }

    // Parsear filas
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      // Permitir filas con menos columnas (categoría opcional)
      if (values.length < 4) continue; // Al menos tipo, descripcion, monto, fecha
      
      // 🔥 MAPEAR VALORES POR NOMBRE DE COLUMNA (no por índice)
      // Normalizar valores: minúsculas y trim
      let fecha = (values[columnIndexMap['fecha']] || '').trim();
      
      // Normalizar formato de fecha: 3/11/2025 → 03/11/2025
      if (fecha.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const parts = fecha.split('/');
        fecha = `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${parts[2]}`;
      }
      
      // Convertir monto a valor absoluto (siempre positivo)
      let monto = (values[columnIndexMap['monto']] || '').trim();
      const montoNum = parseFloat(monto);
      if (!isNaN(montoNum)) {
        monto = Math.abs(montoNum).toString();
      }
      
      const row = {
        tipo: (values[columnIndexMap['tipo']] || '').toLowerCase().trim(),
        descripcion: (values[columnIndexMap['descripcion']] || '').trim(),
        monto: monto,
        fecha: fecha,
        categoria: columnIndexMap['categoria'] !== undefined ? (values[columnIndexMap['categoria']] || '').trim() : '',
      };

      // Validar fila
      const validation = validateRow(row);
      if (validation.valid) {
        data.push({ ...row, rowNumber: i + 1 });
      } else {
        console.warn(`Fila ${i + 1} omitida: ${validation.error}`, row);
      }
    }

    return data;
  };

  // Validar una fila individual
  const validateRow = (row) => {
    // Tipo debe ser "ingreso" o "gasto" (ya viene normalizado a minúsculas)
    if (!['ingreso', 'gasto'].includes(row.tipo)) {
      return { valid: false, error: 'Tipo debe ser "ingreso" o "gasto"' };
    }

    // Descripción no vacía
    if (!row.descripcion || row.descripcion.trim() === '') {
      return { valid: false, error: 'Descripción vacía' };
    }

    // Monto debe ser número positivo (ya fue convertido a absoluto en el parseo)
    const amount = parseFloat(row.monto);
    if (isNaN(amount) || amount <= 0) {
      return { valid: false, error: 'Monto inválido (debe ser un número positivo)' };
    }

    // Fecha debe ser válida (YYYY-MM-DD o DD/MM/YYYY)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(row.fecha)) {
      return { valid: false, error: 'Fecha inválida (usar YYYY-MM-DD o DD/MM/YYYY)' };
    }

    return { valid: true };
  };

  // Ejecutar importación
  const handleImport = async () => {
    if (!previewData || previewData.length === 0) return;

    setImporting(true);
    setError(null);

    try {
      const stats = {
        total: previewData.length,
        imported: 0,
        errors: 0,
      };

      for (const row of previewData) {
        try {
          // Convertir fecha si es DD/MM/YYYY
          let date = row.fecha;
          if (date.includes('/')) {
            const [day, month, year] = date.split('/');
            date = `${year}-${month}-${day}`;
          }

          // Determinar categoría (solo para gastos)
          const category = row.categoria || 'Otros';

          // Llamar a la función onImport del parent
          if (row.tipo.toLowerCase() === 'ingreso') {
            await onImport('income', {
              description: row.descripcion,
              amount: parseFloat(row.monto),
              date,
            });
          } else {
            await onImport('expense', {
              description: row.descripcion,
              category,
              amount: parseFloat(row.monto),
              date,
            });
          }

          stats.imported++;
        } catch (err) {
          console.error(`Error importando fila ${row.rowNumber}:`, err);
          stats.errors++;
        }
      }

      setImportStats(stats);
      setPreviewData(null);
    } catch (err) {
      setError(`Error durante la importación: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  // Descargar plantilla CSV
  const downloadTemplate = () => {
    const template = `tipo,descripcion,monto,fecha,categoria
ingreso,Salario,2500.00,2025-11-01,
gasto,Supermercado,45.50,2025-11-05,Comida
gasto,Netflix,12.99,2025-11-10,Entretenimiento
ingreso,Freelance,350.00,2025-11-15,
gasto,Gasolina,60.00,2025-11-18,Transporte
gasto,Restaurante,85.25,2025-11-20,Comida
ingreso,Venta producto,120.00,2025-11-22,
gasto,Farmacia,22.50,2025-11-25,Salud
gasto,Gym,40.00,2025-11-28,Ejercicio
gasto,Amazon,75.99,2025-11-30,Compras`;

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plantilla-transacciones.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Importar Transacciones
        </h3>
        <button
          onClick={downloadTemplate}
          className="text-sm px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          Descargar Plantilla CSV
        </button>
      </div>

      {/* Instrucciones */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Formato del archivo CSV:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>• Primera línea: <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">tipo,descripcion,monto,fecha,categoria</code></li>
          <li>• <strong>Las columnas pueden estar en cualquier orden</strong> - se detectan por nombre</li>
          <li>• Tipo: "ingreso" o "gasto" (minúsculas)</li>
          <li>• Fecha: YYYY-MM-DD o DD/MM/YYYY</li>
          <li>• Monto: número positivo (usar punto para decimales)</li>
          <li>• <strong>IMPORTANTE</strong>: Guarda desde Excel como "CSV UTF-8 (delimitado por comas)"</li>
        </ul>
      </div>

      {/* Selector de archivo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          1. Seleccionar archivo CSV:
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="file"
            accept=".csv,.txt"
            onChange={handleFileSelect}
            className="flex-1 text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-purple-50 file:text-purple-700
              dark:file:bg-purple-900/30 dark:file:text-purple-300
              hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50
              file:cursor-pointer cursor-pointer"
          />
          {previewData && previewData.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{previewData.length} transacciones detectadas</span>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Vista previa */}
      {previewData && previewData.length > 0 && (
        <div className="mb-6 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              2. Vista previa
            </h4>
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 px-3 py-1 rounded-full">
              {previewData.length} transacciones
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-800">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">Descripción</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">Monto</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">Categoría</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {previewData.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full font-semibold ${
                        row.tipo.toLowerCase() === 'ingreso'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {row.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-300 font-medium">{row.descripcion}</td>
                    <td className="px-4 py-3 text-sm font-bold text-gray-900 dark:text-white">${parseFloat(row.monto).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.fecha}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {row.categoria ? (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{row.categoria}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {previewData.length > 10 && (
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-3 text-center font-medium">
              ... y {previewData.length - 10} transacciones más (mostrando primeras 10)
            </p>
          )}

          {/* Botón de importación destacado */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleImport}
              disabled={importing}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg 
                hover:from-purple-700 hover:to-pink-700 
                transform hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-3"
            >
              {importing ? (
                <>
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Importando {previewData.length} transacciones...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>3. Importar {previewData.length} transacciones al Dashboard</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
            
            {/* Información adicional */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Logros se desbloquearán automáticamente</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                <span>Estadísticas se actualizarán en tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resultado de importación */}
      {importStats && (
        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500 dark:bg-green-600 rounded-full">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-green-900 dark:text-green-300">
                ¡Importación Completada con Éxito!
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Tus transacciones ya están en el dashboard
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{importStats.total}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total procesadas</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{importStats.imported}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Importadas ✓</div>
            </div>
            {importStats.errors > 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{importStats.errors}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Omitidas</div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">Próximos pasos:</p>
              <ul className="space-y-1">
                <li>✓ Desplázate hacia arriba para ver tus transacciones</li>
                <li>✓ Revisa el Balance General actualizado</li>
                <li>✓ Verifica los gráficos con tus nuevos datos</li>
                <li>✓ Chequea qué logros desbloqueaste en la sección de Gamificación</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
