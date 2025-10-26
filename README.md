# 🌍 DocAfrik - Documents IA pour l'Afrique

Plateforme de génération de documents professionnels par IA, spécialement conçue pour le marché africain et malien.

## 🎯 **Description**

DocAfrik est une application web moderne qui permet de générer automatiquement des documents professionnels (CV, lettres de motivation, factures, etc.) grâce à l'intelligence artificielle.

### 🌟 **Fonctionnalités Principales**

- 📝 **Génération IA de documents** - Créez des documents professionnels en quelques clics
- 🎨 **Templates personnalisables** - Plus de 60 modèles adaptés au contexte africain
- 💼 **Interface admin complète** - Gestion des modèles et utilisateurs
- 📱 **Design responsive** - Parfait sur mobile, tablette et desktop
- 🔐 **Authentification sécurisée** - Système de login/register
- 📊 **Analytics et monitoring** - Suivi des utilisations
- 🌍 **Multilingue** - Support du français et des langues locales

## 🚀 **Déploiement Rapide**

### **Option 1: Netlify (Recommandé)**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/VOTRE_USERNAME/docafrik)

1. **Fork ce repository**
2. **Connectez GitHub à Netlify**
3. **Déployez automatiquement**

### **Option 2: Docker**

```bash
git clone https://github.com/VOTRE_USERNAME/docafrik.git
cd docafrik
docker-compose -f docker-compose.prod.yml up -d --build
```

### **Option 3: Manuel**

```bash
git clone https://github.com/VOTRE_USERNAME/docafrik.git
cd docafrik
npm install
npm run build
npm start
```

---

## 🛠️ **Stack Technique**

### **Frontend**
- **Next.js 15** avec App Router
- **TypeScript 5** pour la robustesse
- **Tailwind CSS 4** pour le design
- **Framer Motion** pour les animations
- **Shadcn/ui** pour les composants

### **Backend**
- **Node.js 18** runtime
- **Prisma ORM** avec SQLite
- **NextAuth.js** pour l'authentification
- **Socket.io** pour le temps réel

### **Déploiement**
- **Netlify** pour le statique
- **Docker** pour le production
- **GitHub Actions** pour le CI/CD

---

## 📁 **Structure du Projet**

```
docafrik/
├── src/
│   ├── app/                 # Pages Next.js
│   │   ├── admin/          # Interface admin
│   │   ├── templates/      # Catalogue de modèles
│   │   ├── editor/         # Éditeur de documents
│   │   └── page.tsx        # Page d'accueil
│   ├── components/         # Composants React
│   │   └── ui/            # Composants shadcn/ui
│   ├── hooks/             # Hooks personnalisés
│   └── lib/               # Utilitaires
├── public/                # Assets statiques
├── prisma/               # Schéma de base de données
├── docker-compose.yml    # Configuration Docker
├── netlify.toml         # Configuration Netlify
└── README.md            # Ce fichier
```

---

## 🎨 **Pages Principales**

### 🏠 **Page d'accueil** (`/`)
- Hero section attractive
- Features et bénéfices
- Tarification et packs
- Témoignages clients

### 📋 **Catalogue de modèles** (`/templates`)
- Grid responsive des modèles
- Filtrage par catégorie
- Prévisualisation interactive
- Miniatures des documents

### ⚙️ **Admin** (`/admin/models`)
- Gestion des modèles
- Statistiques d'utilisation
- Configuration des templates
- Analytics détaillés

### ✏️ **Éditeur** (`/editor/[id]`)
- Éditeur de documents riche
- Preview en temps réel
- Export PDF/Word
- Sauvegarde automatique

---

## 🔧 **Configuration**

### **Variables d'environnement**

```bash
# Base de données
DATABASE_URL="file:./db/custom.db"

# Authentification
JWT_SECRET="votre-secret-jet-sécurisé"
NEXTAUTH_SECRET="votre-secret-nextauth"

# Configuration
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://votre-domaine.com"
```

### **Installation locale**

```bash
# 1. Cloner le repository
git clone https://github.com/VOTRE_USERNAME/docafrik.git
cd docafrik

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env.local

# 4. Démarrer le développement
npm run dev
```

---

## 🌐 **Déploiement**

### **Netlify (Statique)**

1. Connecter le repository GitHub à Netlify
2. Configuration du build:
   ```
   Build command: npm run build:static
   Publish directory: out
   ```
3. Déployer automatiquement

### **Docker (Production)**

```bash
# Build et déploiement
docker-compose -f docker-compose.prod.yml up -d --build

# Avec Nginx reverse proxy
docker-compose -f docker-compose.prod.yml --profile with-nginx up -d
```

### **Vercel**

1. Importer le projet sur Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

---

## 📊 **Fonctionnalités Techniques**

### **Mode Statique (Netlify)**
- ✅ Stockage client-side avec localStorage
- ✅ Authentification simulée
- ✅ Templates par défaut
- ✅ Navigation complète
- ✅ Mode responsive

### **Mode Serveur (Docker)**
- ✅ Base de données SQLite complète
- ✅ API RESTful
- ✅ Authentification JWT
- ✅ Gestion des utilisateurs
- ✅ Analytics temps réel

---

## 🤝 **Contribuer**

Les contributions sont les bienvenues !

1. **Fork** le repository
2. **Créer** une branche (`git checkout -b feature/amazing-feature`)
3. **Commit** vos changements (`git commit -m 'Add amazing feature'`)
4. **Push** vers la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

---

## 📝 **License**

Ce projet est sous license MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📞 **Support**

- 📧 **Email**: support@docafrik.com
- 🌐 **Website**: https://docafrik.com
- 📚 **Documentation**: https://docs.docafrik.com
- 🐛 **Issues**: https://github.com/VOTRE_USERNAME/docafrik/issues

---

## 🙏 **Remerciements**

- **Next.js** - Framework React moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Shadcn/ui** - Composants UI élégants
- **Framer Motion** - Animations fluides
- **Netlify** - Hébergement statique exceptionnel

---

**🚀 DocAfrik - L'IA au service de vos documents professionnels en Afrique**

*Made with ❤️ for Africa*