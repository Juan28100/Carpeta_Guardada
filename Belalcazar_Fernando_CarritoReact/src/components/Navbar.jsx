export default function Navbar({ unidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <span className="navbar__marca">Tienda Palmira</span>
      <button
        type="button"
        className="navbar__carrito"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${unidades} ${unidades === 1 ? 'unidad' : 'unidades'}`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20.5 7H6" />
        </svg>
        {unidades > 0 && <span className="navbar__contador" aria-hidden="true">{unidades}</span>}
      </button>
    </header>
  )
}
