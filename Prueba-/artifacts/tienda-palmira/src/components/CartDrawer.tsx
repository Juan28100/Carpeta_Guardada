import { useEffect, type CSSProperties } from "react";
import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";
import { artPalettes, formatCOP } from "@/data/products";
import type { CartLine } from "@/hooks/useCart";
import { NumericInput } from "@/components/NumericInput";

type Props = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  units: number;
  total: number;
  setQuantity: (product: CartLine["product"], quantity: number) => void;
  increment: (product: CartLine["product"]) => void;
  decrement: (product: CartLine["product"]) => void;
  remove: (id: number) => void;
  askRemove: (product: CartLine["product"]) => void;
  onMax: () => void;
};

export function CartDrawer({ open, onClose, lines, units, total, setQuantity, increment, decrement, remove, askRemove, onMax }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <>
      <button className="drawer-backdrop" aria-label="Cerrar carrito" data-testid="button-close-cart-backdrop" onClick={onClose} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" data-testid="cart-drawer">
        <header className="drawer-head">
          <div><h2 id="cart-title">Tu canasta</h2><p data-testid="text-cart-units">{units} {units === 1 ? "producto" : "productos"} en tu pedido</p></div>
          <button className="icon-button" aria-label="Cerrar carrito" data-testid="button-close-cart" onClick={onClose}><X /></button>
        </header>
        {lines.length ? (
          <>
            <div className="cart-lines">
              {lines.map((line) => {
                const palette = artPalettes[line.product.id - 1];
                return (
                  <article className="cart-line" key={line.product.id} data-testid={`cart-line-${line.product.id}`}>
                    <div className="mini-art" style={{ "--art-bg": palette.background, "--pack": palette.pack } as CSSProperties} aria-hidden="true"><span>{palette.label.slice(0, 1)}</span></div>
                    <div className="line-info">
                      <h3 data-testid={`text-cart-product-${line.product.id}`}>{line.product.nombre}</h3>
                      <p>{formatCOP(line.product.precio)} c/u</p>
                      <div className="line-controls">
                        <button className="step-button" aria-label={`Disminuir ${line.product.nombre}`} data-testid={`button-decrement-${line.product.id}`} onClick={() => decrement(line.product)}><Minus /></button>
                        <NumericInput
                          value={line.quantity}
                          max={line.product.stock}
                          onChange={(quantity) => setQuantity(line.product, quantity)}
                          onMax={onMax}
                          onZero={() => askRemove(line.product)}
                          label={`Cantidad en la canasta: ${line.product.nombre}`}
                          testId={`input-cart-quantity-${line.product.id}`}
                          className="cart-quantity"
                        />
                        <button className="step-button" aria-label={`Aumentar ${line.product.nombre}`} data-testid={`button-increment-${line.product.id}`} onClick={() => increment(line.product)}><Plus /></button>
                      </div>
                    </div>
                    <div>
                      <button className="remove-button" aria-label={`Eliminar ${line.product.nombre}`} title="Eliminar producto" data-testid={`button-remove-${line.product.id}`} onClick={() => remove(line.product.id)}><Trash2 /></button>
                      <span className="line-total" data-testid={`text-subtotal-${line.product.id}`}>{formatCOP(line.product.precio * line.quantity)}</span>
                    </div>
                  </article>
                );
              })}
            </div>
            <footer className="drawer-foot">
              <div className="summary-row"><span>Unidades</span><strong data-testid="text-summary-units">{units}</strong></div>
              <div className="summary-row"><span>Subtotal</span><strong>{formatCOP(total)}</strong></div>
              <div className="grand-total"><span>Total</span><strong data-testid="text-cart-total">{formatCOP(total)}</strong></div>
              <small>El valor corresponde a los productos de tu canasta.</small>
            </footer>
          </>
        ) : (
          <div className="cart-empty" data-testid="empty-cart">
            <div className="empty-basket"><ShoppingBasket /></div>
            <h3>Tu canasta está vacía</h3>
            <p>Agrega tus favoritos de la despensa y aquí aparecerá tu pedido.</p>
            <button className="add-button" onClick={onClose} data-testid="button-return-to-catalog">Volver a la despensa</button>
          </div>
        )}
      </aside>
    </>
  );
}
