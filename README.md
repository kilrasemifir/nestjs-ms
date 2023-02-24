# Projet Microservice avec NestJs

## Prérequis
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [NodeJs](https://nodejs.org/en/download/)

Connaissances en [NestJs](https://docs.nestjs.com/) et [Kafka](https://kafka.apache.org/quickstart) sont nécessaires pour comprendre ce projet.

## Présentation

Ce projet montre l'implémentation de 4 microservices avec NestJs et Kafka:
- ms-utilisateurs
  - __url__: http://localhost:8000/utilisateurs
  - __description:__ Ce microservice permet de gérer les utilisateurs de l'application.
- ms-commandes
  - __url__: http://localhost:8001/commandes
  - __description:__ Ce microservice permet de gérer les commandes de l'application.
- ms-stocks
  - __url__: http://localhost:8002/stocks
  - __description:__ Ce microservice permet de gérer les stocks de l'application.
  - __architecture:__ Composé de 2 services:
    - ms-stock: qui prend la forme d'un microservice séparant les `queries` et `commands` de la base de données.
    - ms-stock-handler: qui prend la forme d'un microservice traitant les `events` de la base de données envoyés par le service `ms-stock`.
  
## Installation

Dans un terminal, se placer dans le dossier du projet et lancer la commande suivante :

```bash
docker-compose up -d
```

## Lancement

Dans un terminal, se placer dans le dossier du projet et lancer la commande suivante :

```bash
cd ms-utilisateurs
npm run start:dev
```

## Utilisation

Vous pouvez utiliser l'application Postman pour tester les différentes routes.

Le ms utilisateurs est accessible à l'adresse suivante : http://localhost:8000/utilisateurs