# Todo Master - Application de Gestion de Tâches Avancée

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel)

Une application Todo List moderne, performante et esthétique développée avec React.js et Tailwind CSS.

## 🚀 Fonctionnalités

### 🌟 Core
- **Architecture Moderne** : Utilisation de React Context API pour une gestion d'état scalable.
- **Persistence** : Sauvegarde automatique des données dans le LocalStorage.
- **Réactif** : Interface entièrement responsive (Desktop, Tablette, Mobile).

### ✨ Avancées
- **Filtrage Intelligent** : Filtrez par statut (Toutes, Actives, Terminées) et Priorité.
- **Recherche Instantanée** : Trouvez vos tâches rapidement via la barre de recherche.
- **Catégorisation** : Ajoutez des catégories (Travail, Perso, Santé, etc.) pour organiser vos tâches.
- **Priorités** : Gestion des niveaux de priorité (Basse, Moyenne, Haute).

### 🎨 UI / UX
- **Mode Sombre (Dark Mode)** : Support natif du thème sombre avec détection automatique et bascule manuelle.
- **Design System** : Interface soignée utilisant Tailwind CSS et Lucide Icons.
- **Animations** : Interactions fluides pour une expérience utilisateur agréable.

## 🛠 Architectures et Technologies

- **Frontend** : React.js (Create React App)
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Gestion d'État** : Context API + Hooks (useState, useEffect, useMemo)
- **Hooks Personnalisés** : `useLocalStorage`

## 📦 Installation et Démarrage

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Abakar702/MyTodoList.git
   cd todo-app-avance
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer en développement**
   ```bash
   npm start
   ```
   L'application sera accessible sur `http://localhost:3000`.

## 🚢 Déploiement

### Vercel (Recommandé)

1. Installez Vercel CLI : `npm i -g vercel`
2. Déployez simplement avec :
   ```bash
   vercel
   ```

### Builds Production

Pour créer une version optimisée pour la production :
```bash
npm run build
```
Les fichiers seront générés dans le dossier `build`.

## 📂 Structure du Projet

```
src/
├── components/      # Composants UI réutilisables
│   ├── Header.jsx
│   ├── TodoForm.jsx
│   ├── TodoList.jsx
│   ├── TodoItem.jsx
│   ├── TodoFilter.jsx
│   ├── TodoSearch.jsx
│   └── TodoStats.jsx
├── context/         # Gestion d'état global
│   └── TodoContext.jsx
├── hooks/           # Custom Hooks
│   └── useLocalStorage.js
├── App.js           # Composant racine
└── index.css        # Styles globaux (Tailwind)
```

## 📝 Auteur

Développé avec ❤️ par [Abakar Dev]
