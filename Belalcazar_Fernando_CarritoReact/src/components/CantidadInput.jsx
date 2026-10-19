import { useState } from 'react'

const TECLAS_BLOQUEADAS = new Set(['e', 'E', '+', '-', '.', ','])
const SOLO_DIGITOS = /^\d+$/

/**
 * Campo de cantidad: solo enteros positivos, sin e/E, signos, punto ni coma.
 * Avisa al padre cuando se intenta bajar de 1 (onMinimo) o superar el stock (onMaximo).
 */
export default function CantidadInput({ id, etiqueta, value, max, onChange, onMinimo, onMaximo }) {
  // Permite borrar el campo mientras se escribe; al salir vuelve al último valor válido.
  const [borrador, setBorrador] = useState(null)

  const manejarCambio = (e) => {
    const texto = e.target.value
    if (texto === '') return setBorrador('')
    if (!SOLO_DIGITOS.test(texto)) return
    const n = parseInt(texto, 10)
    setBorrador(null)
    if (n < 1) return onMinimo()
    if (n > max) {
      onChange(max)
      return onMaximo()
    }
    onChange(n)
  }

  return (
    <input
      id={id}
      className="cantidad"
      type="number"
      inputMode="numeric"
      aria-label={etiqueta}
      min={1}
      max={max}
      step={1}
      value={borrador ?? value}
      onChange={manejarCambio}
      onKeyDown={(e) => TECLAS_BLOQUEADAS.has(e.key) && e.preventDefault()}
      onPaste={(e) => !SOLO_DIGITOS.test(e.clipboardData.getData('text')) && e.preventDefault()}
      onWheel={(e) => e.currentTarget.blur()}
      onBlur={() => setBorrador(null)}
    />
  )
}
