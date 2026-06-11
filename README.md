# Cloudflare Pages + React + D1 demo

Minimal todo app:

- React/Vite frontend
- Cloudflare Pages Functions backend
- Cloudflare D1 SQLite database

## 1. Install dependencies

```bash
npm install
```

## 2. Login to Cloudflare

```bash
npx wrangler login
```

## 3. Create a D1 database

```bash
npx wrangler d1 create demo-db
```

Copy the returned `database_id` into `wrangler.toml`.

## 4. Create the table locally

```bash
npx wrangler d1 execute demo-db --local --file=./schema.sql
```

## 5. Build and run locally with Pages Functions

```bash
npm run build
npx wrangler pages dev dist --d1 DB=demo-db
```

Open the local URL Wrangler prints.

## 6. Create the table in the remote D1 database

```bash
npx wrangler d1 execute demo-db --remote --file=./schema.sql
```

## 7. Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist
```

## Important files

```txt
src/main.jsx              React frontend
functions/api/todos.js    Server-side API route
schema.sql                D1 table schema
wrangler.toml             D1 binding config
```

The API route is available at:

```txt
/api/todos
```

Cloudflare injects the D1 database into the Pages Function as:

```js
context.env.DB
```
