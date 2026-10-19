import { useMemo, useState } from "react";
import { products, type Product } from "@/data/products";
import { useToast } from "@/components/ToastProvider";

export type CartLine = { product: Product; quantity: number };
const MAX_STOCK_MESSAGE = "Este es el máximo de producto disponible en stock";
const MIN_STOCK_MESSAGE = "Esta es la cantidad mínima. ¿Desea eliminar el producto?";

export function useCart() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const { showToast } = useToast();
  const lines = useMemo(() => products.flatMap((product) => {
    const quantity = quantities[product.id] ?? 0;
    return quantity > 0 ? [{ product, quantity }] : [];
  }), [quantities]);
  const units = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.quantity * line.product.precio, 0), [lines]);
  const remaining = (product: Product) => product.stock - (quantities[product.id] ?? 0);
  const remove = (productId: number) => setQuantities((current) => {
    const next = { ...current };
    delete next[productId];
    return next;
  });
  const askRemove = (product: Product) => showToast(MIN_STOCK_MESSAGE, {
    label: "Sí, eliminar",
    run: () => remove(product.id),
  });
  const setQuantity = (product: Product, requested: number) => {
    if (requested <= 0) {
      askRemove(product);
      return;
    }
    const next = Math.min(Math.floor(requested), product.stock);
    if (requested > product.stock) showToast(MAX_STOCK_MESSAGE);
    setQuantities((current) => ({ ...current, [product.id]: next }));
  };
  const add = (product: Product, requested: number) => {
    const current = quantities[product.id] ?? 0;
    const available = product.stock - current;
    if (available <= 0) {
      showToast(MAX_STOCK_MESSAGE);
      return;
    }
    const wanted = Math.max(1, Math.floor(requested));
    const quantity = Math.min(wanted, available);
    if (wanted > available) showToast(MAX_STOCK_MESSAGE);
    setQuantities((state) => ({ ...state, [product.id]: (state[product.id] ?? 0) + quantity }));
  };
  const increment = (product: Product) => {
    const current = quantities[product.id] ?? 0;
    if (current >= product.stock) {
      showToast(MAX_STOCK_MESSAGE);
      return;
    }
    setQuantity(product, current + 1);
  };
  const decrement = (product: Product) => {
    const current = quantities[product.id] ?? 0;
    if (current <= 1) {
      askRemove(product);
      return;
    }
    setQuantity(product, current - 1);
  };
  return { lines, units, total, remaining, add, remove, setQuantity, increment, decrement, askRemove };
}
