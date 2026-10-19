# LAB CRUD - Backend

Backend pedagogico con express, MySQL, bcrypt, JWT y roles `admin` / `cliente`

# 1. BASE DE DATOS

ejecuta `../sql/lab_crud.sql` en MySQL.

# 2.Variable de entorno

copia:

`.env.example` -> `.env`

y completa las credenciales de MySQL y `JWT_SECRET`.

## 3. Instalar

```bash
npm install
```

## 4. Ejecutar

```bash
npm run dev
```

API: `http://localhost:3000`

## Rutas

Públicas:
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/health`

Protegidas:
- GET `/api/equipos`
- GET `/api/equipos/:id`
- POST `/api/equipos`
- PUT `/api/equipos/:id`
- DELETE `/api/equipos/:id` - solo `admin`

## Flujo pedagogico

Registro -> bcrypt.hash -> MySQL -> login -> bcrypt.compare -> JWT -> middleware -> autorizacion por rol -> CRUD.