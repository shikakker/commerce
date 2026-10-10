const MAX_CART_QUANTITY = 100;

function requireId(value, field) {
  if (typeof value !== 'string' || value.trim().length === 0 || value.length > 512) {
    throw new TypeError(`${field} is required.`);
  }
  return value.trim();
}

export function validateCartId(value) {
  return requireId(value, 'cartId');
}

export function validateCartMutation(input, mode) {
  if (!input || typeof input !== 'object') throw new TypeError('Cart payload is required.');

  const cartId = validateCartId(input.cartId);
  const quantity = mode === 'add' && input.quantity == null ? 1 : Number(input.quantity);

  const minimumQuantity = mode === 'update' ? 0 : 1;
  if (!Number.isSafeInteger(quantity) || quantity < minimumQuantity || quantity > MAX_CART_QUANTITY) {
    throw new RangeError(
      `quantity must be an integer between ${minimumQuantity} and ${MAX_CART_QUANTITY}.`
    );
  }

  if (mode === 'add') {
    return { cartId, variantId: requireId(input.variantId, 'variantId'), quantity };
  }

  if (mode === 'update') {
    return {
      cartId,
      lineId: requireId(input.lineId, 'lineId'),
      variantId: requireId(input.variantId, 'variantId'),
      quantity
    };
  }

  throw new TypeError('Unsupported cart mutation mode.');
}
