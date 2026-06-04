const CART_STORAGE_KEY = 'coffeego_cart';

function getSessionStorage() {
  // sessionStorage is web-only, so guard access to keep Expo native builds safe.
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

export function loadCartFromStorage() {
  try {
    const storage = getSessionStorage();

    if (!storage) {
      return [];
    }

    const storedCart = storage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];

    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cartItems) {
  try {
    const storage = getSessionStorage();

    if (!storage) {
      return;
    }

    storage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // Ignore storage failures so cart updates still work in restricted environments.
  }
}
