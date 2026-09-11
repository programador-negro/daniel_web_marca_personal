# Guía Rápida de SEO Técnico & Presencia Social (Open Graph)
**Dominio:** `https://danielib.com`  
**Propietario:** Daniel Ibarra

Esta guía detalla los pasos para indexar el sitio web en Google y asegurar que las vistas previas sociales (Open Graph) se muestren atractivas al compartir tu enlace en LinkedIn, Twitter/X, WhatsApp y Slack.

---

## 1. Archivos e Implementaciones Listas en el Proyecto

Ya se encuentran generados y configurados los siguientes recursos:

1. **Imagen Oficial de Previaje Social (Open Graph 1200x630):**
   - Ruta pública: `https://danielib.com/og-image.png` y `https://danielib.com/og-image.jpg`
   - Formato optimizado para LinkedIn, WhatsApp, Twitter/X y Facebook.
2. **Meta Etiquetas en `index.html`:**
   - `og:title`, `og:description`, `og:image`, `og:image:width`, `og:image:height`.
   - `twitter:card="summary_large_image"` y `twitter:image`.
   - `canonical` a `https://danielib.com/`.
   - `theme-color` en `#ffffff`.
3. **Marcado Estructurado JSON-LD (Schema.org):**
   - Entidad **Person**: nombre, rol, especialidades técnicas, GitHub, email.
   - Entidad **ProfessionalService**: catálogo de servicios, alcance internacional (USA, Colombia, Remoto).
   - Entidad **FAQPage**: 6 preguntas frecuentes estructuradas para activar los acordeones interactivos en los resultados de búsqueda de Google.
4. **Archivos de Rastreo:**
   - `sitemap.xml`: Mapa de secciones indexables con etiquetas `hreflang` bilingües (`es` / `en`).
   - `robots.txt`: Directivas abiertas que apuntan al `sitemap.xml`.

---

## 2. Validación de la Vista Previa Social (Open Graph)

Una vez que el sitio esté publicado en tu servidor, puedes verificar cómo lo interpretan las plataformas usando estas herramientas gratuitas:

### A. LinkedIn Post Inspector
* **URL:** [https://www.linkedin.com/post-inspector/](https://www.linkedin.com/post-inspector/)
* **Paso:** Ingresa `https://danielib.com/` y pulsa "Inspect".
* **Resultado:** LinkedIn leerá el título, la descripción y cargará la imagen de 1200x630, limpiando además la caché de previsualización.

### B. Facebook Sharing Debugger
* **URL:** [https://developers.facebook.com/tools/debug/](https://developers.facebook.com/tools/debug/)
* **Paso:** Introduce `https://danielib.com/` y haz clic en "Depurar" (o "Scrape Again").

### C. WhatsApp & Telegram
* Al enviar el enlace `https://danielib.com/` en un chat, se generará una tarjeta con la imagen del banner, tu nombre y tu título profesional.

---

## 3. Alta en Google Search Console

Para que Google indexe tu web en pocos días y rastree todas tus secciones:

1. Ingresa a **[Google Search Console](https://search.google.com/search-console/)** con tu cuenta de correo (`daniel.ibarra.dev@gmail.com`).
2. Selecciona **"Prefijo de la URL"** e introduce `https://danielib.com/` (o selecciona **"Dominio"** `danielib.com`).
3. **Verificación:**
   - **Método recomendado (Registro TXT en DNS):** Copia el valor del registro TXT proporcionado por Google y agrégalo en la zona DNS de IONOS.
   - **Método alternativo (Archivo HTML):** Si prefieres archivo, descarga el archivo HTML de Google y colócalo en la carpeta `/public` de tu proyecto antes del despliegue.
4. Una vez verificado, ve al menú lateral izquierdo: **Sitemaps**.
5. En "Añadir un nuevo sitemap", escribe:
   ```text
   sitemap.xml
   ```
6. Haz clic en **Enviar**. El estado pasará a *"Correcto"*.

---

## 4. Validación de Rich Snippets (Schema.org / FAQPage)

Puedes probar que Google reconozca tus datos estructurados:

* **Herramienta de Resultados Enriquecidos de Google:**  
  [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results)
* Introduce `https://danielib.com/` y haz clic en "Probar URL".
* Confirmará la presencia de las entidades `FAQPage`, `Person` y `ProfessionalService`.
