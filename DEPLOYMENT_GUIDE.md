# 🚀 Guide de Déploiement - GridForm Landing Page

Vous avez maintenant **TOUS les fichiers** nécessaires pour déployer votre landing page !

---

## 📦 Fichiers inclus

Voici la structure de votre projet :

```
gridform-landing/
├── index.html              # Page HTML principale
├── package.json            # Dépendances npm
├── vite.config.js          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind CSS
├── postcss.config.js       # Configuration PostCSS
└── src/
    ├── main.jsx            # Point d'entrée React
    ├── App.jsx             # Votre landing page
    └── index.css           # Styles Tailwind
```

---

## 🚀 Option 1 : Vercel (RECOMMANDÉ - Le plus simple)

### Méthode A : Avec GitHub (Recommandé)

**Étape 1 : Créer un repo GitHub**

1. Allez sur https://github.com/new
2. Nom du repo : `gridform-landing`
3. Cochez "Private" (pour l'instant)
4. Cliquez "Create repository"

**Étape 2 : Upload vos fichiers**

Dans votre terminal (ou utilisez l'interface GitHub) :

```bash
# Naviguez vers votre dossier
cd /path/to/your/gridform-landing

# Initialisez git
git init
git add .
git commit -m "Initial commit"

# Connectez au repo GitHub
git remote add origin https://github.com/VOTRE_USERNAME/gridform-landing.git
git branch -M main
git push -u origin main
```

**Étape 3 : Déployer sur Vercel**

1. Allez sur https://vercel.com/signup
2. Connectez-vous avec GitHub
3. Cliquez "Add New Project"
4. Sélectionnez votre repo `gridform-landing`
5. Vercel détecte automatiquement Vite
6. Cliquez "Deploy" ✅

**⏱️ Temps : 5-10 minutes**
**💰 Coût : GRATUIT**
**🎁 Bonus : Auto-déploiement à chaque commit GitHub**

---

### Méthode B : Sans GitHub (Upload direct)

**Option simple si vous ne voulez pas utiliser GitHub**

1. Installez Vercel CLI :
```bash
npm i -g vercel
```

2. Dans votre dossier project :
```bash
cd gridform-landing
vercel
```

3. Suivez les instructions :
   - Login avec email
   - Confirmez le projet
   - Laissez les paramètres par défaut

4. Votre site est en ligne ! 🎉

**⏱️ Temps : 3 minutes**

---

## 🌐 Option 2 : Netlify (Aussi gratuit et simple)

### Méthode Drag & Drop (La plus simple)

1. Créez un build local d'abord :
```bash
cd gridform-landing
npm install
npm run build
```

2. Allez sur https://app.netlify.com/drop
3. Glissez-déposez le dossier `dist/` généré
4. Votre site est en ligne !

**⏱️ Temps : 5 minutes**

### Méthode CLI

```bash
# Installez Netlify CLI
npm install -g netlify-cli

# Build votre projet
npm run build

# Déployez
netlify deploy --prod --dir=dist
```

---

## ☁️ Option 3 : Cloudflare Pages (Gratuit, ultra-rapide)

1. Allez sur https://pages.cloudflare.com/
2. Connectez votre GitHub
3. Sélectionnez le repo
4. Build command : `npm run build`
5. Output directory : `dist`
6. Deploy !

**⏱️ Temps : 5 minutes**
**🚀 Avantage : Le plus rapide au monde (CDN mondial)**

---

## 💻 Si vous n'avez PAS Node.js installé

### Installer Node.js d'abord :

**Mac :**
```bash
brew install node
```

**Windows :**
Téléchargez depuis https://nodejs.org/

**Linux :**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🎯 Déploiement local (pour tester)

Si vous voulez tester avant de déployer :

```bash
# Dans votre dossier
cd gridform-landing

# Installez les dépendances
npm install

# Lancez en local
npm run dev
```

Ouvrez http://localhost:5173 dans votre navigateur ! 🎉

---

## 🌐 Domaine personnalisé (optionnel)

### Après déploiement, vous pouvez ajouter votre domaine :

**Vercel :**
1. Settings → Domains
2. Ajoutez votre domaine (ex: gridform.io)
3. Configurez les DNS selon les instructions

**Netlify :**
1. Domain settings → Add custom domain
2. Suivez les instructions DNS

**Coût d'un domaine :** ~10-15€/an chez :
- Namecheap
- Google Domains
- OVH

---

## ✅ Checklist avant déploiement

- [ ] Tous les fichiers sont dans le même dossier
- [ ] Vous avez modifié le `handleSubmit` pour collecter les emails (voir SETUP_INSTRUCTIONS.md)
- [ ] Vous avez testé en local avec `npm run dev`
- [ ] Vous avez créé un compte Vercel/Netlify
- [ ] Vous avez un repo GitHub (recommandé)

---

## 🎉 Après déploiement

Votre landing page sera accessible à une URL comme :
- **Vercel** : `gridform-landing.vercel.app`
- **Netlify** : `gridform-landing.netlify.app`
- **Cloudflare** : `gridform-landing.pages.dev`

Vous pouvez ensuite :
1. Partager le lien sur le forum Typeform
2. Ajouter Google Analytics
3. Connecter un domaine personnalisé
4. Commencer à collecter des emails !

---

## 🆘 Besoin d'aide ?

### Erreurs courantes :

**"npm not found"**
→ Installez Node.js d'abord

**"Failed to build"**
→ Vérifiez que tous les fichiers sont présents
→ Lancez `npm install` avant `npm run build`

**"Module not found"**
→ Supprimez `node_modules` et relancez `npm install`

---

## 🎯 Ma recommandation

**Pour commencer rapidement :**
1. Créez un compte GitHub
2. Uploadez vos fichiers sur GitHub
3. Connectez GitHub à Vercel
4. Deploy automatique ✅

**Avantages :**
- Backup de votre code
- Auto-déploiement à chaque modification
- Gratuit
- Professionnel

**Temps total : 10 minutes max**

---

## 📊 Après le déploiement

N'oubliez pas de :
1. Tester la page en ligne
2. Tester le formulaire d'email
3. Vérifier sur mobile
4. Partager le lien !

---

Besoin d'aide pour un déploiement spécifique ? Dites-moi quelle méthode vous choisissez ! 🚀
