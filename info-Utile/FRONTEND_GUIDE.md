# Guide d'intégration Front-end — Lidl Drive API

## 1. Lancer le back-end en local

### Prérequis
- Node.js 18+
- npm

### Étapes

```bash
# 1. Cloner le repo et aller dans le dossier
cd back-lidl

# 2. Installer les dépendances
npm install

# 3. Créer le fichier d'environnement
cp .env.example .env
# (ou demander le fichier .env à l'équipe back — il contient DATABASE_URL)

# 4. Lancer le serveur
npm run start:dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 2. Documentation interactive (Swagger)

Ouvre **http://localhost:3000/docs** dans le navigateur.

Tu peux tester tous les endpoints directement depuis l'interface — utile pour explorer les réponses avant de coder.

---

## 3. Base URL

```
http://localhost:3000/api
```

Tous les endpoints sont préfixés par `/api`.

---

## 4. Authentification

L'API utilise **JWT Bearer token**.

### Se connecter

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "dorianjacolin@example.com",
  "password": "dodolePluBo"
}
```

**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "CLIENT"
}
```

### Créer un compte client

```http
POST /api/auth/register
Content-Type: application/json

{
  "last_name": "Dupont",
  "first_name": "Marie",
  "email": "marie.dupont@example.com",
  "password": "monMotDePasse",
  "phone": "0612345678",
  "address": "3 rue des Lilas, Lyon"
}
```

### Utiliser le token dans les requêtes protégées

```http
Authorization: Bearer <access_token>
```

---

## 5. Endpoints disponibles

### Catalogue

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/product` | Liste tous les produits actifs |
| GET | `/api/product/:id` | Détail d'un produit |
| GET | `/api/category` | Liste toutes les catégories |
| GET | `/api/category/:id` | Détail d'une catégorie |
| GET | `/api/store` | Liste tous les magasins |
| GET | `/api/store/:id` | Détail d'un magasin |
| GET | `/api/stock` | Liste les stocks par magasin/produit |

### Commande

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/pickup-slot` | Liste les créneaux de retrait |
| GET | `/api/cart` | Liste les paniers |
| GET | `/api/cart/:id` | Détail d'un panier |
| GET | `/api/cart-item` | Liste les lignes de panier |
| GET | `/api/order` | Liste les commandes |
| GET | `/api/order/:id` | Détail d'une commande |
| GET | `/api/order-item` | Liste les lignes de commande |
| GET | `/api/payment` | Liste les paiements |

### Utilisateurs

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/api/client` | Liste les clients |
| GET | `/api/client/:id` | Détail d'un client |
| GET | `/api/preparer` | Liste les préparateurs |
| GET | `/api/manager` | Liste les managers |

---

## 6. Exemple d'intégration React

### Installer axios (si pas déjà fait)

```bash
npm install axios
```

### Fichier de configuration API

```js
// src/api/client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Ajoute automatiquement le token JWT si présent
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Se connecter et stocker le token

```js
// src/services/auth.js
import api from '../api/client';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('role', data.role);
  return data;
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('role');
}
```

### Récupérer des produits

```js
import api from '../api/client';

// Dans un composant React
useEffect(() => {
  api.get('/product')
    .then(res => setProducts(res.data))
    .catch(err => console.error(err));
}, []);
```

### Récupérer un produit par ID

```js
api.get(`/product/${id}`).then(res => setProduct(res.data));
```

### Récupérer les magasins

```js
api.get('/store').then(res => setStores(res.data));
```

---

## 7. CORS

Le CORS est activé sur toutes les origines en dev — pas de configuration nécessaire côté React pour `localhost`.

---

## 8. Rôles utilisateurs

| Rôle | Accès |
|---|---|
| `CLIENT` | Catalogue, panier, commandes propres |
| `OPERATOR` | Préparation des commandes |
| `MANAGER` | Supervision, planning, performances |
| `ADMIN` | Accès complet |

Le rôle est retourné dans la réponse du login et encodé dans le JWT.
