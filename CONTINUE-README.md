# 🤖 Continue + Ollama: IA Local para VS Code

## ⚡ INSTALACIÓN RÁPIDA (3 pasos)

### 1️⃣ Instalar Ollama
```cmd
setup-continue.bat
```
- **Después**: Reinicia tu PC 🔄

### 2️⃣ Descargar modelos (después del reinicio)
```cmd
setup-ollama-models.bat
```
- Descarga ~4GB, tarda 5-15 minutos según tu internet

### 3️⃣ Verificar que todo funciona
```cmd
test-continue.bat
```

---

## 🎯 USO RÁPIDO

### En VS Code:
- `Ctrl + L` → Abre chat con Continue
- `Ctrl + I` → Edita código inline
- `Tab` → Acepta sugerencias

### Ejemplos:
```
"Explica esta función"
"Genera tests para este código"
"Cómo puedo mejorar este código?"
"Escribe un README para este proyecto"
```

---

## 📊 MODELOS INCLUIDOS

| Modelo | Tamaño | RAM | Para |
|--------|--------|-----|------|
| `deepseek-coder:6.7b` | 4GB | 12GB | Código general ⭐ |
| `nomic-embed-text` | 274MB | 2GB | Entender contexto |

---

## 🔧 ARCHIVOS IMPORTANTES

- **CONTINUE-LOCAL-SETUP.md** → Guía completa con troubleshooting
- **setup-continue.bat** → Instala Ollama
- **setup-ollama-models.bat** → Descarga modelos
- **test-continue.bat** → Verifica instalación

---

## ⚠️ REQUISITOS

- ✅ Windows 10/11
- ✅ 12GB RAM mínimo (16GB recomendado)
- ✅ 5GB espacio en disco
- ✅ VS Code instalado

---

## 🚨 PROBLEMAS COMUNES

### "Ollama no funciona"
→ Reinicia tu PC después de instalar

### "Modelo muy lento"
→ Usa `deepseek-coder:1.3b` (más ligero)
```cmd
ollama pull deepseek-coder:1.3b
```

### "Continue no responde"
→ Verifica: `ollama list`

---

## 📚 Documentación completa
Lee **CONTINUE-LOCAL-SETUP.md** para más detalles

---

**Creado para**: @Luisitorisso  
**Estado**: ✅ Continue instalado | ⏳ Ollama pendiente | ⏳ Modelos pendientes
