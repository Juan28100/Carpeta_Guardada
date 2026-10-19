import React from 'react';
import { NumericInput } from './NumericInput';

export const CartModal = ({ isOpen, onClose, cart, onUpdateQty, onRemove, total, totalUnits, showToast, onDownloadReceipt }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '400px', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', pb: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Tu Carrito ({totalUnits})</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#6b7280', margin: 'auto' }}>El carrito está vacío.</p>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
            <div style={{ overflowY: 'auto', flex: 1, margin: '16px 0' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                    <span>{item.nombre}</span>
                    <button onClick={() => onRemove(item.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}>Eliminar</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '14px' }}>
                    <span>${item.precio.toLocaleString('es-CO')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button onClick={() => onUpdateQty(item.id, item.cantidad - 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>-</button>
                      <NumericInput
                        value={item.cantidad}
                        onChange={(val) => onUpdateQty(item.id, val)}
                        max={item.stock}
                        onInvalidInput={showToast}
                      />
                      <button onClick={() => onUpdateQty(item.id, item.cantidad + 1)} style={{ padding: '2px 8px', cursor: 'pointer' }}>+</button>
                    </div>
                    <strong>${(item.precio * item.cantidad).toLocaleString('es-CO')}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>
                <span>Total:</span>
                <span style={{ color: '#15803d' }}>${total.toLocaleString('es-CO')} COP</span>
              </div>
              <button
                onClick={onDownloadReceipt}
                style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Descargar Registro de Venta (TXT)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};