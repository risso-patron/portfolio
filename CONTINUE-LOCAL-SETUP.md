# 🤖 GUÍA: Continue con IA Local (Sin Internet)

## 📋 RESUMEN
Esta guía te ayudará a configurar Continue con Ollama para tener un asistente de código que funciona **100% offline**.

---

## ✅ ESTADO ACTUAL

- [x] Ollama instalado ✅
- [x] Continue instalado ✅
- [x] Configuración creada ✅
- [ ] Modelo descargado ⏳
- [ ] Probado funcionamiento ⏳

---

## 🚀 PRÓXIMOS PASOS

### **1. REINICIAR TU PC**
Ollama necesita un reinicio para funcionar correctamente.

```cmd
# Después del reinicio, verifica que Ollama esté corriendo:
ollama --version
```

### **2. DESCARGAR UN MODELO LOCAL**

Elige según tu RAM disponible:

#### **Opción A: Si tienes 8-12GB RAM** (Recomendado para empezar)
```cmd
ollama pull deepseek-coder:1.3b
```
- ✅ Rápido
- ✅ Consume poca RAM (~2GB)
- ⚠️ Menos preciso

#### **Opción B: Si tienes 12-16GB RAM** (Mejor balance)
```cmd
ollama pull deepseek-coder:6.7b
```
- ✅ Buena velocidad
- ✅ Calidad decente
- ⚠️ Consume ~6GB RAM

#### **Opción C: Si tienes 16GB+ RAM** (Mejor calidad)
```cmd
ollama pull codellama:13b
```
- ✅ Mejor calidad de código
- ⚠️ Más lento
- ⚠️ Consume ~10GB RAM

#### **Descargar modelo de embeddings** (opcional pero recomendado)
```cmd
ollama pull nomic-embed-text
```
Este modelo permite a Continue entender mejor tu código.

---

## 🔧 CONFIGURACIÓN ACTUAL

Tu archivo `config.json` de Continue ya está configurado en:
```
C:\Users\luisr\AppData\Roaming\Code\User\globalStorage\continue.continue\config.json
```

**Configuración actual:**
- **Modelo principal**: `deepseek-coder:6.7b`
- **Autocompletado**: `deepseek-coder:6.7b`
- **Embeddings**: `nomic-embed-text`
- **Servidor**: `http://localhost:11434`

---

## 📝 CÓMO USAR CONTINUE

### **1. Abrir Continue**
- Presiona `Ctrl + L` o haz clic en el ícono de Continue en la barra lateral

### **2. Chat con tu código**
```
Tú: Explica esta función
Tú: Cómo puedo mejorar este código?
Tú: Genera un README para este proyecto
```

### **3. Autocompletado**
- Empieza a escribir código
- Continue sugerirá código automáticamente
- Presiona `Tab` para aceptar

### **4. Seleccionar código y preguntar**
1. Selecciona código en el editor
2. Presiona `Ctrl + L`
3. Pregunta: "¿Qué hace este código?"

### **5. Comandos personalizados**
- `/test` - Genera unit tests
- `/edit` - Modifica el código seleccionado
- `/comment` - Agrega comentarios

---

## 🔍 VERIFICAR QUE TODO FUNCIONA

### **1. Verificar Ollama**
```cmd
# Ver si Ollama está corriendo
ollama list

# Debería mostrar los modelos descargados
# Ejemplo:
# NAME                      ID              SIZE
# deepseek-coder:6.7b      abc123          4.1GB
```

### **2. Probar el modelo**
```cmd
# Chat directo con el modelo
ollama run deepseek-coder:6.7b "Escribe una función de fibonacci en JavaScript"
```

### **3. Probar Continue**
1. Abre cualquier archivo `.js` en tu proyecto
2. Presiona `Ctrl + L`
3. Pregunta: "¿Cómo puedo mejorar mi código?"
4. Deberías ver una respuesta del modelo local

---

## 🎯 COMPARACIÓN: OLLAMA LOCAL vs COPILOT

| Característica | Ollama Local | GitHub Copilot |
|----------------|--------------|----------------|
| **Requiere internet** | ❌ No | ✅ Sí |
| **Costo** | 💰 Gratis | 💰 $10/mes |
| **Privacidad** | 🔒 100% local | ☁️ En la nube |
| **Velocidad** | ⚡ Depende de tu PC | ⚡⚡ Rápido |
| **Calidad** | ⭐⭐⭐ Buena | ⭐⭐⭐⭐⭐ Excelente |
| **Uso de RAM** | 🐏 4-10GB | 🐏 Mínimo |

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### **Problema: "Ollama no está corriendo"**
```cmd
# Verifica si Ollama está activo
ollama --version

# Si no funciona, reinicia el servicio
net start ollama
```

### **Problema: "El modelo es muy lento"**
- Cambia a un modelo más pequeño:
```cmd
ollama pull deepseek-coder:1.3b
```
- Actualiza `config.json` cambiando `deepseek-coder:6.7b` por `deepseek-coder:1.3b`

### **Problema: "Continue no responde"**
1. Verifica que Ollama esté corriendo: `ollama list`
2. Reinicia VS Code
3. Abre la consola de Continue (ícono Continue → ⚙️ → "Show Logs")

### **Problema: "No tengo suficiente RAM"**
```cmd
# Usa el modelo más ligero
ollama pull deepseek-coder:1.3b

# O prueba con TinyLlama (muy ligero)
ollama pull tinyllama
```

---

## 📊 MODELOS ALTERNATIVOS

Si `deepseek-coder` no te funciona bien, prueba estos:

### **Para JavaScript/Frontend:**
```cmd
ollama pull codellama:7b
```

### **Para Python:**
```cmd
ollama pull codellama:13b-python
```

### **Modelo general (no solo código):**
```cmd
ollama pull mistral:7b
```

### **Modelo súper ligero (4GB RAM):**
```cmd
ollama pull tinyllama
```

---

## 🎓 MEJORES PRÁCTICAS

### **1. Para proyectos pequeños:**
- Usa `deepseek-coder:1.3b` (rápido y eficiente)

### **2. Para análisis complejo:**
- Usa `codellama:13b` si tienes RAM suficiente

### **3. Para ahorrar batería:**
- Desactiva el autocompletado cuando no lo uses:
  ```json
  "tabAutocompleteModel": null
  ```

### **4. Para mejor contexto:**
- Descarga `nomic-embed-text` (mejora la comprensión del código)

---

## 📱 ATAJOS DE TECLADO

| Atajo | Acción |
|-------|--------|
| `Ctrl + L` | Abrir Continue chat |
| `Ctrl + I` | Edit inline (modificar código) |
| `Ctrl + Shift + R` | Refactorizar código |
| `Tab` | Aceptar sugerencia de autocompletado |
| `Esc` | Rechazar sugerencia |

---

## 🔄 ACTUALIZAR MODELOS

```cmd
# Actualizar un modelo existente
ollama pull deepseek-coder:6.7b

# Eliminar un modelo que no uses
ollama rm deepseek-coder:1.3b

# Ver todos los modelos instalados
ollama list
```

---

## 🎯 CONFIGURACIÓN AVANZADA

### **Cambiar modelo según el lenguaje**

Edita `config.json` para usar diferentes modelos:

```json
{
  "models": [
    {
      "title": "DeepSeek (JavaScript)",
      "provider": "ollama",
      "model": "deepseek-coder:6.7b"
    },
    {
      "title": "CodeLlama (Python)",
      "provider": "ollama",
      "model": "codellama:13b-python"
    }
  ]
}
```

### **Activar/Desactivar telemetría**
Ya está desactivada en tu config:
```json
"allowAnonymousTelemetry": false
```

---

## 📚 RECURSOS ADICIONALES

- **Ollama**: https://ollama.ai
- **Continue**: https://continue.dev
- **Modelos disponibles**: https://ollama.ai/library
- **Comunidad Continue**: https://discord.gg/continue

---

## ✅ CHECKLIST DE INSTALACIÓN

- [ ] Ollama instalado
- [ ] PC reiniciado
- [ ] Modelo descargado (`ollama pull deepseek-coder:6.7b`)
- [ ] Embeddings descargado (`ollama pull nomic-embed-text`)
- [ ] Continue configurado (ya hecho ✅)
- [ ] Probado con `Ctrl + L`
- [ ] Autocompletado funciona con `Tab`

---

## 🎉 SIGUIENTE PASO

**Después de reiniciar tu PC, ejecuta:**

```cmd
ollama pull deepseek-coder:6.7b
ollama pull nomic-embed-text
```

**Luego:**
1. Abre VS Code
2. Presiona `Ctrl + L`
3. Pregunta: "Hola, ¿puedes ayudarme con mi código?"

**¡Y listo! Tendrás tu asistente de IA local funcionando** 🚀

---

**Creado para**: Jorge Luis Risso Patrón (@Luisitorisso)  
**Fecha**: Noviembre 2025  
**Versión**: 1.0
