import React from 'react';

export const Navbar = ({ cartCount, onOpenCart }) => {
  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', backgroundColor: '#15803d', color: '#fff', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 100, boxSizing: 'border-box' }}>
      <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>TIENDA PALMIRA</h1>
      <button onClick={onOpenCart} style={{ position: 'relative', background: '#166534', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '18px' }}>🛒</span>
        <span>Carrito</span>
        {cartCount > 0 && (
          <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#ef4444', color: '#fff', fontSize: '12px', fontWeight: 'bold', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};