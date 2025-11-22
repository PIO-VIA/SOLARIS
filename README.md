# Solar System Explorer

Une application web interactive en 3D pour explorer le système solaire avec des textures réalistes des planètes.

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-0.181.2-black?logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

## Aperçu

Solar System Explorer est une application éducative et interactive qui permet d'explorer le système solaire en 3D. Chaque planète utilise des textures réalistes et est animée avec des orbites authentiques. L'application offre des informations détaillées sur chaque planète incluant la température, le rayon, la masse et la distance du soleil.

## Fonctionnalités

- **Visualisation 3D interactive** : Navigation libre dans le système solaire avec contrôles de caméra
- **Textures réalistes** : Images authentiques de la NASA pour chaque planète et le soleil
- **Animations orbitales** : Les planètes tournent autour du soleil avec des vitesses proportionnelles
- **Pages détaillées** : Cliquez sur une planète pour voir ses informations complètes
- **Interface moderne** : Design épuré avec Tailwind CSS et animations Framer Motion
- **Quiz interactif** : Testez vos connaissances sur le système solaire
- **Responsive** : Fonctionne sur desktop, tablette et mobile

## Technologies utilisées

### Frontend
- **[Next.js 16.0.3](https://nextjs.org)** - Framework React avec App Router
- **[React 19.2.0](https://react.dev)** - Bibliothèque UI
- **[TypeScript 5](https://www.typescriptlang.org)** - Typage statique

### 3D & Animations
- **[Three.js 0.181.2](https://threejs.org)** - Moteur de rendu 3D WebGL
- **[React Three Fiber 9.4.0](https://docs.pmnd.rs/react-three-fiber)** - Renderer React pour Three.js
- **[React Three Drei 10.7.7](https://github.com/pmndrs/drei)** - Helpers Three.js (OrbitControls, Stars, Float, etc.)
- **[Framer Motion 12.23.24](https://www.framer.com/motion)** - Animations UI fluides

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev)** - Icônes SVG modernes

### State Management
- **[Zustand 5.0.8](https://zustand-demo.pmnd.rs)** - Gestion d'état légère

## Structure du projet

```
sun/
├── app/                          # App Router Next.js
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── planet/[id]/page.tsx    # Page détaillée de chaque planète
│   ├── quiz/page.tsx           # Page du quiz
│   └── globals.css             # Styles globaux
├── components/
│   ├── three/                  # Composants 3D
│   │   ├── Planet3D.tsx       # Composant de planète avec texture
│   │   ├── SolarSystem.tsx    # Système solaire complet
│   │   ├── Scene.tsx          # Configuration de la scène 3D
│   │   └── Sun3D.tsx          # Soleil avec texture
│   └── ui/                     # Composants UI
│       ├── Navbar.tsx         # Barre de navigation
│       └── PlanetCard.tsx     # Cartes des planètes
├── lib/
│   ├── data.ts                # Données des planètes
│   └── store.ts               # Store Zustand
├── public/                     # Assets statiques
│   ├── mercury.jpg            # Texture de Mercure
│   ├── venus_atmosphere.jpg   # Texture de Vénus
│   ├── earth.jpg              # Texture de la Terre
│   ├── mars.jpg               # Texture de Mars
│   ├── jupiter.jpg            # Texture de Jupiter
│   ├── saturn.jpg             # Texture de Saturne
│   ├── uranus.jpg             # Texture d'Uranus
│   ├── neptune.jpg            # Texture de Neptune
│   ├── sun.jpg                # Texture du Soleil
│   └── stars_milky_way.jpg    # Texture de la Voie lactée (arrière-plan)
└── package.json
```

## Installation

### Prérequis
- Node.js 20+
- npm, yarn, pnpm ou bun

### Étapes

1. **Cloner le dépôt**
```bash
git clone <url-du-repo>
cd sun
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Ouvrir l'application**

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Compile l'application pour la production
- `npm run start` - Démarre le serveur de production
- `npm run lint` - Vérifie le code avec ESLint

## Utilisation

### Navigation principale
- **Molette de la souris** : Zoom avant/arrière
- **Clic gauche + glisser** : Rotation de la caméra
- **Clic droit + glisser** : Déplacement latéral
- **Survol d'une planète** : Affiche le nom et agrandit la planète
- **Clic sur une planète** : Accède à la page détaillée

### Pages disponibles
- `/` - Vue du système solaire complet
- `/planet/[id]` - Détails d'une planète spécifique (mercury, venus, earth, mars, jupiter, saturn, uranus, neptune)
- `/quiz` - Quiz sur le système solaire

## Personnalisation

### Ajouter une nouvelle planète

1. **Ajouter la texture** dans `/public/nom-planete.jpg`

2. **Mettre à jour** `/lib/data.ts` :
```typescript
{
    id: 'nom-planete',
    name: 'Nom Planète',
    color: '#HEXCOLOR',
    size: 1.5,
    distance: 30,
    speed: 0.005,
    texture: '/nom-planete.jpg',
    description: "Description de la planète...",
    stats: {
        temp: '100°C',
        radius: '10,000 km',
        mass: '1 × 10^24 kg',
        distanceFromSun: '100 million km',
    },
}
```

### Modifier les propriétés 3D

Dans `/components/three/Planet3D.tsx`, vous pouvez ajuster :
- **Géométrie** : `<sphereGeometry args={[size, segments, rings]} />`
- **Matériau** : `roughness`, `metalness`, propriétés PBR
- **Vitesse de rotation** : `delta * 0.5` dans `useFrame`

### Changer les lumières

Dans `/components/three/Scene.tsx` et `/components/three/Sun3D.tsx` :
- `ambientLight intensity={0.3}` - Lumière ambiante globale
- `pointLight intensity={2}` - Lumière du soleil

## Textures

Les textures utilisées dans l'application proviennent de sources libres de droits :

### Textures des planètes et du soleil
- **NASA** - Images du domaine public
- **Solar System Scope** - Textures gratuites
- **Planet Pixel Emporium** - Maps haute résolution

### Texture de la Voie lactée (arrière-plan)
L'arrière-plan spatial utilise une texture panoramique 360° de la Voie lactée (`stars_milky_way.jpg`) appliquée sur une sphère inversée de rayon 500 pour créer un effet de skybox immersif. Cette texture remplace les étoiles procédurales et offre un rendu plus réaliste du ciel nocturne.

Pour remplacer les textures :
- **Planètes** : Ajoutez vos images JPG/PNG dans `/public/` et mettez à jour les chemins dans `/lib/data.ts`
- **Arrière-plan** : Remplacez `/public/stars_milky_way.jpg` par votre propre texture panoramique

## Optimisation

- Les textures sont chargées de manière asynchrone avec `THREE.TextureLoader`
- Les composants 3D sont suspendus avec `<Suspense>` pour un chargement progressif
- Next.js optimise automatiquement les images et le code

## Déploiement

### Vercel (recommandé)

Le moyen le plus simple de déployer l'application :

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Autre plateforme

1. **Build de production**
```bash
npm run build
```

2. **Démarrer le serveur**
```bash
npm run start
```

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Suggérer de nouvelles fonctionnalités
- Soumettre des pull requests

## Licence

Ce projet est open source et disponible sous licence MIT.

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Auteur

Créé avec Next.js, Three.js et beaucoup de passion pour l'astronomie.

---

Fait avec ❤️ et React Three Fiber
