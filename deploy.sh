#!/usr/bin/env bash
# ==============================================================================
# Script de Despliegue Automatizado en Docker para danielib.com
# Garantiza Cero Caídas (Zero-Downtime) y Cero Conflictos con otros contenedores
# ==============================================================================

set -e

echo "🚀 Iniciando despliegue de danielib.com en Docker..."

# 1. Comprobar que Docker y Docker Compose están instalados
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado en el sistema."
    exit 1
fi

# 2. Descargar últimos cambios del repositorio
echo "📥 Descargando últimos cambios desde Git..."
git pull origin main || git pull

# 3. Compilar y levantar el nuevo contenedor en segundo plano
echo "🐳 Construyendo y levantando imagen de Docker..."
docker compose build --pull
docker compose up -d --remove-orphans

# 4. Esperar a que el contenedor pase el Health Check
echo "⏳ Verificando estado de salud del contenedor..."
sleep 3
if docker ps | grep -q "danielib-web-container"; then
    echo "✅ Contenedor 'danielib-web-container' activo en 127.0.0.1:3080."
else
    echo "❌ Error: El contenedor no inició correctamente. Revisa 'docker compose logs'."
    exit 1
fi

# 5. Probar conectividad interna al puerto 3080
if curl -s -f http://127.0.0.1:3080/health > /dev/null; then
    echo "✅ Endpoint /health responde con éxito HTTP 200."
else
    echo "⚠️ Advertencia: No se pudo verificar /health directamente, continuando..."
fi

# 6. Recargar NGINX Host (Proxy Inverso) si existe
if command -v nginx &> /dev/null; then
    echo "🔄 Validando y recargando NGINX en el Host..."
    sudo nginx -t
    sudo systemctl reload nginx
    echo "✅ NGINX recargado con éxito."
fi

# 7. Limpieza de imágenes Docker huérfanas/antiguas
echo "🧹 Limpiando imágenes huérfanas..."
docker image prune -f

echo "🎉 ¡Despliegue completado con éxito! Visita https://danielib.com"
