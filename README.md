# 🏑 CULP Hockey — App de Análisis de Rivales

App web para el equipo Primera Damas de CULP. Permite analizar rivales, registrar partidos, mantener la tabla de posiciones y ver el ranking de goleadoras.

---

## 🚀 Cómo publicar en Vercel (paso a paso)

### Paso 1 — Crear cuenta en GitHub
1. Ir a [github.com](https://github.com) y crear una cuenta gratuita (si ya tenés, saltear este paso)

### Paso 2 — Subir el proyecto a GitHub
1. En GitHub, hacer clic en **"New repository"** (botón verde)
2. Nombre: `culp-hockey`
3. Dejarlo en **Public** o **Private** (cualquiera funciona)
4. Hacer clic en **"Create repository"**
5. En la página que aparece, hacer clic en **"uploading an existing file"**
6. Arrastrar TODOS los archivos de esta carpeta al área de upload
7. Hacer clic en **"Commit changes"**

### Paso 3 — Publicar en Vercel
1. Ir a [vercel.com](https://vercel.com) y crear una cuenta **con tu cuenta de GitHub**
2. Hacer clic en **"Add New Project"**
3. Seleccionar el repositorio `culp-hockey`
4. Vercel detecta automáticamente que es un proyecto Vite/React
5. Hacer clic en **"Deploy"**
6. En ~2 minutos tenés una URL pública tipo `culp-hockey.vercel.app`

### Paso 4 — Agregar la API Key de Anthropic
Para que el escáner de planillas funcione:
1. En Vercel, ir a tu proyecto → **Settings** → **Environment Variables**
2. Agregar:
   - **Name:** `VITE_ANTHROPIC_API_KEY`
   - **Value:** tu API key de Anthropic (conseguila en [console.anthropic.com](https://console.anthropic.com))
3. Hacer clic en **"Save"**
4. Ir a **Deployments** y hacer **"Redeploy"** para que tome el cambio

---

## 📱 Funcionalidades
- **Inicio:** resumen de estadísticas, posición en tabla, goleadoras de CULP
- **Rivales:** análisis táctico completo de cada equipo rival
- **Escanear planilla:** subí una foto de la planilla y la IA extrae los datos
- **Tabla:** posiciones del torneo
- **Goleadoras:** ranking completo con filtros por equipo

## 💾 Almacenamiento
Los datos se guardan en el **navegador de cada usuario** (localStorage). Cada persona que use la app tiene sus propios datos independientes.

---

## 🛠 Desarrollo local
```bash
npm install
npm run dev
```
Abrir [http://localhost:5173](http://localhost:5173)
