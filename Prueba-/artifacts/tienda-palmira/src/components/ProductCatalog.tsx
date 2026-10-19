import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Plus, ShoppingBag } from "lucide-react";
import { artPalettes, formatCOP, products, type Product } from "@/data/products";
import { NumericInput } from "@/components/NumericInput";

type Props = { remaining: (product: Product) => number; add: (product: Product, quantity: number) => void; onMax: () => void };

export function ProductCatalog({ remaining, add, onMax }: Props) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  return (
    <section className="main-content" id="despensa" aria-labelledby="catalog-title">
      <div className="section-top">
        <div>
          <p className="section-kicker">Lo bueno de aquí, a tu mesa</p>
          <h2 id="catalog-title">La despensa Palmira</h2>
        </div>
        <p className="section-note">Productos de todos los días, con sabor a casa.</p>
      </div>
      <div className="catalog-grid" data-testid="catalog-products">
        {products.map((product, index) => {
          const stockLeft = remaining(product);
          const art = artPalettes[index];
          const selected = quantities[product.id] ?? 1;
          const setSelected = (amount: number) => setQuantities((current) => ({ ...current, [product.id]: amount }));
          return (
            <article className="product-card" key={product.id} data-testid={`card-product-${product.id}`}>
              <div className="product-art" style={{ "--art-bg": art.background, "--pack": art.pack } as CSSProperties} aria-hidden="true">
                <div className="package"><span>{art.label}</span><b>{index === 0 ? "H" : index === 2 ? "6" : index === 4 ? "V" : "P"}</b></div>
              </div>
              <div className="product-content">
                <div className={`stock-line ${stockLeft === 0 ? "stock-out" : stockLeft <= 2 ? "stock-low" : ""}`}>
                  <span><i className="stock-dot" />{stockLeft > 0 ? `${stockLeft} disponibles` : "Agotado por ahora"}</span>
                  <span>Ref. {String(product.id).padStart(2, "0")}</span>
                </div>
                <h3 data-testid={`text-product-name-${product.id}`} className="font-thin">{product.nombre}</h3>
                <div className="product-price" data-testid={`text-product-price-${product.id}`}>{formatCOP(product.precio)}</div>
                <div className="product-controls">
                  {stockLeft > 0 ? (
                    <>
                      <div className="quantity-field">
                        <label htmlFor={`product-quantity-${product.id}`}>Cantidad</label>
                        <NumericInput
                          value={Math.min(selected, stockLeft)}
                          max={stockLeft}
                          onChange={setSelected}
                          onMax={onMax}
                          label={`Cantidad de ${product.nombre}`}
                          testId={`input-product-quantity-${product.id}`}
                        />
                      </div>
                      <button
                        className="add-button"
                        data-testid={`button-add-product-${product.id}`}
                        onClick={() => add(product, selected)}
                        disabled={stockLeft <= 0}
                      >
                        <Plus /> Agregar
                      </button>
                    </>
                  ) : (
                    <span className="empty-stock">Sin unidades disponibles</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="promise-band" aria-label="Nuestro compromiso">
        <div className="promise-item"><ShoppingBag /><span>Compra sencilla, sin sorpresas</span></div>
        <div className="promise-item"><ArrowUpRight /><span>Stock actualizado al instante</span></div>
        <div className="promise-item"><span className="stock-dot" /><span>Lo que ves, sí está disponible</span></div>
      </div>
    </section>
  );
}
