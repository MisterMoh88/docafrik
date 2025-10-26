# Guide de Déploiement - DocAfrik

## 📋 Prérequis

- Node.js 18+ 
- Docker et Docker Compose (recommandé)
- Un serveur (VPS) ou plateforme cloud
- Nom de domaine (optionnel)

## 🚀 Méthodes de Déploiement

### 1. Déploiement avec Docker (Recommandé)

#### Étape 1: Préparer l'environnement
```bash
# Cloner le projet
git clone <votre-repo>
cd docafrik

# Copier les variables d'environnement
cp .env.example .env.local

# Éditer les variables d'environnement
nano .env.local
```

#### Étape 2: Configurer les variables essentielles
```bash
# Générer des secrets sécurisés
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Mettre à jour .env.local
sed -i "s/your-secret-jet-très-sécurisé-ici/$JWT_SECRET/" .env.local
sed -i "s/votre-secret-nextauth-ici/$NEXTAUTH_SECRET/" .env.local
```

#### Étape 3: Construire et déployer
```bash
# Construire l'image Docker
docker-compose build

# Démarrer l'application
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

### 2. Déploiement Manuel

#### Étape 1: Installation des dépendances
```bash
# Sur le serveur
git clone <votre-repo>
cd docafrik
npm install
```

#### Étape 2: Configuration
```bash
# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

#### Étape 3: Build et démarrage
```bash
# Construire l'application
npm run build

# Démarrer le serveur
npm start
```

## 🔧 Configuration de Production

### Variables d'environnement essentielles

```bash
# Base de données
DATABASE_URL="file:./db/custom.db"

# Sécurité
JWT_SECRET="votre-secret-jet-32-caractères-minimum"
NEXTAUTH_SECRET="votre-secret-nextauth-32-caractères-minimum"
NEXTAUTH_URL="https://votre-domaine.com"

# Production
NODE_ENV="production"
PORT=3000
NEXT_PUBLIC_APP_URL="https://votre-domaine.com"
```

### Configuration Nginx (si utilisé)

1. Installer Nginx:
```bash
sudo apt update && sudo apt install nginx
```

2. Copier la configuration:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/docafrik
sudo ln -s /etc/nginx/sites-available/docafrik /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

3. Obtenir un certificat SSL:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## 🏢 Plateformes de Déploiement

### Vercel (Recommandé pour Next.js)

1. Connecter votre repo GitHub
2. Configurer les variables d'environnement dans le dashboard Vercel
3. Déployer automatiquement à chaque push

### Netlify

1. Connecter votre repo
2. Configurer le build command: `npm run build`
3. Configurer les variables d'environnement

### DigitalOcean App Platform

1. Créer une nouvelle app
2. Connecter votre repo GitHub
3. Configurer les variables d'environnement
4. Déployer

## 🔍 Vérification du Déploiement

### Tests à effectuer

1. **Page d'accueil**: Accessible et fonctionnelle
2. **Navigation**: Tous les liens fonctionnent
3. **Authentification**: Login/logout fonctionne
4. **Modèles**: Affichage et prévisualisation
5. **API**: Tester les endpoints avec curl/Postman

### Scripts de test

```bash
# Test de santé de l'API
curl https://votre-domaine.com/api/health

# Test des pages principales
curl -I https://votre-domaine.com/
curl -I https://votre-domaine.com/templates
curl -I https://votre-domaine.com/admin
```

## 📊 Monitoring et Maintenance

### Logs

```bash
# Docker
docker-compose logs -f docafrik-app

# Manuel
tail -f server.log
```

### Sauvegarde

```bash
# Sauvegarder la base de données
cp db/custom.db backup/custom-$(date +%Y%m%d).db

# Script de sauvegarde automatique
echo "0 2 * * * cp /app/db/custom.db /backup/custom-$(date +\%Y\%m\%d).db" | crontab -
```

## 🚨 Sécurité

1. **Mettre à jour régulièrement**:
```bash
npm audit fix
docker-compose pull && docker-compose up -d
```

2. **Configurer le firewall**:
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

3. **Surveiller les erreurs**:
```bash
# Configurer un système d'alerte pour les erreurs 500
```

## 🆘 Dépannage

### Problèmes courants

1. **Build échoue**: Vérifier les variables d'environnement
2. **Base de données**: Vérifier les permissions du fichier db/custom.db
3. **Port déjà utilisé**: Changer le port dans .env.local
4. **SSL**: Vérifier la configuration Nginx et les certificats

### Support

- Documentation Next.js: https://nextjs.org/docs
- Documentation Docker: https://docs.docker.com
- Issues du projet: Créer une issue sur GitHub

---

## 📞 Contact Support

Pour toute question sur le déploiement:
- Email: support@docafrik.com
- Documentation: https://docs.docafrik.com
- GitHub Issues: https://github.com/votre-repo/issues