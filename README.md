# Système de Gestion des Inscriptions des Étudiants

Ce projet est une application Node.js permettant de gérer les inscriptions des étudiants.

## Table des Matières
- [Système de Gestion des Inscriptions des Étudiants](#système-de-gestion-des-inscriptions-des-étudiants)
  - [Table des Matières](#table-des-matières)
  - [Description du Projet](#description-du-projet)
    - [Fonctionnalités](#fonctionnalités)
  - [Diagrammes](#diagrammes)
    - [Diagramme de Cas d'Utilisation](#diagramme-de-cas-dutilisation)
  - [Conception](#conception)
    - [Diagramme de Classes](#diagramme-de-classes)
  - [Fonctionnalités Backoffice (Agent Administratif)](#fonctionnalités-backoffice-agent-administratif)
  - [APIs Frontoffice (Étudiant)](#apis-frontoffice-étudiant)
  - [Technologies Utilisées](#technologies-utilisées)
  - [Installation](#installation)
  - [Usage](#usage)

---

## Description du Projet

Le **Système de Gestion des Inscriptions des Étudiants** permet aux étudiants de gérer leurs inscriptions et leurs informations personnelles, et offre une interface de gestion pour les agents administratifs.

### Fonctionnalités

- **Étudiant** :
  - Créer et gérer un compte.
  - Modifier ses informations personnelles.
  - Soumettre des demandes d'inscription à un institut.
  - Consulter l'état des inscriptions (en attente, validée, rejetée).

- **Agent Administratif** :
  - Authentifier et gérer les comptes étudiants.
  - Valider ou rejeter des demandes d'inscription.
  - Consulter et modifier les informations des étudiants.
  - Gérer la liste des étudiants inscrits.

---

## Diagrammes

### Diagramme de Cas d'Utilisation

1. **Général** :
   - Interaction entre les acteurs (Étudiant et Agent Administratif) et les fonctionnalités principales du système.
   
   ![Diagramme de Cas d'Utilisation Général](./Diagrams/Diagramme%20de%20Cas%20D'utilisation%20Générale.png)

2. **Gestion des Étudiants** :
   - Gestion des comptes étudiants par les agents administratifs (ajout, modification, suppression).
   
   ![Diagramme de Cas d'Utilisation - Gérer les Étudiants](./Diagrams/Diagramme%20de%20Cas%20D'utilisation%20'Gérer%20étudiant'.png)

3. **Gestion des Inscriptions** :
   - Gestion des demandes d'inscription à un institut (validation, rejet, consultation des inscriptions en attente).
   
   ![Diagramme de Cas d'Utilisation - Gérer les Inscriptions](./Diagrams/Diagramme%20de%20Cas%20D'utilisation%20'Gérer%20inscription'.png)

---

## Conception

### Diagramme de Classes

Le diagramme de classes présente les entités principales du système : `Étudiant` et `Agent Administratif`, avec leurs attributs, méthodes et relations.

![Diagramme de Classes](./Diagrams/Diagramme%20de%20Classe.png)

---

## Fonctionnalités Backoffice (Agent Administratif)

1. **Connexion** : Authentification via email et mot de passe.
   
2. **Gestion des Étudiants** :
   - Modifier les informations d'un étudiant (nom, prénom, email, etc.).
   - Supprimer un étudiant du système.
   - Consulter et filtrer la liste des étudiants inscrits.

3. **Gestion des Inscriptions** :
   - Valider ou rejeter une demande d'inscription.
   - Consulter les inscriptions en attente.

---

## APIs Frontoffice (Étudiant)

1. **Authentification** :
   - `POST /api/users/seConnecter` : Authentification de l'étudiant via email et mot de passe.

2. **Création de Compte** :
   - `POST /api/users/creerCompte` : Création d'un compte étudiant avec les informations personnelles.

3. **Gestion du Profil** :
   - `GET /api/users/profil` : Récupérer les informations personnelles de l'étudiant connecté.
   - `PUT /api/users/modifierProfil` : Modifier les informations personnelles de l'étudiant.

4. **Inscription à un Institut** :
   - `POST /api/inscription` : Soumettre une demande d'inscription à un institut.

5. **État des Inscriptions** :
   - `GET /api/inscription/etat` : Consulter l'état des inscriptions soumises.

---

## Technologies Utilisées

- **Backend** : Node.js, Express
- **Base de données** : MongoDB

---

## Installation

1. Clonez le repository :
   ```bash
   git clone https://github.com/718Asma/inscription-etudiant.git
   ```

2. Navigate to the project directory:
   ```bash
    cd inscription-etudiant
   ```

3. Install the dependencies:
   ```bash
    npm install
   ```


## Usage

1. Start the application:
   ```bash
    npm start
   ```

2. Open your browser and navigate to http://localhost:6969.