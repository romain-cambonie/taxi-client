# Taxi Gestion Client

> Ce dépot est obsolète. Le projet Taxi Gestion est hébergé sur son [organisation dédiée](https://github.com/taxi-gestion)

Outil de gestion à destination des flottes de taxi, particulièrement des vsl (véhicules sanitaires légers).

> Ce dépot est responsable de la partie applicative client.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript
- [Yarn Classic](https://classic.yarnpkg.com) : Gestionnaire de paquets pour les produits développés dans des environnements Node

> Node peut être installés via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

### Mise en place des sources

Cloner le projet

### Installer Husky

[Husky](https://typicode.github.io/husky) est un outil de gestion des hooks git pour effectuer des tâches automatiques

```bash
npx husky install
```

Rendre exécutable les fichiers qui contiennent les hooks :

```bash
chmod a+x .husky/commit-msg
chmod a+x .husky/pre-commit
```

## Utilisation

Ces commandes servent dans un contexte de développement de l'application et doivent être exécutées depuis la racine de l'espace de travail.

### Mise en place des prérequis

```bash
yarn install
```

### Lancement

```bash
yarn start
```

Puis naviguer vers `http://localhost:4200/`.

### Développement

Les commandes communes de développement se trouvent dans le champ scripts du package.json

### Contribution

Le projet n'est actuellement pas ouvert à la contribution
