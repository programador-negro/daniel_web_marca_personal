# Guía de Despliegue en Docker para Producción (VPS Linux / IONOS)
**Sitio Web:** [danielib.com](https://danielib.com) | **Proyecto:** Web Marca Personal & Plataforma de Servicios
**Modo de Ejecución:** Contenedor Docker Aislado (`danielib-web-container`) detrás de Nginx Reverse Proxy

---

## 📌 Diagnóstico de Puertos y Coexistencia de Contenedores

Tu servidor VPS ejecuta actualmente múltiples servicios y contenedores en puertos críticos. Esta arquitectura Docker está diseñada específicamente para **no colisionar con ninguno de ellos**:

| Puerto / Servicio | Estado Actual en VPS | ¿Cómo se integra con `danielib.com` en Docker? | ¿Existe riesgo de conflicto? |
| :--- | :--- | :--- | :--- |
| **80 / 443** | NGINX en Host (Proxy Inverso) | Recibe el tráfico entrante de `danielib.com`, gestiona el SSL y hace `proxy_pass http://127.0.0.1:3080;` hacia Docker. | **❌ CERO CONFLICTO**: Nginx enruta por `server_name` a diferentes contenedores según el dominio. |
| **3000** | Contenedor / App existente (Node/Next/Grafana) | **INTACTO**: `danielib.com` NO utiliza el puerto 3000. Utiliza el puerto interno **3080** mapeado a `127.0.0.1`. | **❌ CERO CONFLICTO**: El puerto 3000 sigue 100% libre y exclusivo para tu app existente. |
| **8000** | Contenedor / Backend (Python/FastAPI/Django) | **INTACTO**: Ningún componente de esta app compite ni se vincula con el puerto 8000. | **❌ CERO CONFLICTO**. |
| **5432** | Contenedor / PostgreSQL existente | **INTACTO**: No se requiere base de datos local en este contenedor. | **❌ CERO CONFLICTO**. |
| **3080** | Asignado exclusivamente a `danielib-web-container` | Escucha únicamente en la interfaz local (`127.0.0.1:3080`). No está expuesto públicamente a internet. | **✅ AISLADO Y SEGURO**. |

---

## 🏗️ Arquitectura de la Solución

```
                              Internet (HTTPS / Port 443)
                                           │
                                           ▼
                 ┌──────────────────────────────────────────────────┐
                 │          NGINX Host (Proxy Inverso + SSL)         │
                 │              /etc/nginx/sites-available/         │
                 └─────────┬──────────────────────────────┬─────────┘
                           │                              │
           server_name danielib.com         server_name otro-dominio.com
                           │                              │
                           ▼                              ▼
                 ┌───────────────────┐          ┌───────────────────┐
                 │  Docker Container │          │   Tus Otras Apps  │
                 │ danielib-web      │          │  (Puertos 3000,   │
                 │ 127.0.0.1:3080    │          │   8000, etc.)     │
                 │ (Nginx Alpine)    │          └───────────────────┘
                 └───────────────────┘
```

---

## 🚀 Pasos de Despliegue (Paso a Paso Seguro)

### 1. Conéctate a tu VPS por SSH
```bash
ssh daniel@IP_DE_TU_VPS  # o root@IP_DE_TU_VPS
```

---

### 2. Clonar o Actualizar el Repositorio en el VPS

Crea el directorio de la aplicación (por ejemplo en `/var/www/danielib.com` o `~/apps/danielib.com`):
```bash
sudo mkdir -p /var/www/danielib.com
sudo chown -R $USER:$USER /var/www/danielib.com
cd /var/www/danielib.com

# Clonar el proyecto (o hacer git pull si ya existe)
git clone https://github.com/programador-negro/daniel-web-marca-personal.git . || git pull
```

---

### 3. Construir y Levantar el Contenedor Docker

Ejecuta Docker Compose:
```bash
docker compose up -d --build
```

Comprueba que el contenedor esté corriendo en el puerto interno 3080:
```bash
docker ps --filter "name=danielib-web-container"
```
*Salida esperada:*
```
CONTAINER ID   IMAGE                 STATUS                   PORTS                      NAMES
a1b2c3d4e5f6   danielib-web:latest   Up 20 seconds (healthy)  127.0.0.1:3080->80/tcp     danielib-web-container
```

---

### 4. Configurar NGINX Host Inicial (Solo HTTP para permitir a Certbot)

> 💡 **Nota Importante:** Nginx no puede iniciar con configuración SSL si el archivo `/etc/letsencrypt/live/danielib.com/fullchain.pem` aún no ha sido creado por Certbot. Por eso, primero creamos la configuración HTTP temporal:

Edita o crea el archivo:
```bash
sudo nano /etc/nginx/sites-available/danielib.com
```

Pega esta configuración inicial en puerto 80:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name danielib.com www.danielib.com;

    location / {
        proxy_pass http://127.0.0.1:3080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Habilita el sitio en NGINX:
```bash
sudo ln -sf /etc/nginx/sites-available/danielib.com /etc/nginx/sites-enabled/
```

Valida la sintaxis y recarga NGINX:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

### 5. Generar Certificado SSL con Certbot (Automático)

Ejecuta Certbot:
```bash
sudo certbot --nginx -d danielib.com -d www.danielib.com --agree-tos -m daniel.ibarra.dev@gmail.com --no-eff-email
```

*Certbot configurará automáticamente el bloque HTTPS en tu archivo `/etc/nginx/sites-available/danielib.com` y creará los certificados en `/etc/letsencrypt/live/danielib.com/` sin causar ningún conflicto con tus otros dominios ni contenedores.*

---

### 6. Despliegues Posteriores en 1 Solo Paso (`deploy.sh`)

Cada vez que hagas un cambio en tu repositorio y quieras actualizar en producción:
```bash
cd /var/www/danielib.com
chmod +x deploy.sh
./deploy.sh
```

El script se encargará automáticamente de:
1. Hacer `git pull`
2. Construir la nueva imagen de Docker (`docker compose build`)
3. Recrear el contenedor con `docker compose up -d` (sin caídas de servicio)
4. Validar el estado de salud `/health`
5. Recargar NGINX host con `systemctl reload nginx`
6. Limpiar imágenes residuales de Docker

---

## 🛡️ Seguridad y Buenas Prácticas

- **Consumo Mínimo:** La imagen final basada en `nginx:1.27-alpine` pesa menos de **25 MB** y consume menos de **15 MB de memoria RAM**.
- **Límite de Recursos en Docker:** Configurado en `docker-compose.yml` (`cpus: '0.50'`, `memory: 128M`) para garantizar que nunca sature tu VPS.
- **Firewall UFW:** No es necesario abrir el puerto 3080 en el Firewall UFW porque está restringido a `127.0.0.1` (localhost). Solo los puertos 80 y 443 del host están abiertos al público.
- **Rotación de Logs:** Configurada en Docker para evitar que los logs llenen el disco (`max-size: "10m"`, `max-file: "3"`).
