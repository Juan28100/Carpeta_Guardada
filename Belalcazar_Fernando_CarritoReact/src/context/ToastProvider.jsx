import { useCallback, useRef, useState } from 'react'
import { ToastContext } from './ToastContext'
import ToastContainer from '../components/ToastContainer'

const MAX_VISIBLES = 4

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const temporizadores = useRef(new Map())

  const cerrar = useCallback((id) => {
    clearTimeout(temporizadores.current.get(id))
    temporizadores.current.delete(id)
    setToasts((actuales) => actuales.filter((t) => t.id !== id))
  }, [])

  // El mensaje es la clave: si se repite, se reinicia el mismo toast en vez de apilar copias.
  const mostrar = useCallback(({ mensaje, tipo = 'info', accion, duracion }) => {
    const id = mensaje
    clearTimeout(temporizadores.current.get(id))
    setToasts((actuales) =>
      [...actuales.filter((t) => t.id !== id), { id, mensaje, tipo, accion }].slice(-MAX_VISIBLES),
    )
    const tiempo = duracion ?? (accion ? 8000 : 4000)
    temporizadores.current.set(id, setTimeout(() => cerrar(id), tiempo))
  }, [cerrar])

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      <ToastContainer toasts={toasts} onCerrar={cerrar} />
    </ToastContext.Provider>
  )
}
