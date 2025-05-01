#  E-Commerce Backend API

A modular, secure TypeScript-based REST API for e-commerce platforms. Built with Express, PostgreSQL (Knex), and Zod for validation.

---

##  Tech Stack

- **Language**: TypeScript
- **Server**: Express.js
- **DB**: PostgreSQL with Knex.js
- **Auth**: JWT + Refresh Tokens
- **Validation**: Zod
- **Others**: dotenv, bcrypt, ts-node, nodemon

---

##  Setup & Run

```bash
# Install deps
npm install

# Copy env config
cp .env.example .env

# Migrate DB & Seed admin user
npx knex migrate:latest
npx knex seed:run

# Start dev server
npm run dev
```

---

## Auth System

- Access token: short-lived (`10m`)
- Refresh token: long-lived (7 days), stored in DB
- Auto-expired refresh token cleanup
- Token rotation on refresh

---

##  Features

- User & Admin registration/login
- Role-based route protection
- Product & Category CRUD (Admin only)
- Address management (User)
- Order placement & history
- Full schema validation via Zod

---

## API Base URL

```bash
http://localhost:4000/api
```

---

## Postman Collection

Test all endpoints using the provided collection:

➡️ [Download Collection](./docs/E-Commerce%20API%20Complete%20Test%20Collection.postman_collection.json)

After importing:
- Set `{{baseurl}}` to your API root (e.g., `http://localhost:4000`)
- Use `{{userToken}}` and `{{adminToken}}` after login to authorize requests

---


## 📌 Scripts

```bash
npm run dev       # Start dev server
npx knex migrate:latest  # Run migrations
npx knex seed:run        # Seed initial data
```

---

## Environment Variables

Configure your  `.env`   with `.env.example`


---


