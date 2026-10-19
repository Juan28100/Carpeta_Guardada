import { useEffect, useRef } from 'react'
import CarritoItem from './CarritoItem'
import { formatearCOP } from '../utils/formato'

export default function CarritoPanel({ carrito, onCerrar }) {
  const botonCerrar = useRef(null)

  // El foco inicial va aparte: así no se roba el foco al re-renderizar mientras se edita una cantidad.
  useEffect(() => botonCerrar.current?.focus(), [])

  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && onCerrar()
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [onCerrar])

  return (
    <>
      <div className="velo" onClick={onCerrar} />
      <aside className="panel" role="dialog" aria-modal="true" aria-labelledby="titulo-carrito">
        <header className="panel__cabecera">
          <h2 id="titulo-carrito">Tu carrito</h2>
          <button ref={botonCerrar} type="button" className="boton boton--icono"
            aria-label="Cerrar carrito" onClick={onCerrar}>×</button>
        </header>

        {carrito.lineas.length === 0 ? (
          <p className="panel__vacio">Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        ) : (
          <>
            <ul className="panel__lista">
              {carrito.lineas.map((linea) => (
                <CarritoItem key={linea.id} linea={linea} carrito={carrito} />
              ))}
            </ul>
            <footer className="panel__totales">
              <p><span>Total de unidades</span><strong>{carrito.unidades}</strong></p>
              <p className="panel__total"><span>Total de la compra</span>
                <strong>{formatearCOP(carrito.total)}</strong></p>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
