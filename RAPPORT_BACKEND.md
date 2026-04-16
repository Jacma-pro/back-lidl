# Rapport Backend — Lidl Drive (Click & Collect)

**Auteur** : Dorian Jacolin  
**Projet** : Back-lidl — API REST NestJS  
**Date** : Avril 2026  

---

## 1. Présentation du projet

Le projet **Lidl Drive** est une application de type **Click & Collect** permettant à des clients de commander des produits en ligne et de les récupérer en magasin à un créneau horaire choisi. J'ai été en charge de l'intégralité de la partie **backend**, depuis la conception de l'architecture jusqu'au déploiement, en passant par la connexion avec le frontend pour permettre la récupération des données via l'API.

---

## 2. Stack technique

| Élément | Technologie |
|--------|-------------|
| Framework | NestJS 11 (TypeScript) |
| Base de données | PostgreSQL via Supabase |
| ORM | TypeORM 0.3 |
| Authentification | JWT (JSON Web Tokens) + Passport |
| Documentation API | Swagger / OpenAPI |
| Conteneurisation | Docker (Node 24 Alpine) |
| Validation | class-validator / class-transformer |
| Hachage | bcrypt |

---

## 3. Architecture du projet

Le projet suit une architecture **modulaire NestJS** : chaque domaine métier est encapsulé dans un module indépendant (controller, service, entity, DTO). L'application est exposée avec le préfixe global `/api` et la documentation Swagger est accessible à `/api/docs`.

```
/src
  /auth                   — Authentification (login, register, JWT, Passport)
  /products               — Catalogue produits
  /categories             — Catégories de produits
  /stores                 — Points de vente
  /client                 — Gestion des clients
  /preparer               — Personnel de préparation des commandes
  /manager                — Gérants de magasin
  /permission             — Rôles et permissions
  /cart                   — Panier d'achat
  /cart-item              — Articles du panier
  /order                  — Commandes
  /order-item             — Lignes de commande
  /pickup-slot            — Créneaux de retrait
  /payment                — Suivi des paiements
  /substitution-proposal  — Propositions de substitution produit
  /stock                  — Gestion des stocks par magasin
  /schedule               — Plannings des préparateurs
  /performance            — Métriques de performance du personnel
  /notification           — Notifications (email / SMS / push)
  /audit-log              — Journal d'audit
  /client-account         — Statut du compte client
  /client-history         — Historique et fidélité client
  /common
    /guards               — JwtAuthGuard, RolesGuard
    /decorators           — @Roles()
  main.ts                 — Bootstrap + CORS + Swagger + ValidationPipe
  app.module.ts           — Module racine (import de tous les modules)
```

---

## 4. Base de données — 22 tables

L'ensemble du schéma a été conçu et implémenté via **TypeORM**, hébergé sur **Supabase** (PostgreSQL managé). Voici les entités par domaine :

### Gestion des utilisateurs
| Table | Description |
|-------|-------------|
| `permission` | Rôles : CLIENT, OPERATOR, MANAGER, ADMIN |
| `client` | Clients (email, adresse, téléphone, mot de passe hashé) |
| `preparer` | Préparateurs de commandes (liés à un magasin) |
| `manager` | Gérants de magasin (liés à un magasin) |
| `client_account` | Statut du compte (vérifié, actif, dernière connexion) |
| `client_history` | Historique de fidélité (points, statut) |

### Magasins & Catalogue
| Table | Description |
|-------|-------------|
| `store` | Magasins (adresse, géolocalisation, horaires, capacités) |
| `category` | Catégories avec restrictions (JSON) |
| `product` | Produits (prix, nutriscore, image, barcode, dimensions) |
| `stock` | Stock par magasin et par produit |

### Commandes & Commerce
| Table | Description |
|-------|-------------|
| `cart` | Paniers (ACTIVE / ABANDONED / CONVERTED) |
| `cart_item` | Articles dans le panier |
| `pickup_slot` | Créneaux de retrait (date, heure, capacité max) |
| `order` | Commandes (PENDING → IN_PROGRESS → READY → PICKED_UP / CANCELLED) |
| `order_item` | Lignes de commande |
| `substitution_proposal` | Substitutions proposées en cas de rupture |
| `payment` | Paiements (IN_STORE / SIMULATED_ONLINE, PENDING / VALIDATED / REFUNDED) |

### Opérations & Système
| Table | Description |
|-------|-------------|
| `schedule` | Plannings des préparateurs (PRESENT / ABSENT / ON_LEAVE) |
| `performance` | Métriques de performance (temps moyen, taux d'erreur, score global) |
| `notification` | Notifications (CONFIRMATION / READY / CANCELLATION / SUBSTITUTION) |
| `audit_log` | Journal d'audit (acteur, action, table cible, IP) |

---

## 5. Authentification & Sécurité

J'ai mis en place un système d'authentification complet basé sur **JWT + Passport** :

- **Inscription** (`POST /api/auth/register`) : réservée aux clients. Le mot de passe est hashé avec **bcrypt** (coût 10) avant persistance.
- **Connexion** (`POST /api/auth/login`) : accepte les trois types d'utilisateurs (CLIENT, OPERATOR, MANAGER). Retourne un `access_token` JWT et le `role` de l'utilisateur.
- **Payload JWT** : contient le `sub` (id), le `role`, et le `storeId` (pour les opérateurs/managers).
- **Durées** : 10 min pour ADMIN, 15 min pour les autres rôles.

### Guards & Décorateurs
- **`JwtAuthGuard`** : vérifie la validité du token sur les routes protégées.
- **`RolesGuard`** : vérifie que le rôle de l'utilisateur connecté correspond au(x) rôle(s) requis.
- **`@Roles()`** : décorateur personnalisé pour restreindre l'accès par rôle.

---

## 6. Endpoints de l'API

Plus de **60 endpoints REST** ont été implémentés et documentés sur Swagger. Voici un résumé par module :

| Module | Routes disponibles |
|--------|-------------------|
| Auth | `POST /auth/login`, `POST /auth/register` |
| Products | `GET /product`, `GET /product/:id`, `POST /product` |
| Categories | `GET /category`, `GET /category/:id`, `POST /category` |
| Stores | `GET /store`, `GET /store/:id`, `POST /store` |
| Client | `GET /client`, `GET /client/:id`, `POST /client` |
| Preparer | `GET /preparer`, `GET /preparer/:id`, `POST /preparer` |
| Manager | `GET /manager`, `GET /manager/:id`, `POST /manager` |
| Permission | `GET /permission`, `GET /permission/:id`, `POST /permission` |
| Cart | `GET /cart`, `GET /cart/:id`, `POST /cart` |
| Cart Item | `GET /cart-item`, `GET /cart-item/:id`, `POST /cart-item` |
| Order | `GET /order`, `GET /order/:id`, `POST /order` |
| Order Item | `GET /order-item`, `GET /order-item/:id`, `POST /order-item` |
| Pickup Slot | `GET /pickup-slot`, `GET /pickup-slot/:id`, `POST /pickup-slot` |
| Payment | `GET /payment`, `GET /payment/:id`, `POST /payment` |
| Substitution | `GET /substitution-proposal`, `GET /substitution-proposal/:id`, `POST /substitution-proposal` |
| Stock | `GET /stock`, `GET /stock/:id`, `POST /stock` |
| Schedule | `GET /schedule`, `GET /schedule/:id`, `POST /schedule` |
| Performance | `GET /performance`, `GET /performance/:id`, `POST /performance` |
| Notification | `GET /notification`, `GET /notification/:id`, `POST /notification` |
| Audit Log | `GET /audit-log`, `GET /audit-log/:id`, `POST /audit-log` |
| Client Account | `GET /client-account`, `GET /client-account/:id`, `POST /client-account` |
| Client History | `GET /client-history`, `GET /client-history/:id`, `POST /client-history` |

---

## 7. Documentation Swagger

Une documentation interactive a été mise en place via **@nestjs/swagger** et est accessible à l'adresse `/api/docs`. Elle inclut :

- Le support de l'authentification **Bearer Token** (JWT).
- La description de chaque endpoint avec `@ApiOperation`, `@ApiResponse`, `@ApiParam`, `@ApiBody`, `@ApiTags`.
- Des exemples de corps de requête pour toutes les routes POST.

---

## 8. Configuration & Déploiement

### Variables d'environnement
La configuration est centralisée via **ConfigModule** :

```env
DATABASE_URL=postgresql://...   # Connexion Supabase
JWT_SECRET=...                  # Secret de signature JWT
PORT=3000
NODE_ENV=development
```

### Configuration TypeORM / Supabase
- SSL activé avec `rejectUnauthorized: false` (certificat Supabase).
- `family: 4` (IPv4 forcé) pour éviter les timeouts de connexion.
- `synchronize: false` : le schéma est géré manuellement sur Supabase.

### Docker
Un **Dockerfile** de déploiement a été rédigé (image Node 24 Alpine) pour permettre la containerisation de l'API :

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 9. Connexion avec le frontend

En parallèle du développement backend, j'ai également assuré **la connexion entre l'API et le frontend**. Cela a impliqué :

- La mise en place du **CORS** dans `main.ts` pour autoriser les requêtes depuis l'application cliente.
- La rédaction d'un **guide d'intégration frontend** (`info-Utile/FRONTEND_GUIDE.md`) à destination des développeurs frontend, détaillant les endpoints disponibles, les formats de requêtes/réponses, et la gestion du token JWT (stockage, envoi dans les headers `Authorization: Bearer <token>`).
- La coordination avec l'équipe frontend pour s'assurer que les données retournées par l'API correspondaient aux besoins des vues (formats JSON, structures des objets, codes de retour HTTP).
- Les ajustements des réponses API suite aux retours de l'équipe frontend (exemples de données dans la documentation Swagger, adaptation des champs exposés).

---

## 10. Règles métier implémentées

- Un **panier** est lié à un client et un magasin ; il passe de `ACTIVE` à `CONVERTED` lors de la validation de la commande.
- Un **créneau de retrait** se ferme automatiquement lorsque sa capacité maximale est atteinte.
- Une **commande** suit un cycle de vie strict : `PENDING → IN_PROGRESS → READY → PICKED_UP` (ou `CANCELLED`).
- En cas de rupture de stock, une **proposition de substitution** est générée ; le client peut l'accepter ou la refuser.
- Les **rôles** forment une hiérarchie : CLIENT < OPERATOR < MANAGER < ADMIN.
- Les **mots de passe** sont systématiquement hashés avant persistance en base.

---

## 11. Bilan

Ce projet m'a permis de mettre en œuvre une **API REST complète en NestJS** dans un contexte e-commerce réel. J'ai conçu et développé :

- Une architecture modulaire à **22 modules** et **22 tables** en base de données.
- Un système d'authentification JWT avec gestion des rôles.
- Plus de 60 endpoints documentés sur Swagger.
- La configuration complète de la base de données PostgreSQL (Supabase) avec TypeORM.
- Un Dockerfile pour le déploiement.
- La liaison avec le frontend pour la récupération et l'exploitation des données de l'API.
