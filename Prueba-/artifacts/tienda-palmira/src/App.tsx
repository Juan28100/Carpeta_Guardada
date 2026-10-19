import { useState } from "react";
import { ArrowRight, Leaf, ShoppingCart } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ToastProvider, useToast } from "@/components/ToastProvider";
import { useCart } from "@/hooks/useCart";

function Storefront() {
  const cart = useCart();
  const { showToast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => setCartOpen(true);
  return (
    <div className="shop-shell" id="inicio">
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="#inicio" data-testid="link-store-home">
          <span className="brand-mark"><Leaf /></span>
          <span>TIENDA PALMIRA<small>DESPENSA DE BARRIO</small></span>
        </a>
        <button className="cart-trigger" aria-label={`Abrir carrito, ${cart.units} unidades`} data-testid="button-open-cart" onClick={openCart}>
          <ShoppingCart />
          <span>Mi canasta</span>
          {cart.units > 0 && <span className="cart-badge text-center font-thin" aria-label={`${cart.units} unidades`} data-testid="cart-unit-badge">{cart.units}</span>}
        </button>
      </nav>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <span className="eyebrow">De nuestra tierra para tu mesa</span>
            <h1 id="hero-title">Lo cotidiano sabe <em>mejor</em> cuando es de aquí.</h1>
            <p>Un rinconcito de Palmira con los sabores que siempre vuelven a casa. Elige con calma; nosotros cuidamos cada detalle.</p>
            <a href="#despensa" className="hero-note" data-testid="link-see-catalog">
              <ArrowRight /> Hecho en Colombia, elegido para ti
            </a>
          </div>
          <div className="hero-stamp" aria-hidden="true"><span>PALMIRA<br />VALLE DEL CAUCA</span></div>
        </section>
        <ProductCatalog
          remaining={cart.remaining}
          add={cart.add}
          onMax={() => showToast("Este es el máximo de producto disponible en stock")}
        />
      </main>
      <footer className="footer">
        <strong>TIENDA PALMIRA</strong>
        <span>Un mercado de barrio, con sabor a nuestra tierra.</span>
        <span>Valle del Cauca · Colombia</span>
      </footer>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={cart.lines}
        units={cart.units}
        total={cart.total}
        setQuantity={cart.setQuantity}
        increment={cart.increment}
        decrement={cart.decrement}
        remove={cart.remove}
        askRemove={cart.askRemove}
        onMax={() => showToast("Este es el máximo de producto disponible en stock")}
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <Storefront />
    </ToastProvider>
  );
}

export default App;
