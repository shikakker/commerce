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

test('add operations default a missing quantity to one', () => {
  assert.deepEqual(
    validateCartMutation({ cartId: 'gid://cart/1', variantId: 'gid://variant/1' }, 'add'),
    { cartId: 'gid://cart/1', variantId: 'gid://variant/1', quantity: 1 }
  );
});

test('cart reads require a bounded non-empty cart id', async () => {
  const { validateCartId } = await import('../src/utils/cart-validation.js');
  assert.throws(() => validateCartId(''));
  assert.throws(() => validateCartId('x'.repeat(513)));
  assert.equal(validateCartId('  gid://cart/1  '), 'gid://cart/1');
});
