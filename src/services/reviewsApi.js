const API_URL = 'https://jsonplaceholder.typicode.com/comments';

function normalizeReview(item = {}) {
  return {
    id: String(item.id),
    name: item.name || 'Anonymous reviewer',
    email: item.email || 'No email provided',
    body: item.body || 'No review text available.',
  };
}

export async function fetchReviews() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Reviews API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const reviews = Array.isArray(data) ? data : [];

    return reviews.slice(0, 20).map(normalizeReview);
  } catch (error) {
    throw new Error(error.message || 'Unable to fetch reviews.');
  }
}
