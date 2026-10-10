import { createCart, addToCart, updateCart } from '../utils/shopify.js';
import { validateCartMutation } from '../utils/cart-validation.js';

const json = (status, body) => ({ status, body });

export async function post() {
  try {
    const response = await createCart();
    const cart = response.body?.data?.cartCreate?.cart;
    const userErrors = response.body?.data?.cartCreate?.userErrors || [];

    if (!cart || userErrors.length > 0) {
      return json(502, { error: userErrors[0]?.message || 'Shopify did not create a cart.' });
    }

    return json(201, { data: cart });
  } catch (error) {
    console.error('Cart creation failed:', error);
    return json(502, { error: error instanceof Error ? error.message : 'Cart creation failed.' });
  }
}

export async function put({ request }) {
  try {
    const input = validateCartMutation(await request.json(), 'update');
    const response = await updateCart(input);
    const userErrors = response.body?.data?.cartLinesUpdate?.userErrors || [];

    if (userErrors.length > 0) {
      return json(400, { error: userErrors[0].message });
    }

    return json(200, { data: response.body?.data ?? null });
  } catch (error) {
    const status = error instanceof TypeError || error instanceof RangeError ? 400 : 502;
    return json(status, { error: error instanceof Error ? error.message : 'Cart update failed.' });
  }
}

export async function patch({ request }) {
  try {
    const input = validateCartMutation(await request.json(), 'add');
    const response = await addToCart(input);
    const userErrors = response.body?.data?.cartLinesAdd?.userErrors || [];

    if (userErrors.length > 0) {
      return json(400, { error: userErrors[0].message });
    }

    return json(200, { data: response.body?.data ?? null });
  } catch (error) {
    const status = error instanceof TypeError || error instanceof RangeError ? 400 : 502;
    return json(status, { error: error instanceof Error ? error.message : 'Cart update failed.' });
  }
}
