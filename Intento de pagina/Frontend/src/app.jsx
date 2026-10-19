import React, { useState } from 'react';
import { PRODUCTOS } from './data/products';
import { Navbar } from './componentes/Navbar';
import { Hero } from './componentes/hero';
import { ProductList } from './componentes/ProductList';
import { CartModal } from './componentes/CartModal';
import { ToastContainer } from './componentes/toast';

export function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', extraProps = {}) => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, ...extraProps };
    setToasts((prev) => [...prev, newToast]);

    if (type !== 'confirm') {
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    }
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        const newTotalQty = existing.cantidad + quantity;
        if (newTotalQty > product.stock) {
          showToast("Este es el máximo de producto disponible en stock");
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, cantidad: product.stock } : item
          );
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: newTotalQty } : item
        );
      }
      return [...prevCart, { ...product, cantidad: quantity }];
    });
  };

  const handleUpdateQuantity = (productId, newQty) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return;

    if (newQty < 1) {
      showToast(
        `Esta es la cantidad mínima. ¿Desea eliminar ${item.nombre} del carrito?`,
        'confirm',
        { onConfirm: () => handleRemoveFromCart(productId) }
      );
      return;
    }

    if (newQty > item.stock) {
      showToast("Este es el máximo de producto disponible en stock");
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, cantidad: item.stock } : i))
      );
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, cantidad: newQty } : i))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.id === productId));
  };

  const totalUnits = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleDownloadReceipt = () => {
    if (cart.length === 0) return;
    let receiptContent = `=== REGISTRO DE COMPRA - TIENDA PALMIRA ===\n`;
    receiptContent += `Fecha: ${new Date().toLocaleString('es-CO')}\n\n`;
    receiptContent += `PRODUCTOS:\n`;
    cart.forEach((item) => {
      receiptContent += `- ${item.nombre} x${item.cantidad} : $${(item.precio * item.cantidad).toLocaleString('es-CO')} COP\n`;
    });
    receiptContent += `\nTOTAL UNIDADES: ${totalUnits}`;
    receiptContent += `\nTOTAL A PAGAR: $${totalPrice.toLocaleString('es-CO')} COP\n`;
    receiptContent += `===========================================\n`;

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Recibo_Venta_Palmira_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
      <Navbar cartCount={totalUnits} onOpenCart={() => setIsCartOpen(true)} />
      <Hero />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ fontSize: '22px', color: '#1f2937' }}>Catálogo de Productos</h2>
        <ProductList
          products={PRODUCTOS}
          cart={cart}
          onAddToCart={handleAddToCart}
          showToast={showToast}
        />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        total={totalPrice}
        totalUnits={totalUnits}
        showToast={showToast}
        onDownloadReceipt={handleDownloadReceipt}
      />

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
export default App;