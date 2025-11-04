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
    const headers = rawHeaders.map(h => 
      h.toLowerCase()
       .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar tildes
       .replace(/[^\w\s]/g, '') // Eliminar caracteres especiales excepto espacios
       .trim()
    );
    
    console.log('Headers detectados:', headers);
    console.log('Headers originales:', rawHeaders);
    
    // Validar headers requeridos (sin tildes para comparación)
    const requiredHeaders = ['tipo', 'descripcion', 'monto', 'fecha'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      // Mostrar headers detectados para debugging
      throw new Error(`Faltan columnas requeridas: ${missingHeaders.join(', ')}. Detectadas: ${headers.join(', ')}`);
    }

    // Parsear filas
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      // Permitir filas con menos columnas (categoría opcional)
      if (values.length < 4) continue; // Al menos tipo, descripcion, monto, fecha
      
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx] || '';
      });

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
    // Tipo debe ser "ingreso" o "gasto"
    if (!['ingreso', 'gasto'].includes(row.tipo?.toLowerCase())) {
      return { valid: false, error: 'Tipo debe ser "ingreso" o "gasto"' };
    }

    // Descripción no vacía
    if (!row.descripcion || row.descripcion.trim() === '') {
      return { valid: false, error: 'Descripción vacía' };
    }

    // Monto debe ser número positivo
    const amount = parseFloat(row.monto);
    if (isNaN(amount) || amount <= 0) {
      return { valid: false, error: 'Monto inválido' };
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
          <li>• Tipo: "ingreso" o "gasto" (minúsculas)</li>
          <li>• Fecha: YYYY-MM-DD o DD/MM/YYYY</li>
          <li>• Monto: número positivo (usar punto para decimales)</li>
          <li>• <strong>IMPORTANTE</strong>: Guarda desde Excel como "CSV UTF-8 (delimitado por comas)"</li>
        </ul>
      </div>

      {/* Selector de archivo */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Seleccionar archivo CSV:
        </label>
        <input
          type="file"
          accept=".csv,.txt"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-purple-50 file:text-purple-700
            dark:file:bg-purple-900/30 dark:file:text-purple-300
            hover:file:bg-purple-100 dark:hover:file:bg-purple-900/50
            file:cursor-pointer cursor-pointer"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Vista previa */}
      {previewData && previewData.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            Vista previa ({previewData.length} transacciones):
          </h4>
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tipo</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Descripción</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Monto</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Fecha</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Categoría</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {previewData.slice(0, 10).map((row, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        row.tipo.toLowerCase() === 'ingreso'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {row.tipo}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-300">{row.descripcion}</td>
                    <td className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">${parseFloat(row.monto).toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{row.fecha}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{row.categoria || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {previewData.length > 10 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              ... y {previewData.length - 10} más
            </p>
          )}

          <button
            onClick={handleImport}
            disabled={importing}
            className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {importing ? 'Importando...' : `Importar ${previewData.length} transacciones`}
          </button>
        </div>
      )}

      {/* Resultado de importación */}
      {importStats && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-300 mb-2">
            Importación completada!
          </h4>
          <ul className="text-sm text-green-800 dark:text-green-400 space-y-1">
            <li>• Total: {importStats.total} transacciones</li>
            <li>• Importadas: {importStats.imported}</li>
            {importStats.errors > 0 && (
              <li className="text-yellow-700 dark:text-yellow-400">
                • Errores: {importStats.errors}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
