import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Check, X } from "lucide-react";

type ToastItem = { id: number; message: string; action?: { label: string; run: () => void } };
type ToastContextValue = { showToast: (message: string, action?: ToastItem["action"]) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const removeToast = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);
  const showToast = useCallback((message: string, action?: ToastItem["action"]) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((current) => [...current, { id, message, action }]);
    timers.current.set(id, setTimeout(() => removeToast(id), action ? 7000 : 3800));
  }, [removeToast]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="false" data-testid="toast-region">
        {toasts.map((toast) => (
          <div className="toast-card" key={toast.id} role="status" data-testid={`toast-message-${toast.id}`}>
            <span className="toast-indicator" aria-hidden="true" />
            <div className="toast-copy">
              <strong>{toast.action ? "Antes de continuar" : "Aviso de tienda"}</strong>
              {toast.message}
              {toast.action && (
                <div className="toast-actions">
                  <button
                    className="confirm-remove"
                    data-testid={`button-confirm-${toast.id}`}
                    onClick={() => { toast.action?.run(); removeToast(toast.id); }}
                  >
                    <Check size={13} /> {toast.action.label}
                  </button>
                  <button className="dismiss-text" onClick={() => removeToast(toast.id)}>Conservar</button>
                </div>
              )}
            </div>
            <button className="toast-close" aria-label="Cerrar aviso" data-testid={`button-close-toast-${toast.id}`} onClick={() => removeToast(toast.id)}>
              <X />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast debe usarse dentro de ToastProvider");
  return value;
}
