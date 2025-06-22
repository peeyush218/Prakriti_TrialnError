const API_BASE = "http://localhost:8000";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function getOrders(user_id) {
  const res = await fetch(`${API_BASE}/orders?user_id=${user_id}`);
  return res.json();
}

export async function placeOrder(order) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
}

export async function submitFeedback(feedback) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback),
  });
  return res.json();
}

export async function registerUser(user) {
  const res = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function loginUser(user) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function getRecommendations(query, sustainable_only = false) {
  let url = `${API_BASE}/recommend?query=${encodeURIComponent(query)}`;
  if (sustainable_only) {
    url += '&sustainable_only=true';
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch recommendations');
  return (await res.json()).recommendations;
}

export async function searchProducts(query) {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/product/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export async function getAllProducts() {
  const res = await fetch(`${API_BASE}/products/all`);
  return res.json();
} 
