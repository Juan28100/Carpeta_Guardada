import { useState } from 'react'
import CantidadInput from './CantidadInput'
import { useToast } from '../context/ToastContext'
import { IMAGENES } from '../data/imagenes'
import { formatearCOP } from '../utils/formato'
import { MSG_MAXIMO, MSG_MINIMO_CATALOGO } from '../utils/mensajes'

export default function ProductoCard({ producto, enCarrito, onAgregar }) {
  const { mostrar } = useToast()
  const [cantidad, setCantidad] = useState(1)
  const agotado = enCarrito >= producto.stock

  const avisarMinimo = () => mostrar({ mensaje: MSG_MINIMO_CATALOGO, tipo: 'warning' })
  const avisarMaximo = () => mostrar({ mensaje: MSG_MAXIMO, tipo: 'warning' })

  const restar = () => (cantidad <= 1 ? avisarMinimo() : setCantidad(cantidad - 1))
  const sumar = () => (cantidad >= producto.stock ? avisarMaximo() : setCantidad(cantidad + 1))

  const agregar = () => {
    onAgregar(producto, cantidad)
    setCantidad(1)
  }

  return (
    <article className="producto">
      <img className="producto__img" src={IMAGENES[producto.id]} alt={producto.nombre} loading="lazy" />
      <h2 className="producto__nombre">{producto.nombre}</h2>
      <p className="producto__precio">{formatearCOP(producto.precio)}</p>
      <p className="producto__stock">
        Stock: {producto.stock}
        {enCarrito > 0 && <span> · En tu carrito: {enCarrito}</span>}
      </p>
      {agotado ? (
        <p className="producto__agotado">Ya tienes todo el stock disponible en tu carrito.</p>
      ) : (
        <div className="producto__cantidad">
          <button type="button" className="boton boton--icono" onClick={restar}
            aria-label={`Restar una unidad de ${producto.nombre}`}>−</button>
          <CantidadInput
            id={`cantidad-${producto.id}`}
            etiqueta={`Cantidad de ${producto.nombre}`}
            value={cantidad}
            max={producto.stock}
            onChange={setCantidad}
            onMinimo={avisarMinimo}
            onMaximo={avisarMaximo}
          />
          <button type="button" className="boton boton--icono" onClick={sumar}
            aria-label={`Sumar una unidad de ${producto.nombre}`}>+</button>
        </div>
      )}
      <button type="button" className="boton boton--primario" onClick={agregar} disabled={agotado}>
        Agregar
      </button>
    </article>
  )
}
