// utils/cart.ts

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_KEY = "carcare_cart";

/**
 * Get all cart items from localStorage
 */
export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return []; // SSR safety
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Save cart items back to localStorage
 */
function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated")); // ✅ notify header & others
}

/**
 * Add an item to the cart
 */
export function addToCart(item: Omit<CartItem, "quantity">, quantity: number = 1) {
  const items = getCartItems();
  const existing = items.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ ...item, quantity });
  }

  saveCart(items);
}

/**
 * Remove an item completely from the cart
 */
export function removeFromCart(id: number) {
  const items = getCartItems().filter((i) => i.id !== id);
  saveCart(items);
}

/**
 * Update quantity of a cart item
 */
export function updateCartQuantity(id: number, quantity: number) {
  if (quantity <= 0) return removeFromCart(id);

  const items = getCartItems().map((i) =>
    i.id === id ? { ...i, quantity } : i
  );

  saveCart(items);
}

/**
 * Clear entire cart
 */
export function clearCart() {
  saveCart([]);
}
