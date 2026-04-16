# Contexte Projet — Lidl Drive Backend

> **Document de référence pour Claude Code et l'équipe dev.**
> À jour au : 15 avril 2026
> **Dernière modification** : Initialisation du projet NestJS + Supabase

---

## 1. Vue d'ensemble du projet

**Objectif** : Développer une webapp de type **Drive / Click & Collect** pour un supermarché style Lidl.

**Domaine fonctionnel** :
- Client choisit un magasin
- Consulte les produits disponibles (avec filtres et tri)
- Ajoute des articles au panier
- Choisit un créneau de retrait
- Valide la commande
- Opérateur du magasin prépare la commande dans une interface admin
- Client reçoit une confirmation et vient récupérer sa commande

**Équipe** :
- **Dev** : Frontend (React, autre dev) + Backend (NestJS, toi)
- **Cyber** : Sécurité, audit, rôles/permissions, conformité
- **Infra/Réseau** : (Pas de Docker ni reverse proxy dans le MVP — peut-être plus tard)

**Stack actuelle** :
- **Backend** : NestJS + TypeScript + TypeORM
- **BDD** : Supabase (PostgreSQL distante)
- **Auth** : JWT + refresh tokens
- **Documentation API** : Swagger (à `/api/docs`)

---

## 2. État actuel du projet

### ✅ Déjà fait

| Domaine | État | Détails |
|---------|------|---------|
| **Entités TypeORM** | ✅ Codées | Toutes les tables du `tables.md` ont leurs entités |
| **BDD Supabase** | ✅ Créée | Structure prête, pas encore connectée au backend |
| **Auth client** | ✅ Fonctionnel | Login + Register pour les clients |
| **Auth autres rôles** | ⚠️ À vérifier | OPERATOR, MANAGER, ADMIN probablement codés mais à tester |
| **Guards/Permissions** | ✅ Probablement bon | À confirmer lors de la connexion BDD |
| **Swagger** | ✅ Configuré | Accessible sur `localhost:3000/docs` |
| **Services & Controllers** | ✅ Générés | Structure NestJS standard respectée |

### ⚠️ À faire (priorité 1)

1. **Connecter Supabase au backend** (ce matin probablement)
   - Vérifier la connexion `DATABASE_URL`
   - Tester la synchronisation TypeORM
   - Valider que toutes les tables sont créées

2. **Logique métier : Recherche & Filtrage produits**
   - Filtrer par **catégorie**
   - Filtrer par **prix** (min/max)
   - Tri **ASC/DESC** sur le prix
   - Endpoint: `GET /api/products?category=X&minPrice=Y&maxPrice=Z&sort=price:asc`

3. **Vérification du stock au panier** (logique métier)
   - Quand le client ajoute un produit au panier, vérifier que la quantité existe dans le magasin sélectionné
   - Rejeter l'ajout si rupture de stock

### ⏳ À faire (priorité 2)

4. **Gestion des créneaux de retrait**
   - Récupérer les créneaux libres pour un magasin et une date
   - Vérifier la capacité (max commandes par créneau)
   - Réserver un créneau lors de la validation de commande
   - Libérer un créneau si la commande est annulée

5. **Logique de préparation en magasin**
   - Opérateur voit les commandes à préparer (statut PENDING)
   - Peut changer le statut (IN_PROGRESS → READY)
   - Peut signaler une rupture et proposer une substitution
   - Client reçoit une notification quand commande est READY

### 📅 À faire (priorité 3 — MVP avancé)

6. **Notifications**
   - Email/SMS de confirmation de commande
   - Alerte quand la commande est prête
   - Notification de substitution proposée

7. **Audit et logs**
   - Journaliser les actions sensibles (changements de statut, accès admin, etc.)
   - Table `AuditLog` remplie automatiquement

8. **Fidélité & Historique**
   - Points de fidélité (bonus MVP)
   - Historique des commandes du client

---

## 2.5. ⚡ SETUP URGENT — Vérification Supabase

**À faire dès maintenant (avant de lancer Claude Code)** :

### Étape 1 — Vérifier le `.env`

À la racine du projet backend, ouvre `.env` et cherche :

```env
DATABASE_URL=postgresql://...
```

**Si la ligne existe** → Passe à l'étape 2.

**Si elle n'existe pas** :
1. Va sur [Supabase dashboard](https://app.supabase.com)
2. Sélectionne ton projet
3. Va dans **Settings → Database → Connection string**
4. Copie la connection string **Mode: Node.js** (ou URI)
5. Ajoute-la dans `.env` :

```env
DATABASE_URL=postgresql://postgres.XXXXXXXXXXX:PASSWORD@db.supabase.co:5432/postgres
NODE_ENV=development
JWT_SECRET=ta_clé_secrète_ici
JWT_EXPIRES_IN=1h
PORT=3000
```

> ⚠️ Remplace `PASSWORD` par ton mot de passe Supabase réel. Et oui, c'est pas sécurisé en vraie prod, mais c'est bon pour le MVP.

### Étape 2 — Vérifier que `.env` est dans `.gitignore`

Dans le `.gitignore` à la racine du projet, tu dois voir :

```
.env
.env.local
```

Si ce n'est pas là, ajoute-le :

```bash
echo ".env" >> .gitignore
```

### Étape 3 — Vérifier la config TypeORM dans `app.module.ts`

Ouvre `src/app.module.ts` et vérifie que TypeORM utilise bien `DATABASE_URL` :

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get('DATABASE_URL'),  // ← Doit être là (ou les params séparés)
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // OK en dev
  }),
  inject: [ConfigService],
}),
```

Si ce n'est pas `url:` mais `host/port/user/password`, tu peux laisser (les deux marchent) **MAIS** c'est plus simple avec `url`.

### Étape 4 — Lancer le backend et tester

```bash
npm run start:dev
```

Tu dois voir dans le terminal :

```
Application démarrée sur : http://localhost:3000
Swagger disponible sur   : http://localhost:3000/docs
```

Puis va sur `http://localhost:3000/docs` et essaie un endpoint GET (ex : `GET /api/products`).

**Si tu vois une erreur de connexion BDD** : Vérifie que la `DATABASE_URL` est correcte (typo, password, etc.).

---

## 3. Entités & BDD

### Tables principales implémentées

Voir `tables.md` pour la documentation complète. Résumé des domaines :

| Domaine | Tables | État |
|---------|--------|------|
| **Utilisateurs** | Permission, Client, ClientAccount, ClientHistory, Preparer, Manager | ✅ Entités créées |
| **Catalogue & Stock** | Store, Category, Product, Stock | ✅ Entités créées |
| **Commande & Panier** | Cart, CartItem, Order, OrderItem, PickupSlot, SubstitutionProposal, Payment | ✅ Entités créées |
| **RH** | Schedule, Performance | ✅ Entités créées |
| **Système** | Notification, AuditLog | ✅ Entités créées |

### Points d'attention BDD

- **Stock** : Relation N-N (Store + Product). La quantité dispo d'un produit est spécifique à chaque magasin.
- **Cart vs Order** : Cart est temporaire (ACTIVE/ABANDONED/CONVERTED), Order est persistante (PENDING/IN_PROGRESS/READY/PICKED_UP/CANCELLED).
- **PickupSlot** : Un créneau par magasin, date, et heure. Capacité limitée (`max_orders`).
- **Permissions** : 4 rôles hiérarchiques : CLIENT < OPERATOR < MANAGER < ADMIN.

### Connexion Supabase

**Configuration attendue dans `.env`** :

```env
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
NODE_ENV=development
JWT_SECRET=<ta_clé_secrète>
JWT_EXPIRES_IN=1h
PORT=3000
```

> ⚠️ **IMPORTANT** : `.env` doit être dans `.gitignore`. Ne jamais committer les secrets.

---

## 4. Architecture Backend

### Structure des modules NestJS (proposée)

```
src/
├── auth/                  # Authentification + JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt.guard.ts
│   └── auth.module.ts
├── users/                 # Gestion Client, Preparer, Manager
├── stores/                # Magasins
├── products/              # Produits + Recherche/Filtrage
├── inventory/             # Stock par magasin
├── cart/                  # Panier client
├── orders/                # Commandes + Statuts
├── pickup-slots/          # Créneaux de retrait
├── notifications/         # Notifications (email, SMS)
├── audit/                 # Logs d'audit
├── common/                # Guards, Interceptors, Exceptions partagés
│   ├── guards/
│   ├── interceptors/
│   └── decorators/
└── main.ts
```

### Endpoints API (documentation côté frontend)

**Documentation interactive** : `http://localhost:3000/docs` (Swagger)

**Groupes principaux** :

| Endpoint | Méthode | Rôles autorisés | État |
|----------|---------|-----------------|------|
| `POST /api/auth/register` | POST | Public | ✅ |
| `POST /api/auth/login` | POST | Public | ✅ |
| `GET /api/products` | GET | Public | ✅ (basic) |
| `GET /api/products?category=X&minPrice=Y&sort=price:asc` | GET | Public | 🔴 À implémenter |
| `GET /api/stores` | GET | Public | ✅ |
| `POST /api/cart` | POST | CLIENT | ✅ (probablement) |
| `GET /api/cart/:id` | GET | CLIENT | ✅ (probablement) |
| `POST /api/orders` | POST | CLIENT | 🔴 À implémenter (logique complète) |
| `GET /api/orders/:id` | GET | CLIENT | ✅ (probablement) |
| `GET /api/pickup-slots/:storeId` | GET | Public | 🔴 À implémenter |
| `PUT /api/orders/:id/status` | PUT | OPERATOR | 🔴 À implémenter |
| `POST /api/substitutions` | POST | OPERATOR | 🔴 À implémenter |

---

## 5. Checklist de développement

### Phase 1 — Stabilisation (Ce matin/demain)

- [ ] Connecter Supabase au backend NestJS
- [ ] Vérifier que TypeORM synchronise toutes les tables
- [ ] Tester les endpoints de base (GET products, GET stores)
- [ ] Tester login/register client et vérifier JWT
- [ ] Vérifier que Swagger affiche tous les endpoints

### Phase 2 — Logique métier prioritaire

**Produits & Recherche**
- [ ] Implémenter filtrage par catégorie dans ProductsController
- [ ] Implémenter filtrage par prix (min/max)
- [ ] Implémenter tri ASC/DESC sur le prix
- [ ] Tester les 3 filtres ensemble
- [ ] Documenter les paramètres de query dans Swagger

**Stock & Panier**
- [ ] Quand un produit est ajouté au panier, vérifier que la quantité existe dans le magasin
- [ ] Rejeter avec un message d'erreur cohérent si rupture de stock
- [ ] (Optionnel) Proposer une quantité réduite plutôt que rejeter

**Créneaux de retrait**
- [ ] Implémenter `GET /api/pickup-slots?storeId=X&date=YYYY-MM-DD`
- [ ] Retourner uniquement les créneaux `is_available=true`
- [ ] Vérifier la logique de capacité (current_orders < max_orders)

### Phase 3 — Commandes & Préparation

**Création de commande**
- [ ] Créer une order à partir d'un cart validé
- [ ] Vérifier le stock une dernière fois
- [ ] Réserver le créneau (incrémenter `current_orders`)
- [ ] Générer un `pickup_code`
- [ ] Passer le cart en statut CONVERTED

**Interface opérateur**
- [ ] `GET /api/orders?status=PENDING` (pour le préparateur)
- [ ] `PUT /api/orders/:id/status` (changer le statut)
- [ ] `POST /api/substitutions` (proposer un remplacement)

### Phase 4 — Notifications & Audit (MVP avancé)

- [ ] Créer une entry AuditLog à chaque action sensible
- [ ] (Optionnel) Implémenter les notifications email/SMS
- [ ] (Optionnel) Dashboard client pour voir l'historique

---

## 6. Règles métier critiques

### Stock

- Le stock est **par magasin** (table Stock : store_id + product_id + available_quantity).
- Quand un client ajoute un article au panier, on **ne décrémente pas le stock** (juste une vérification).
- Quand la commande est validée, le stock **peut être réservé** (mais pas automatiquement décrémenté).
- Quand la commande est PICKED_UP, le stock est **décrémenté réellement**.
- ⚠️ **Cas spécial** : Un produit visible au catalogue peut être indisponible dans un magasin spécifique (Stock.available_quantity = 0).

### Créneaux de retrait

- Un créneau est défini par : store_id, date, start_time, end_time.
- Capacité : max_orders par créneau.
- Quand un client valide une commande, `current_orders` augmente de 1.
- Quand `current_orders >= max_orders`, le créneau passe `is_available=false`.
- Quand une commande est annulée (CANCELLED), `current_orders` diminue et le créneau redevient disponible si possible.

### Statuts de commande

```
PENDING (créée, attente de préparation)
  ↓
IN_PROGRESS (préparateur en train de préparer)
  ↓
READY (commande prête à être retirée)
  ↓
PICKED_UP (client a retiré sa commande)

OU CANCELLED (à tout moment)
```

### Rupture & Substitution

- Quand le préparateur réalise qu'un produit est absent, il signale une rupture.
- Il propose un remplacement via la table SubstitutionProposal.
- Le client est notifié et peut accepter/refuser.
- Si accepté : l'OrderItem pointe vers le produit remplaçant.
- Si refusé : la commande est annulée (ou l'article est supprimé de la préparation).

---

## 7. Notes pour Claude Code

### Conventions de code

**Nommage** :
- Entités : PascalCase (ex : `Product`, `PickupSlot`)
- Fichiers : kebab-case (ex : `product.entity.ts`, `pickup-slot.controller.ts`)
- Variables/fonctions : camelCase
- Constantes : UPPER_SNAKE_CASE

**Structure des fichiers** :
- 1 fichier `.entity.ts` par table
- 1 fichier `.module.ts` par module
- 1 fichier `.service.ts` par domaine (logique métier)
- 1 fichier `.controller.ts` par module (routes)
- DTOs dans un dossier `dto/` (ex : `create-product.dto.ts`)

**DTOs** :
- Toujours utiliser `class-validator` pour valider les inputs
- Ajouter `@ApiProperty()` de Swagger pour la doc auto

**Réponses API** :
```typescript
// Succès
{ statusCode: 200, message: "...", data: {...} }

// Erreur
{ statusCode: 400, message: "Validation failed", errors: {...} }
```

**Gestion des erreurs** :
- Utiliser les exceptions NestJS (HttpException, BadRequestException, etc.)
- Toujours fournir un message d'erreur en français côté client

### Points d'attention

1. **Transactions BDD** : Certaines opérations (validation de commande, réservation de créneau) doivent être atomiques. Utiliser TypeORM `QueryRunner` si besoin.

2. **Relations TypeORM** : Bien charger les relations avec `.leftJoinAndSelect()` pour éviter les N+1 queries.

3. **JWT & Guards** : 
   - `JwtGuard` sur tous les endpoints CLIENT/OPERATOR/MANAGER/ADMIN.
   - `RolesGuard` pour restreindre par rôle.

4. **Logs** : Logger les opérations critiques (création de commande, changement de statut).

---

## 8. Intégration Frontend

### Pour le dev frontend

**Point d'accès API** : `http://localhost:3000/api`

**Documentation** : `http://localhost:3000/docs` (Swagger interactif)

**Authentification** :
- Login → récupère un JWT dans la réponse
- Passer le JWT dans l'en-tête `Authorization: Bearer <token>` à chaque requête

**Gestion des erreurs** :
- Les erreurs 400 contiennent un objet `errors` détaillant les champs invalides.
- Les erreurs 401/403 indiquent une authentification/autorisation manquante.

**CORS** : Activé. Le frontend (React, autre) peut appeler l'API directement.

---

## 9. Questions ouvertes / Décisions à prendre

- [ ] Paiement en ligne : Simulé complètement ou intégration partielle (stripe mock) ?
- [ ] Notifications : Mail uniquement ou SMS aussi ?
- [ ] Fidélité : MVP minimum ou MVP avancé ?
- [ ] Historique commandes : Visible au client ou optionnel ?
- [ ] Gestion de stock : Réservation ou juste vérification ?

---

## 10. Ressources utiles

| Ressource | Lien |
|-----------|------|
| **Docs du projet** | `lidl-drive-brainstorm-technique.md` |
| **Modèle BDD** | `tables.md` |
| **Backend setup** | `back/backend-setup-guide.md` (si besoin de réf) |
| **NestJS docs** | https://docs.nestjs.com |
| **TypeORM docs** | https://typeorm.io |
| **Swagger docs** | https://docs.nestjs.com/openapi/introduction |

---

## 11. Dernières notes

**Priorités pour Claude Code (dans l'ordre)** :

1. Tester la connexion Supabase
2. Implémenter filtrage/tri produits
3. Vérifier stock au panier
4. Implémenter créneaux de retrait
5. Implémenter création de commande avec logique complète
6. Préparer interface opérateur (changement de statut)

**Si tu as des doutes** :
- Consulte `tables.md` pour la structure exacte des tables
- Consulte `lidl-drive-brainstorm-technique.md` pour le contexte métier
- Demande clarification plutôt que de deviner

---

**Dernière mise à jour** : 15 avril 2026
**Prochaine révision prévue** : Après connexion Supabase
