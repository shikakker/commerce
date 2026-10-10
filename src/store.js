import { writable } from 'svelte/store';

export const cartQuantity = writable(0);
export const cart = writable([]);
export const search = writable('');

export const getCartItems = async () => {
  if (typeof window === 'undefined') return null;

  let cartId = null;
  try {
    cartId = JSON.parse(localStorage.getItem('cartId'));
  } catch {
    localStorage.removeItem('cartId');
  }

  if (typeof cartId !== 'string' || !cartId) {
    cartQuantity.set(0);
    return null;
  }

  const response = await fetch(`/cart.json?cartId=${encodeURIComponent(cartId)}`);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    cartQuantity.set(0);
    throw new Error(payload.error || 'Unable to load cart.');
  }

  const edges = payload.data?.cart?.lines?.edges || [];
  const quantity = edges.reduce((sum, entry) => sum + Number(entry?.node?.quantity || 0), 0);
  cartQuantity.set(quantity);
  cart.set(edges);
  return payload;
};
