# NIÑO ALERT 🌊🛡️

Prototipo web educativo para informar y orientar a la comunidad frente a riesgos asociados al Fenómeno El Niño en Trujillo, La Libertad.

## Funciones incluidas

- 🏠 Inicio con estado de referencia.
- 🗺️ Mapa demostrativo con filtros de zonas seguras, riesgo y ayuda.
- 🎒 Mochila de emergencia con checklist y progreso guardado en el navegador.
- 📋 Guía Antes / Durante / Después.
- 🔔 Centro de alertas de demostración.
- 🆘 Modo emergencia con recomendaciones generales y accesos telefónicos.
- 📊 Panel de datos.
- ⚙️ Configuración y modo oscuro.
- 📱 Diseño responsive para celular y escritorio.
- 📲 Manifest para instalar como PWA en navegadores compatibles.

## Importante sobre los datos

Este repositorio contiene **datos demostrativos** para presentar el concepto. Las zonas seguras, zonas de riesgo, alertas, rutas y demás información operativa deben sustituirse por información oficial y actualizada antes de utilizar la aplicación para decisiones reales de seguridad.

## Cómo probarla en CodePen

1. Abre CodePen y crea un Pen nuevo.
2. Copia el contenido de `index.html` en HTML.
3. Copia `style.css` en CSS.
4. Copia `script.js` en JS.
5. Para usar el logo local en CodePen, súbelo a un servicio de imágenes o usa el panel de Assets de CodePen y reemplaza `assets/logo.png` por la URL generada.

## Cómo subirla a GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube `index.html`, `style.css`, `script.js`, `manifest.webmanifest` y la carpeta `assets`.
3. En GitHub entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera a que GitHub Pages publique el sitio.

## Estructura

```text
nino-alert/
├── index.html
├── style.css
├── script.js
├── manifest.webmanifest
├── README.md
└── assets/
    └── logo.png
```

## Próximas mejoras

- Integrar un mapa real con datos geográficos verificados.
- Conectar alertas a fuentes oficiales.
- Incorporar información oficial de puntos de evacuación y servicios.
- Añadir un backend para administrar alertas.
- Implementar notificaciones web reales con un sistema de servidor.
