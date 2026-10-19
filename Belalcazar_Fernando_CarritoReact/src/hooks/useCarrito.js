import { useEffect, useState } from 'react'
import { buscarProducto } from '../data/productos'
import { useToast } from '../context/ToastContext'
import { MSG_MAXIMO, mensajeMinimoCarrito } from '../utils/mensajes'

const CLAVE_STORAGE = 'tienda-palmira-carrito'

// Recupera el carrito guardado, descartando datos inválidos o que superen el stock.
function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE))
    if (!Array.isArray(guardado)) return []
    return guardado.filter((i) => {
      const p = buscarProducto(i?.id)
      return p && Number.isInteger(i.cantidad) && i.cantidad >= 1 && i.cantidad <= p.stock
    })
  } catch {
    return []
  }
}

export function useCarrito() {
  const { mostrar } = useToast()
  // items: [{ id, cantidad }]. Una sola línea por producto.
  const [items, setItems] = useState(cargarCarrito)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(items))
    } catch {
      /* sin persistencia: el carrito sigue funcionando en memoria */
    }
  }, [items])

  const cantidadDe = (id) => items.find((i) => i.id === id)?.cantidad ?? 0
  const fijarCantidad = (id, cantidad) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)))
  const avisarMaximo = () => mostrar({ mensaje: MSG_MAXIMO, tipo: 'warning' })

  const agregar = (producto, cantidad) => {
    const total = cantidadDe(producto.id) + cantidad
    const nueva = Math.min(total, producto.stock)
    setItems((prev) =>
      prev.some((i) => i.id === producto.id)
        ? prev.map((i) => (i.id === producto.id ? { ...i, cantidad: nueva } : i))
        : [...prev, { id: producto.id, cantidad: nueva }],
    )
    if (total > producto.stock) avisarMaximo()
    else mostrar({ mensaje: `${producto.nombre} agregado al carrito.`, tipo: 'success' })
  }

  const eliminar = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const pedirEliminar = (id) =>
    mostrar({
      mensaje: mensajeMinimoCarrito(buscarProducto(id).nombre),
      tipo: 'warning',
      accion: { texto: 'Sí, eliminar', onClick: () => eliminar(id) },
    })

  const sumar = (id) => {
    if (cantidadDe(id) >= buscarProducto(id).stock) avisarMaximo()
    else fijarCantidad(id, cantidadDe(id) + 1)
  }

  const restar = (id) => {
    if (cantidadDe(id) <= 1) pedirEliminar(id)
    else fijarCantidad(id, cantidadDe(id) - 1)
  }

  const lineas = items.map(({ id, cantidad }) => {
    const producto = buscarProducto(id)
    return { ...producto, cantidad, subtotal: producto.precio * cantidad }
  })
  const unidades = lineas.reduce((suma, l) => suma + l.cantidad, 0)
  const total = lineas.reduce((suma, l) => suma + l.subtotal, 0)

  return {
    lineas, unidades, total,
    cantidadDe, agregar, eliminar, sumar, restar, pedirEliminar, avisarMaximo,
    cambiarCantidad: fijarCantidad,
  }
}
