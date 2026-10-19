import { useState } from 'react'
import { PRODUCTOS } from './data/productos'
import { useCarrito } from './hooks/useCarrito'
import Navbar from './components/Navbar'
import ProductoCard from './components/ProductoCard'
import CarritoPanel from './components/CarritoPanel'
import './App.css'

export default function App() {
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const carrito = useCarrito()

  return (
    <>
      <Navbar unidades={carrito.unidades} onAbrirCarrito={() => setCarritoAbierto(true)} />
      <main className="catalogo">
        <h1>Sabores de la región</h1>
        <p className="catalogo__intro">Productos típicos, con el stock real de nuestra bodega.</p>
        <div className="rejilla">
          {PRODUCTOS.map((p) => (
            <ProductoCard key={p.id} producto={p} enCarrito={carrito.cantidadDe(p.id)}
              onAgregar={carrito.agregar} />
          ))}
        </div>
      </main>
      {carritoAbierto && <CarritoPanel carrito={carrito} onCerrar={() => setCarritoAbierto(false)} />}
    </>
  )
}
