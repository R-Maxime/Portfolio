# Portfolio

## Description
Portfolio de mes différents projets, autant personnels que professionnels.

## Technologies
- React.js
- Express.js
- Node.js (typescript)
- MongoDB
- Mongoose
- Docker (pour le déploiement)

## Backend

Le backend est développé en Node.js avec le framework Express.js.<br>
Il est écrit en typescript pour une meilleure lisibilité et maintenabilité du code.<br>Les données sont stockées dans une base de données MongoDB, et sont manipulées avec le package Mongoose.

### Installation
```
cd Api
npm install
npm run dev | npm run debug (pour lancer le serveur en mode développement)

Build:
npm run build
npm start
```

Configuration du .env, un fichier .env.example est fourni pour vous aider à configurer votre environnement.
La seconde base de données n'est pas fournie avec le repository, le format de données est aussi volontairement caché, elle est utilisée pour récupérer les statistiques du Bot Discord pour le Front.
```
API_PORT=YOUR_API_PORT
MONGO_IP=YOUR_MONGO_IP
JWT_SECRET=YOUR_JWT_SECRET 
SECRET_TOKEN=YOUR_SECRET_TOKEN # Used to validate an user creation
DB_NAME=YOUR_DB_NAME
BOT_DB_NAME=YOUR_DB_SECOND_NAME 
BOT_DB_ACTIVE=false # The bot database can only be used by the bot owner
NODE_ENV=YOUR_NODE_ENV # See src/enums/NodeEnvEnum.ts
DISCORD_WEBHOOK_URL=YOUR_DISCORD_WEBHOOK_URL # Used to send contact message to the owner
DISCORD_OWNER_ID=YOUR_DISCORD_ID
```

## Frontend

Le frontend est développé en React.js, il est écrit en typescript pour une meilleure lisibilité et maintenabilité du code.<br>
Saas est utilisé pour le style.

### Installation

```
cd Front
npm install
npm run dev (pour lancer le serveur en mode développement)

Build:
npm run build
npm run preview
```

## Informations

L'entiereté du projet est déployé avec Docker, un Dockerfile est fourni dans chacun des dossiers.
- [Backend Dockerfile](Api/Dockerfile)
- [Frontend Dockerfile](Front/Dockerfile)