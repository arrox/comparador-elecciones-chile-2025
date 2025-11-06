# 📦 Instrucciones de Deployment - Comparador Electoral Chile 2025

## ✅ Build Completado

La aplicación ya está compilada y lista para producción en la carpeta `dist/`

**Archivos generados:**
- `index.html` - Página principal
- `assets/` - CSS y JavaScript optimizados
- `fotos/` - Imágenes de candidatos
- `.htaccess` - Configuración para Apache
- `_redirects` - Configuración para Netlify
- `vercel.json` - Configuración para Vercel

---

## 🌐 Opciones de Hosting

### **Opción 1: Hosting Tradicional (cPanel, FileZilla, FTP)**

Si tienes un hosting tradicional con cPanel o acceso FTP:

#### Pasos:
1. **Conectar vía FTP/cPanel File Manager**
   - Abre tu cliente FTP (FileZilla, WinSCP, etc.)
   - O accede a cPanel → File Manager

2. **Subir archivos**
   - Ve a la carpeta `public_html/` o `www/` o `htdocs/`
   - Sube **TODO** el contenido de la carpeta `dist/`:
     - `index.html`
     - Carpeta `assets/`
     - Carpeta `fotos/`
     - Archivo `.htaccess` (importante para las rutas)
     - `vite.svg`

3. **Verificar .htaccess**
   - Asegúrate que el archivo `.htaccess` se haya subido
   - Si no se ve, habilita "Mostrar archivos ocultos" en tu cliente FTP

4. **Acceder**
   - Visita tu dominio: `https://tudominio.com`

#### ⚠️ Importante:
- Si vas a subir a una subcarpeta (ej: `tudominio.com/elecciones`), necesitas modificar el `base` en `vite.config.js` antes de hacer el build

---

### **Opción 2: Netlify (Gratis, Recomendado)**

#### Método A - Drag & Drop (Más fácil):
1. Ve a [netlify.com](https://netlify.com)
2. Crea una cuenta gratis
3. Click en "Add new site" → "Deploy manually"
4. **Arrastra la carpeta `dist/`** completa a la zona de drop
5. Netlify detectará automáticamente el archivo `_redirects`
6. ¡Listo! Te dará una URL tipo `nombre-random.netlify.app`

#### Método B - Git (Automático):
1. Sube tu proyecto a GitHub/GitLab
2. Conecta Netlify con tu repositorio
3. Configuración:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Cada vez que hagas push, se desplegará automáticamente

---

### **Opción 3: Vercel (Gratis, Muy rápido)**

1. Ve a [vercel.com](https://vercel.com)
2. Crea cuenta gratis con GitHub
3. Click "Add New..." → "Project"
4. Importa tu repositorio de GitHub
5. Configuración automática:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"

---

### **Opción 4: GitHub Pages (Gratis)**

1. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Agregar en `package.json`:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Modificar `vite.config.js`:**
   ```javascript
   export default defineConfig({
     base: '/nombre-repositorio/',
     // resto de configuración...
   })
   ```

4. **Desplegar:**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub:**
   - Ve a Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages → root

---

## 🔧 Solución de Problemas Comunes

### Problema: Las rutas no funcionan (Error 404 en /candidato/x)
**Solución:**
- **Apache:** Verifica que `.htaccess` esté subido y el módulo `mod_rewrite` esté habilitado
- **Nginx:** Necesitas agregar configuración en el servidor
- **Netlify/Vercel:** Usa los archivos `_redirects` o `vercel.json` incluidos

### Problema: CSS o imágenes no cargan
**Solución:**
- Verifica que subiste la carpeta `assets/` completa
- Verifica que subiste la carpeta `fotos/` completa
- Revisa la consola del navegador para ver qué archivos faltan

### Problema: "Cannot GET /candidato/123"
**Solución:**
- El servidor necesita redireccionar todas las rutas a `index.html`
- Usa el `.htaccess` proporcionado (Apache)
- Para Nginx, contacta a tu proveedor de hosting

---

## 📊 Estadísticas del Build

- **HTML:** 0.46 KB (gzip: 0.30 KB)
- **CSS:** 79.21 KB (gzip: 11.24 KB)
- **JavaScript:** 473.99 KB (gzip: 145.38 KB)
- **Total aproximado:** ~550 KB

---

## 🚀 Optimizaciones Aplicadas

✅ Compresión GZIP automática
✅ Caché del navegador configurado
✅ Imágenes WebP optimizadas
✅ CSS y JS minificados
✅ Tree-shaking aplicado
✅ Lazy loading de rutas

---

## 📝 Próximos Pasos

1. ✅ Build completado
2. ⏳ Elegir opción de hosting
3. ⏳ Subir archivos
4. ⏳ Verificar funcionamiento
5. ⏳ Configurar dominio personalizado (opcional)

---

## 🆘 ¿Necesitas Ayuda?

Si tienes dudas sobre tu tipo específico de hosting, dime:
- ¿Qué proveedor usas? (ej: Hostinger, Bluehost, GoDaddy, etc.)
- ¿Tienes acceso a cPanel?
- ¿O prefieres usar un servicio gratuito como Netlify?

¡Te ayudaré con instrucciones específicas!
