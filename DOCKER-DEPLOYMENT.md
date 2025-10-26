# 🐳 Guide de Déploiement Docker - DocAfrik

## 📋 Prérequis

### Installation de Docker

#### **Ubuntu/Debian:**
```bash
# Mettre à jour les paquets
sudo apt update

# Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Ajouter votre utilisateur au groupe Docker
sudo usermod -aG docker $USER

# Installer Docker Compose
sudo apt install docker-compose-plugin

# Redémarrer la session ou exécuter:
newgrp docker
```

#### **CentOS/RHEL:**
```bash
# Installer Docker
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Démarrer Docker
sudo systemctl start docker
sudo systemctl enable docker

# Ajouter votre utilisateur au groupe Docker
sudo usermod -aG docker $USER
```

#### **macOS:**
```bash
# Installer avec Homebrew
brew install --cask docker

# Ou télécharger Docker Desktop depuis:
# https://www.docker.com/products/docker-desktop
```

#### **Windows:**
```bash
# Télécharger et installer Docker Desktop depuis:
# https://www.docker.com/products/docker-desktop

# Activer WSL 2 si nécessaire
wsl --install
```

### Vérification de l'installation
```bash
docker --version
docker-compose --version
```

---

## 🚀 Déploiement Rapide

### **Option 1: Déploiement Simple (Recommandé pour commencer)**

```bash
# 1. Naviguer dans le projet
cd /chemin/vers/docafrik

# 2. Copier les variables d'environnement
cp .env.production .env.local

# 3. Déployer l'application
docker-compose -f docker-compose.prod.yml up -d --build

# 4. Vérifier le déploiement
docker-compose -f docker-compose.prod.yml logs -f
```

### **Option 2: Déploiement avec Nginx (Production)**

```bash
# 1. Déployer avec reverse proxy Nginx
docker-compose -f docker-compose.prod.yml --profile with-nginx up -d --build

# 2. Configurer votre domaine pour pointer vers le serveur
# 3. Obtenir un certificat SSL (voir section SSL)
```

### **Option 3: Script Automatisé**

```bash
# Rendre le script exécutable
chmod +x scripts/deploy.sh

# Exécuter le déploiement
./scripts/deploy.sh production
```

---

## 🔧 Configuration

### Variables d'environnement

Le fichier `.env.production` contient déjà des secrets sécurisés:

```bash
# Base de données
DATABASE_URL=file:./db/custom.db

# Secrets (déjà générés)
JWT_SECRET=ILg3IaLThGe/18aH4VnFMVr9i1/uGjQxUVgdW2gNGLg=
NEXTAUTH_SECRET=4cNAdp3UkZD72PQTn4ZZOX3gm+crjeDTa+74/iYeqpo=

# Configuration
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Pour un domaine personnalisé

Modifiez `.env.local`:

```bash
# Remplacer localhost par votre domaine
NEXTAUTH_URL=https://votre-domaine.com
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

---

## 🔍 Vérification du Déploiement

### Health Check

```bash
# Vérifier que les conteneurs sont en cours d'exécution
docker-compose -f docker-compose.prod.yml ps

# Vérifier les logs
docker-compose -f docker-compose.prod.yml logs docafrik-app

# Tester l'API
curl http://localhost:3000/api/health

# Tester l'application
curl -I http://localhost:3000/
```

### Accès à l'application

- **Application principale**: http://localhost:3000
- **Interface admin**: http://localhost:3000/admin
- **Templates**: http://localhost:3000/templates
- **API Health**: http://localhost:3000/api/health

---

## 🛡️ Configuration SSL avec Nginx

### Installation de Certbot

```bash
# Sur Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# Sur CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

### Obtention du certificat SSL

```bash
# 1. Assurez-vous que votre domaine pointe vers le serveur
# 2. Modifiez nginx.conf avec votre domaine
sudo nano nginx/nginx.conf

# 3. Obtenez le certificat
sudo certbot --nginx -d votre-domaine.com

# 4. Redémarrez Nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

### Configuration Nginx automatique

Le fichier `nginx/nginx.conf` est déjà configuré pour:

- ✅ Redirection HTTP → HTTPS
- ✅ En-têtes de sécurité
- ✅ Compression Gzip
- ✅ Rate limiting
- ✅ Cache des assets statiques
- ✅ Support WebSocket

---

## 📊 Monitoring et Maintenance

### Logs

```bash
# Voir tous les logs
docker-compose -f docker-compose.prod.yml logs -f

# Logs spécifiques
docker-compose -f docker-compose.prod.yml logs docafrik-app
docker-compose -f docker-compose.prod.yml logs nginx

# Logs des dernières 24h
docker-compose -f docker-compose.prod.yml logs --since=24h
```

### Sauvegarde

```bash
# Script de sauvegarde automatique
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d-%H%M%S)

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
docker cp docafrik-docafrik-app-1:/app/db/custom.db $BACKUP_DIR/custom-$DATE.db

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "custom-*.db" -mtime +7 -delete

echo "Sauvegarde terminée: custom-$DATE.db"
EOF

chmod +x backup.sh

# Ajouter au crontab pour sauvegarde quotidienne
echo "0 2 * * * /chemin/vers/docafrik/backup.sh" | crontab -
```

### Mises à jour

```bash
# Mettre à jour l'application
git pull
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Mettre à jour les images Docker
docker-compose -f docker-compose.prod.yml pull
```

---

## 🚨 Dépannage

### Problèmes courants

#### **Port déjà utilisé**
```bash
# Vérifier les ports utilisés
sudo netstat -tlnp | grep :3000

# Tuer le processus
sudo kill -9 <PID>

# Ou changer le port dans docker-compose.prod.yml
ports:
  - "3001:3000"
```

#### **Problèmes de permissions**
```bash
# Corriger les permissions des dossiers
sudo chown -R $USER:$USER ./db ./logs ./backups
chmod -R 755 ./db ./logs
```

#### **Memory error**
```bash
# Augmenter la mémoire Docker
# Dans Docker Desktop: Settings > Resources > Memory > 4GB+
```

#### **Conteneur ne démarre pas**
```bash
# Vérifier les logs d'erreur
docker-compose -f docker-compose.prod.yml logs docafrik-app

# Reconstruire l'image
docker-compose -f docker-compose.prod.yml build --no-cache

# Redémarrer proprement
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### Commandes utiles

```bash
# Redémarrer l'application
docker-compose -f docker-compose.prod.yml restart

# Arrêter l'application
docker-compose -f docker-compose.prod.yml down

# Vérifier l'utilisation des ressources
docker stats

# Nettoyer les ressources non utilisées
docker system prune -f

# Accéder au conteneur en mode debug
docker-compose -f docker-compose.prod.yml exec docafrik-app sh
```

---

## 🎉 Succès !

Une fois le déploiement terminé:

1. ✅ **Vérifiez l'application**: http://localhost:3000
2. ✅ **Testez toutes les pages**: /admin, /templates, /editor
3. ✅ **Vérifiez l'API**: /api/health
4. ✅ **Configurez votre domaine** (si applicable)
5. ✅ **Mettez en place SSL** (production)

### Accès rapide

| Service | URL | Description |
|---------|-----|-------------|
| Application | http://localhost:3000 | Interface principale |
| Admin | http://localhost:3000/admin | Panneau d'administration |
| API | http://localhost:3000/api/* | Endpoints API |
| Health | http://localhost:3000/api/health | Health check |

---

## 📞 Support

Si vous rencontrez des problèmes:

1. **Vérifiez les logs**: `docker-compose logs`
2. **Consultez ce guide**: Sections dépannage
3. **Créez une issue**: GitHub repository
4. **Contactez support**: support@docafrik.com

**Félicitations ! Votre application DocAfrik est maintenant déployée avec Docker ! 🐳🚀**