const ORDERS_STORAGE_KEY = 'coffeego_orders';
const INITIAL_ORDER_NUMBER = 100001;

function getSessionStorage() {
  // sessionStorage exists only on web, so guard access to keep Expo native builds safe.
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return null;
  }

  return window.sessionStorage;
}

export function loadOrdersFromStorage() {
  try {
    const storage = getSessionStorage();

    if (!storage) {
      return {
        orders: [],
        nextOrderNumber: INITIAL_ORDER_NUMBER,
      };
    }

    const storedOrders = storage.getItem(ORDERS_STORAGE_KEY);
    const parsedOrders = storedOrders ? JSON.parse(storedOrders) : {};

    return {
      orders: Array.isArray(parsedOrders.orders) ? parsedOrders.orders : [],
      nextOrderNumber: parsedOrders.nextOrderNumber || INITIAL_ORDER_NUMBER,
    };
  } catch {
    return {
      orders: [],
      nextOrderNumber: INITIAL_ORDER_NUMBER,
    };
  }
}

export function saveOrdersToStorage(ordersState) {
  try {
    const storage = getSessionStorage();

    if (!storage) {
      return;
    }

    storage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(ordersState));
  } catch {
    // Ignore storage failures so order placement still works in restricted environments.
  }
}
