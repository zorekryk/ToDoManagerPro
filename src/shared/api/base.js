const API_URL = "http://localhost:3001";

const HEADERS = {
  "Content-Type": "application/json"
};

export const apiClient = async (endpoint, options = {}) => {
  const { method = "GET", body } = options;

  const config = {
    method,
    headers: HEADERS
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  if (response.status === 204) return {};

  return response.json();
};