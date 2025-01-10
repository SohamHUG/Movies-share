# Movies-share

Ce petit projet est une application web permettant aux utilisateurs de découvrir, partager et critiquer des films. Les utilisateurs peuvent également créer des collections personnalisées avec des statuts (Vu ou À voir).

## Fonctionnalités 

### 1. Authentification : 
* Inscription et connexion sécurisés
* Gestion des sessions avec des tokens (JWT)

### 2. Gestion des films : 
* Ajouter des films au site avec les détails (titre, description, producteur, année de sortie) 
* Modifier et supprimer les films que l'on a ajouté soi-même 
* Récupérer les films existants sur le site 

### 3. Critiques (Reviews) :
* Ajouter des review aux films, avec une note (1 à 5) et un commentaire (optionnel) 
* Lire les critiques des autres utilisateurs 

### 4. Collections :
* Créer une collection de films avec des statuts (Vu ou À voir)
* Mettre à jour ou supprimer des films de sa collection

## Installation 
### Prérequis 
* Node.js
* PostgreSQL
* pnpm 

### Étapes 
1. **Cloner le dépôt**
```bash
git clone https://github.com/SohamHUG/Movies-share.git
cd Movies-share
```

2. **Configurer l'environnement**
* Dupliquer le fichier **.env.example** en **.env** et remplir les valeurs nécessaires
```bash
cp .env.example .env
```
* Variables importantes
    * DATABASE_URL
    * JWT_SECRET

3. **Installer les dépendances**
```bash
pnpm install
```

4. **Migrer la base de données**
```bash
cd packages/server 
pnpm run migrate
```

5. **Lancer l'application**
```bash
cd ../.. 
pnpm run dev
```

## Scripts utiles 
* `pnpm run dev:client` : Lancer le client (front)
* `pnpm run dev:server` : Lancer le serveur (back)
* `pnpm run dev` : Lancer les deux en même temps
* `pnpm run migrate` : Appliquer les migration de la base de données

## Utilisation 

### 1. Authentification
* `[POST] /auth/register` : S'inscrire sur l'application 
* `[POST] /auth/login` : Se connecter 
* `[get] /auth/logout` : Se déconnecter 

### 2. Users
* `[GET] /users` : Récupérer les utilisateurs 
* `[GET] /users/:id` : Récupérer un utilisateur via l'id 
* `[DELETE] /users/:id` : Supprimer son compte utilisateur 

### 3. Films
* `[GET] /movies` : Récupérer les films 
* `[GET] /movies/:id` : Récupérer un film via l'id 
* `[POST] /movies` : Ajouter un film 
* `[PUT] /movies/:id` : Modifier un film via l'id
* `[DELETE] /movies/:id` : Supprimer un film via l'id

### 3. Collections
* `[GET] /collections` : Récupérer les collections 
* `[GET] /collections/my` : Récupérer sa collection
* `[POST] /collections` : Ajouter un film à sa collection
* `[PUT] /collections` : Modifier le statuts d'un film dans sa collection 
* `[DELETE] /collections/:id` : Supprimer un film de sa collection