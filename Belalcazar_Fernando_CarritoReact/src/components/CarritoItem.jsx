import CantidadInput from './CantidadInput'
import { IMAGENES } from '../data/imagenes'
import { formatearCOP } from '../utils/formato'

export default function CarritoItem({ linea, carrito }) {
  const { id, nombre, precio, stock, cantidad, subtotal } = linea
  return (
    <li className="item">
      <div className="item__info">
        <img className="item__img" src={IMAGENES[id]} alt="" />
        <div>
          <p className="item__nombre">{nombre}</p>
          <p className="item__unitario">{formatearCOP(precio)} c/u</p>
        </div>
      </div>
      <div className="item__controles">
        <button type="button" className="boton boton--icono" aria-label={`Restar una unidad de ${nombre}`}
          onClick={() => carrito.restar(id)}>−</button>
        <CantidadInput
          id={`carrito-cantidad-${id}`}
          etiqueta={`Cantidad de ${nombre} en el carrito`}
          value={cantidad}
          max={stock}
          onChange={(n) => carrito.cambiarCantidad(id, n)}
          onMinimo={() => carrito.pedirEliminar(id)}
          onMaximo={carrito.avisarMaximo}
        />
        <button type="button" className="boton boton--icono" aria-label={`Sumar una unidad de ${nombre}`}
          onClick={() => carrito.sumar(id)}>+</button>
      </div>
      <p className="item__subtotal">{formatearCOP(subtotal)}</p>
      <button type="button" className="item__quitar" onClick={() => carrito.eliminar(id)}
        aria-label={`Quitar ${nombre} del carrito`}>Quitar</button>
    </li>
  )
}
