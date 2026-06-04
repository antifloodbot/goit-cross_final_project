const API_URL = 'https://api.sampleapis.com/coffee/hot';

const DEFAULT_IMAGE_URL =
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80';

const coffeeKeywords = [
  'latte',
  'cappuccino',
  'espresso',
  'americano',
  'macchiato',
  'mocha',
  'coffee',
];

function hasCoffeeKeyword(item = {}) {
  const normalizedTitle = String(item.title || '').toLowerCase();

  return coffeeKeywords.some((keyword) => normalizedTitle.includes(keyword));
}

function getCoffeeCategory(title = '') {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('latte')) {
    return 'Latte';
  }

  if (normalizedTitle.includes('cappuccino')) {
    return 'Cappuccino';
  }

  if (normalizedTitle.includes('espresso')) {
    return 'Espresso';
  }

  return 'Coffee';
}

function normalizeCoffeeItem(item = {}, index) {
  const title = item.title || 'Untitled coffee';
  const displayPrice = item.price || (3 + index * 0.4).toFixed(2);

  // Normalize API fields into the shape used by the app, with safe fallback values.
  return {
    id: String(item.id ?? index + 1),
    title,
    price: displayPrice,
    imageUrl: item.image || item.imageUrl || DEFAULT_IMAGE_URL,
    description: item.description || 'No description available.',
    category: getCoffeeCategory(title),
  };
}

export async function fetchCoffeeMenu() {
  try {
    // Send a GET request to load the hot coffee menu from the remote API.
    const response = await fetch(API_URL);

    // Stop early with a clear error when the API returns an unsuccessful status.
    if (!response.ok) {
      throw new Error(`Coffee API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const items = Array.isArray(data) ? data : [];

    return items.filter(hasCoffeeKeyword).map(normalizeCoffeeItem);
  } catch (error) {
    // Re-throw a normalized error so the caller can handle loading failures.
    throw new Error(error.message || 'Unable to fetch coffee menu.');
  }
}
