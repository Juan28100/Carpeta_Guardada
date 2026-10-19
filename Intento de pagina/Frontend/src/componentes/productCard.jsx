import React, { useState } from 'react';
import { NumericInput } from './NumericInput';

export const ProductCard = ({ product, onAddToCart, showToast, currentInCart }) => {
  const [qty, setQty] = useState(1);
  const remainingStock = product.stock - currentInCart;

  const handleAdd = () => {
    if (qty > remainingStock) {
      showToast("Este es el máximo de producto disponible en stock");
      return;
    }
    onAddToCart(product, Number(qty));
    setQty(1);
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#1f2937' }}>{product.nombre}</h3>
        <p style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 'bold', color: '#15803d' }}>
          ${product.precio.toLocaleString('es-CO')} COP
        </p>
        <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#6b7280' }}>
          Stock disponible: <strong>{remainingStock}</strong>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <NumericInput
          value={qty}
          onChange={setQty}
          max={remainingStock > 0 ? remainingStock : 1}
          onInvalidInput={showToast}
        />
        <button
          onClick={handleAdd}
          disabled={remainingStock <= 0}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            fontWeight: 'bold',
            cursor: remainingStock <= 0 ? 'not-allowed' : 'pointer',
            backgroundColor: remainingStock <= 0 ? '#d1d5db' : '#16a34a',
            color: remainingStock <= 0 ? '#6b7280' : '#fff'
          }}
        >
          {remainingStock <= 0 ? 'Sin Stock' : 'Agregar'}
        </button>
      </div>
    </div>
  );
};