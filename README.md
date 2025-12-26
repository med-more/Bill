# Legends Academy - Billiard Lounge Website

Site web moderne pour Legends Academy, un salon de billard premium avec café et restaurant.

## 🚀 Technologies

- **React 19** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **Lucide React** - Icônes
- **Lottie React** - Animations JSON

## 📁 Structure du Projet

```
billiard-lounge-website/
├── public/                 # Assets statiques (images, animations)
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── Events.jsx
│   │   ├── Pricing.jsx
│   │   ├── Footer.jsx
│   │   └── VenueShowcase.jsx
│   ├── pages/             # Pages de l'application
│   │   ├── Home.jsx
│   │   └── Contact.jsx
│   ├── lib/               # Utilitaires
│   │   └── utils.js
│   ├── App.jsx            # Composant principal avec routing
│   ├── main.jsx           # Point d'entrée
│   └── index.css          # Styles globaux Tailwind
├── index.html             # Template HTML
├── vite.config.js         # Configuration Vite
└── package.json           # Dépendances
```

## 🛠️ Installation

1. Installer les dépendances :
```bash
npm install
# ou
pnpm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
# ou
pnpm dev
```

3. Build pour la production :
```bash
npm run build
# ou
pnpm build
```

4. Prévisualiser le build de production :
```bash
npm run preview
# ou
pnpm preview
```

## 📝 Scripts Disponibles

- `npm run dev` - Lance le serveur de développement Vite
- `npm run build` - Crée un build de production dans `dist/`
- `npm run preview` - Prévisualise le build de production localement

## 🎨 Styling

Le projet utilise Tailwind CSS avec une configuration personnalisée. Les styles globaux sont définis dans `src/index.css`.

## 🔗 Routing

Le routing est géré par React Router DOM :
- `/` - Page d'accueil
- `/contact` - Page de contact

## 📦 Packages Principaux

- `react` & `react-dom` - React 19
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `lucide-react` - Icônes
- `lottie-react` - Animations Lottie
- `react-intersection-observer` - Observer pour animations au scroll
- `tailwindcss` - Framework CSS

## 🌐 Navigation

La navigation utilise des ancres (`#`) pour les sections sur la page d'accueil et React Router pour les pages complètes.

## 📱 Responsive

Le site est entièrement responsive et optimisé pour mobile, tablette et desktop.

