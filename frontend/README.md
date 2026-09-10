# danielib.com — Personal Brand Landing Page

Premium B2B conversion landing page. Vanilla HTML/CSS/JS, served via Nginx in Docker.

## Project Structure

```
frontend/
├── index.html          # Single-page landing (ES/EN bilingual)
├── css/
│   └── styles.css      # Apple minimalism + Glassmorphism design system
├── js/
│   ├── i18n.js         # Translation engine + ?ref=us detection
│   └── main.js         # Scroll effects, mobile menu, honeypot form
├── Dockerfile          # Nginx Alpine (~6MB)
├── docker-compose.yml  # Production orchestration + Certbot ready
├── nginx.conf          # Hardened: Gzip, CSP, HSTS, cache policies
└── README.md
```

## Features

- **Bilingual ES/EN** — instant language switching via JS translation object
- **QR Code Detection** — `?ref=us` forces English + shows welcome banner
- **Glassmorphism UI** — `backdrop-filter: blur()` on header, cards
- **Scroll Reveal** — IntersectionObserver-based entrance animations
- **Honeypot Spam Protection** — hidden form field blocks bots
- **Dynamic WhatsApp Links** — pre-configured messages per language
- **Security Headers** — X-Frame-Options, CSP, HSTS, Permissions-Policy

---

## Deployment Guide — IONOS VPS

### Prerequisites

- VPS with Ubuntu 22.04+ (or Debian 12+)
- Domain `danielib.com` pointing to VPS IP (A record + www CNAME)
- SSH access to VPS

### Step 1: Install Docker on VPS

```bash
# SSH into VPS
ssh root@YOUR_VPS_IP

# Install Docker
curl -fsSL https://get.docker.com | sh

# Install Docker Compose plugin
apt install -y docker-compose-plugin

# Verify
docker --version
docker compose version
```

### Step 2: Clone and Deploy

```bash
# Create project directory
mkdir -p /opt/danielib && cd /opt/danielib

# Copy files to VPS (from local machine)
# Option A: Git clone
git clone YOUR_REPO_URL .

# Option B: SCP from local
# scp -r ./frontend/* root@YOUR_VPS_IP:/opt/danielib/

# Navigate to frontend
cd frontend

# Build and start
docker compose up -d --build

# Verify it's running
docker compose ps
curl -I http://localhost
```

### Step 3: Configure SSL with Certbot

```bash
# 1. Ensure port 80 is open and site is reachable via HTTP
curl -I http://danielib.com

# 2. Install Certbot on the HOST (not inside Docker)
apt install -y certbot

# 3. Stop the container temporarily
docker compose down

# 4. Obtain certificates
certbot certonly --standalone \
  -d danielib.com \
  -d www.danielib.com \
  --agree-tos \
  --email your-email@example.com

# 5. Copy certificates to the project directory
mkdir -p certbot/conf
cp -rL /etc/letsencrypt/* certbot/conf/

# 6. Enable HTTPS in nginx.conf:
#    - Uncomment the HTTPS server block
#    - Uncomment the HTTP→HTTPS redirect
#    - Comment out the current "location /" in the HTTP block

# 7. Rebuild and restart
docker compose up -d --build

# 8. Verify HTTPS
curl -I https://danielib.com
```

### Step 4: Auto-Renewal (Cron Job)

```bash
# Add to root crontab
crontab -e

# Add this line (renew every 12 hours, reload nginx):
0 */12 * * * certbot renew --quiet && cp -rL /etc/letsencrypt/* /opt/danielib/frontend/certbot/conf/ && docker exec danielib_web nginx -s reload
```

### Step 5: Firewall

```bash
# Allow only HTTP, HTTPS, and SSH
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

## Local Development

```bash
# Build and run locally
docker compose up -d --build

# Access at http://localhost

# Test ?ref=us feature
# http://localhost?ref=us

# Stop
docker compose down
```

---

## Customization Checklist

- [ ] Replace Calendly URL: search `https://calendly.com` in `index.html`
- [ ] Replace Formspree ID: search `YOUR_FORM_ID` in `index.html`
- [ ] Update LinkedIn URL: search `https://linkedin.com` in `index.html`
- [ ] Update GitHub URL: search `https://github.com` in `index.html`
- [ ] Update email: search `daniel@danielib.com` in `index.html`
- [ ] Update certification badges in `index.html` (Stack section)
- [ ] Add favicon: place `favicon.ico` in root and add `<link>` tag
