export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toasts" role="region" aria-label="Notificaciones" aria-live="polite">
      {toasts.map(({ id, mensaje, tipo, accion }) => (
        <div key={id} className={`toast toast--${tipo}`} role={tipo === 'warning' ? 'alert' : 'status'}>
          <p className="toast__texto">{mensaje}</p>
          {accion && (
            <button
              type="button"
              className="toast__accion"
              onClick={() => {
                accion.onClick()
                onCerrar(id)
              }}
            >
              {accion.texto}
            </button>
          )}
          <button
            type="button"
            className="toast__cerrar"
            aria-label="Cerrar notificación"
            onClick={() => onCerrar(id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
