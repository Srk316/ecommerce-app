# ShopStack — Local E‑commerce App

A full‑stack demo store you can run locally.

## Stack
- **Client:** Vite + React + TypeScript + Tailwind + React Router
- **Server:** Express + JSON storage (no external DB required)

## Features
- Product grid with search, filters (category, price), sorting
- Product detail page
- Cart with quantity, remove, subtotal
- Checkout (mock payment), order creation
- Login with demo auth (token stored in localStorage)
- Orders list for the logged-in user

## Quick Start
### 1) Server
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
Server runs at http://localhost:8788

### 2) Client
```bash
cd client
npm install
npm run dev
```
Client runs at http://localhost:5173 and proxies `/api` to the server.

## Demo Login
Email: `demo@shopstack.dev` or anything ending with `@shopstack.dev`  
Password: any string

## Notes
- Data is stored in `server/data/*.json` so you can edit products easily.
- Images use placeholder URLs. Replace with your own if you like.
- This is a safe local demo—no real payments.

Enjoy!
