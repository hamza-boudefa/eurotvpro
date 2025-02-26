// cart.ts

export interface Plan {
  duration: string;
  price: string;
  features: string[];
}

export function getCartItems(): Plan[] {
  if (typeof window === 'undefined') return [];
  const savedCart = localStorage.getItem('cart');
  return savedCart ? (JSON.parse(savedCart) as unknown as Plan[]) : [];
}

export function addToCart(plan: Plan): void {
  const currentCart = getCartItems();
  const newCart = [...currentCart, plan];
  localStorage.setItem('cart', JSON.stringify(newCart));
}

export function removeFromCart(duration: string): void {
  const currentCart = getCartItems();
  const newCart = currentCart.filter(item => item.duration !== duration);
  localStorage.setItem('cart', JSON.stringify(newCart));
}

export function clearCart(): void {
  localStorage.removeItem('cart');
}

export function getCartTotal(): number {
  const items = getCartItems();
  return items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('€', ''));
    return sum + price;
  }, 0);
}