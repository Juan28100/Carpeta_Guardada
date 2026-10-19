# Tienda Palmira – Carrito de compras (React)

- **Aprendiz:** _tu nombre completo_
- **Ficha:** _número de ficha_
- **Repositorio:** _enlace público de GitHub/GitLab_
- **Tecnología:** React 19 + Vite (sin librerías adicionales para el carrito)

## Instalar y ejecutar

```bash
git clone <enlace-del-repositorio>
cd <carpeta-del-repositorio>
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Estructura

```
src/
├── data/productos.js         # Catálogo (array JSON)
├── utils/                    # Formato COP y mensajes de los toasts
├── context/                  # ToastContext + ToastProvider
├── hooks/useCarrito.js       # Estado y reglas del carrito
└── components/               # Navbar, ProductoCard, CantidadInput,
                              # CarritoPanel, CarritoItem, ToastContainer
```

## Funcionalidades

- Navbar fija con el ícono del carrito a la derecha y contador de unidades.
- Catálogo desde un array JSON; agregar el mismo producto suma en una sola línea.
- Campo de cantidad reutilizable: bloquea `e`, `E`, `+`, `-`, `.`, `,`, pegado inválido, 0 y rueda del mouse.
- Stock máximo con toast en el campo, el botón `+` y al agregar de nuevo.
- Mínimo 1 con toast y confirmación para eliminar; botón "Quitar" directo.
- Subtotales, total y total de unidades en formato COP.
- Valor agregado: carrito persistente (localStorage), toasts accesibles (`aria-live`), responsive.

## Evidencias

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | `evidencias/01-navbar.png` | |
| 2 | Agregar producto desde el catálogo | `evidencias/02-agregar.png` | |
| 3 | Bloqueo de "e", negativos y 0 | `evidencias/03-bloqueo.png` | |
| 4 | Toast de stock máximo | `evidencias/04-maximo.png` | |
| 5 | Toast de mínimo con opción de eliminar | `evidencias/05-minimo.png` | |
| 6 | Subtotales y total con varios productos | `evidencias/06-totales.png` | |
| 7 | Producto eliminado y total recalculado | `evidencias/07-eliminado.png` | |
