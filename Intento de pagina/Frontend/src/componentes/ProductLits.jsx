import React from 'react';
import { ProductCard } from './productCard';

export const ProductList = ({ products, cart, onAddToCart, showToast }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
      {products.map((product) => {
        const inCart = cart.find((i) => i.id === product.id)?.cantidad || 0;
        return (
          <ProductCard
            key={product.id}
            product={product}
            currentInCart={inCart}
            onAddToCart={onAddToCart}
            showToast={showToast}
          />
        );
      })}
    </div>
  );
};