# 📥 Guía de Importación CSV

## Cómo usar la importación masiva de transacciones

### 1️⃣ Formato requerido del archivo CSV

Tu archivo CSV debe tener estas columnas en la **primera fila** (headers):

```
tipo,descripcion,monto,fecha,categoria
```

#### Descripción de columnas:

| Columna | Requerida | Valores aceptados | Ejemplo |
|---------|-----------|------------------|---------|
| `tipo` | ✅ Sí | `ingreso` o `gasto` | `ingreso` |
| `descripcion` | ✅ Sí | Texto descriptivo | `Salario de Octubre` |
| `monto` | ✅ Sí | Número positivo (punto para decimales) | `2500.50` |
| `fecha` | ✅ Sí | `YYYY-MM-DD` o `DD/MM/YYYY` | `2025-11-15` |
| `categoria` | ⚠️ Solo gastos | Una de las categorías válidas | `Comida` |

#### Categorías válidas para gastos:
- Comida
- Transporte
- Vivienda
- Entretenimiento
- Salud
- Educación
- Compras
- Servicios
- Ejercicio
- Otros

---

### 2️⃣ Convertir tu Excel a CSV

#### Opción A: Desde Excel (Windows)

1. Abre tu archivo Excel con los gastos
2. **Organiza las columnas** según el formato requerido:
   - Columna A: tipo (ingreso/gasto)
   - Columna B: descripcion
   - Columna C: monto
   - Columna D: fecha
   - Columna E: categoria (opcional)
3. Haz clic en **Archivo → Guardar como**
4. Selecciona **Tipo de archivo**: `CSV (delimitado por comas) (*.csv)`
5. Guarda el archivo

#### Opción B: Desde Google Sheets

1. Abre tu hoja de cálculo
2. Organiza las columnas según el formato
3. **Archivo → Descargar → Valores separados por comas (.csv)**
4. El archivo se descargará automáticamente

---

### 3️⃣ Ejemplo de conversión

**Tu Excel actual podría verse así:**

| Descripción | Cantidad | Fecha |
|-------------|----------|-------|
| Supermercado | 45.50 | 05/11/2025 |
| Netflix | 12.99 | 10/11/2025 |

**Debes convertirlo a:**

| tipo | descripcion | monto | fecha | categoria |
|------|-------------|-------|-------|-----------|
| gasto | Supermercado | 45.50 | 05/11/2025 | Comida |
| gasto | Netflix | 12.99 | 10/11/2025 | Entretenimiento |

**Resultado final en CSV:**
```
tipo,descripcion,monto,fecha,categoria
gasto,Supermercado,45.50,05/11/2025,Comida
gasto,Netflix,12.99,10/11/2025,Entretenimiento
```

---

### 4️⃣ Usar la importación en la app

1. Abre la aplicación de presupuesto
2. Desplázate hasta la sección **"Importar Transacciones"**
3. Haz clic en **"Descargar Plantilla CSV"** para ver un ejemplo
4. Haz clic en **"Seleccionar archivo CSV"**
5. Selecciona tu archivo `.csv` convertido
6. Revisa la **vista previa** de las primeras 10 transacciones
7. Si todo se ve bien, haz clic en **"Importar X transacciones"**
8. Verás estadísticas de importación (total, importadas, errores)

---

### 5️⃣ Consejos y solución de problemas

#### ✅ TIPS:
- **Usa punto (.) para decimales**, no coma: `45.50` ✅, no `45,50` ❌
- **Fechas consistentes**: Usa siempre el mismo formato
- **Tipo en minúsculas**: `ingreso` y `gasto` (no `Ingreso` o `GASTO`)
- **Descripción sin comas**: Si tu descripción tiene comas, enciérrala entre comillas: `"Compra en supermercado, pan y leche"`
- **Categoría opcional para ingresos**: Puedes dejar la columna vacía

#### ❌ Errores comunes:

**Error**: "Faltan columnas requeridas"
- **Solución**: Verifica que la primera línea tenga: `tipo,descripcion,monto,fecha,categoria`

**Error**: "Tipo debe ser 'ingreso' o 'gasto'"
- **Solución**: Revisa que la columna `tipo` solo tenga `ingreso` o `gasto` (en minúsculas)

**Error**: "Monto inválido"
- **Solución**: Verifica que el monto sea un número positivo sin símbolos ($, €, etc.)

**Error**: "Fecha inválida"
- **Solución**: Usa formato `2025-11-15` o `15/11/2025`

**Filas omitidas durante importación**:
- **Solución**: Revisa la consola del navegador (F12) para ver qué filas tuvieron problemas

---

### 6️⃣ Ejemplo completo de plantilla

Descarga la plantilla incluida en `docs/plantilla-transacciones.csv` y ábrela en Excel/Sheets para ver un ejemplo funcional.

```csv
tipo,descripcion,monto,fecha,categoria
ingreso,Salario,2500,2025-11-01,
gasto,Supermercado,45.50,2025-11-05,Comida
gasto,Netflix,12.99,2025-11-10,Entretenimiento
ingreso,Freelance,350,2025-11-15,
gasto,Gasolina,60.00,2025-11-18,Transporte
gasto,Restaurante,85.25,2025-11-20,Comida
ingreso,Venta de producto,120,2025-11-22,
gasto,Farmacia,22.50,2025-11-25,Salud
gasto,Gym,40.00,2025-11-28,Ejercicio
gasto,Amazon,75.99,2025-11-30,Compras
```

---

### 7️⃣ Gamificación

**¡Importante!** 🎮

Cada transacción importada cuenta para desbloquear logros:
- ✅ Primer Ingreso
- ✅ Primer Gasto
- ✅ 10 transacciones registradas
- ✅ 50 transacciones registradas
- ✅ En Verde (balance positivo)
- ✅ Y más...

Si importas 100 transacciones de golpe, podrías desbloquear **múltiples logros** de una vez! 🏆

---

### 8️⃣ Procesamiento masivo

El importador procesa las transacciones **secuencialmente** (una por una) para:
- ✅ Registrar cada transacción en el sistema
- ✅ Actualizar estadísticas de gamificación
- ✅ Desbloquear logros progresivamente
- ✅ Guardar en localStorage

**Tiempo estimado**: ~10-50ms por transacción

**Ejemplo**:
- 100 transacciones = ~1-5 segundos
- 500 transacciones = ~5-25 segundos
- 1000 transacciones = ~10-50 segundos

---

### 9️⃣ Preguntas frecuentes

**P: ¿Puedo importar varias veces el mismo archivo?**
R: Sí, pero se crearán transacciones duplicadas. Actualmente no hay detección de duplicados.

**P: ¿Qué pasa si una fila tiene error?**
R: Se omite esa fila y se continúa con las siguientes. Al final verás cuántas se importaron y cuántas fallaron.

**P: ¿Puedo usar Excel directamente sin convertir a CSV?**
R: No, por ahora solo se aceptan archivos `.csv` o `.txt` delimitados por comas.

**P: ¿Se pueden importar archivos grandes (1000+ transacciones)?**
R: Sí, pero el navegador puede tardar un poco en procesar. Recomendamos importar en lotes de 500 transacciones.

**P: ¿Los datos importados se sincronizan con Supabase?**
R: Actualmente las transacciones se guardan en `localStorage`. La sincronización con Supabase está en desarrollo.

---

## 📞 Soporte

Si tienes problemas con la importación:
1. Revisa esta guía
2. Descarga la plantilla de ejemplo
3. Abre la consola del navegador (F12) para ver errores
4. Verifica que tu CSV cumpla exactamente el formato

---

**Última actualización**: Noviembre 2025
**Versión**: 1.0
