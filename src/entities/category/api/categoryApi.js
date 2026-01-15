import { apiClient } from "@/shared/api/index.js";

const BASE_ROUTE = "/categories";

export const categoryApi = {
  getAll: () => {
    return apiClient(BASE_ROUTE);
  },
  getById: (id) => {
    return apiClient(`${BASE_ROUTE}/${id}`);
  },
  create: (category) => {
    return apiClient(BASE_ROUTE, { method: "POST", body: category });
  },
  edit: (id, category) => {
    return apiClient(`${BASE_ROUTE}/${id}`,
      { method: "PATCH", body: category });
  },
  remove: (id) => {
    return apiClient(`${BASE_ROUTE}/${id}`, { method: "DELETE" });
  }
};