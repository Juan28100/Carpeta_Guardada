import React from 'react';

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '320px', width: '100%' }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: '12px 16px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '14px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            backgroundColor: toast.type === 'confirm' ? '#d97706' : '#1e293b',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{toast.message}</span>
            <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
          </div>

          {toast.type === 'confirm' && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button
                onClick={() => {
                  toast.onConfirm();
                  removeToast(toast.id);
                }}
                style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => removeToast(toast.id)}
                style={{ backgroundColor: '#6b7280', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};