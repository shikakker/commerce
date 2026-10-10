<script>
  import '../app.css';
  import Header from '$components/Header.svelte';
  import Footer from '$components/Footer.svelte';
  import ShoppingCart from '$components/ShoppingCart.svelte';
  import { getCartItems } from '../store';
  import { onMount } from 'svelte';

  let cartId;
  let checkoutUrl;
  let cartCreatedAt;
  let cartItems = [];

  onMount(async () => {
    if (typeof window !== 'undefined') {
      cartId = JSON.parse(localStorage.getItem('cartId'));
      cartCreatedAt = JSON.parse(localStorage.getItem('cartCreatedAt'));
      checkoutUrl = JSON.parse(localStorage.getItem('cartUrl'));

      let currentDate = Date.now();
      let cartIdExpired = currentDate - cartCreatedAt > 1000 * 60 * 60 * 24 * 7;
      if (cartId === 'undefined' || cartId === 'null' || cartIdExpired) {
        await callCreateCart();
      }
      await loadCart();
    }
  });

  async function callCreateCart() {
    const response = await fetch('/cart.json', { method: 'POST' });
    const payload = await response.json();

    if (!response.ok || !payload.data?.id || !payload.data?.checkoutUrl) {
      throw new Error(payload.error || 'Unable to create cart.');
    }

    cartId = payload.data.id;
    checkoutUrl = payload.data.checkoutUrl;
    cartCreatedAt = Date.now();

    localStorage.setItem('cartCreatedAt', JSON.stringify(cartCreatedAt));
    localStorage.setItem('cartId', JSON.stringify(cartId));
    localStorage.setItem('cartUrl', JSON.stringify(checkoutUrl));
  }

  async function loadCart() {
    const payload = await getCartItems();
    cartItems = payload?.data?.cart?.lines?.edges || [];
    checkoutUrl = payload?.data?.cart?.checkoutUrl || checkoutUrl;
  }

  let showCart = false;
  let loading = false;

  async function openCart() {
    await loadCart();
    showCart = true;
  }
  function hideCart() {
    showCart = false;
  }

  function getCheckoutUrl() {
    if (!checkoutUrl) {
      loading = false;
      return;
    }
    try {
      const target = new URL(checkoutUrl);
      if (target.protocol !== 'https:') throw new Error('Checkout URL must use HTTPS.');
      window.open(target.toString(), '_blank', 'noopener,noreferrer');
    } finally {
      loading = false;
    }
  }

  async function addToCart(event) {
    await fetch('/cart.json', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartId: cartId, variantId: event.detail.body, quantity: 1 })
    });
    // Wait for the API to finish before updating cart items
    await loadCart();
  }

  async function removeProduct(event) {
    await fetch('/cart.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartId,
        lineId: event.detail.body.lineId,
        quantity: event.detail.body.quantity,
        variantId: event.detail.body.variantId
      })
    });
    await loadCart();
  }
</script>

<main class={`${showCart ? 'h-screen' : 'min-h-screen'} text-white overflow-hidden`}>
  {#if showCart}
    <ShoppingCart
      items={cartItems}
      on:click={hideCart}
      on:removeProduct={removeProduct}
      on:addProduct={addToCart}
      on:getCheckoutUrl={getCheckoutUrl}
      bind:loading
    />
  {/if}
  <Header on:openCart={openCart} />
  <div class="min-h-screen overflow-scroll">
    <slot />
    <Footer />
  </div>
</main>
