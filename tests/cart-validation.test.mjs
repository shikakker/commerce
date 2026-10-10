import test from 'node:test';
import assert from 'node:assert/strict';
import { validateCartMutation } from '../src/utils/cart-validation.js';

test('rejects fractional, zero and excessive cart quantities', () => {
  for (const quantity of [0, -1, 1.5, 101]) {
    assert.throws(() => validateCartMutation({ cartId: 'gid://cart/1', variantId: 'gid://variant/1', quantity }, 'add'));
  }
});

test('requires cart and variant identifiers for add operations', () => {
  assert.throws(() => validateCartMutation({ cartId: '', variantId: '', quantity: 1 }, 'add'));
  assert.deepEqual(
    validateCartMutation({ cartId: 'gid://cart/1', variantId: 'gid://variant/1', quantity: 2 }, 'add'),
    { cartId: 'gid://cart/1', variantId: 'gid://variant/1', quantity: 2 }
  );
});

test('update operations allow zero quantity to remove an existing line', () => {
  assert.deepEqual(
    validateCartMutation(
      { cartId: 'gid://cart/1', lineId: 'gid://line/1', variantId: 'gid://variant/1', quantity: 0 },
      'update'
    ),
    { cartId: 'gid://cart/1', lineId: 'gid://line/1', variantId: 'gid://variant/1', quantity: 0 }
  );
});
