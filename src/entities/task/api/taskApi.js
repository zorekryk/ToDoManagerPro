import { apiClient } from "@/shared/api/index.js";

const BASE_ROUTE = "/tasks";

export const taskApi = {
  getAll: () => {
    return apiClient(BASE_ROUTE);
  },

  getById: (id) => {
    return apiClient(`${BASE_ROUTE}/${id}`);
  },

  create: (task) => {
    return apiClient(BASE_ROUTE, { method: "POST", body: task });
  },

  toggleComplete: (id, isCompleted) => {
    return apiClient(`${BASE_ROUTE}/${id}`, {
      method: "PATCH",
      body: { isCompleted }
    });
  },

  edit: (id, task) => {
    return apiClient(`${BASE_ROUTE}/${id}`,
      { method: "PATCH", body: task });
  },

  remove: (id) => {
    return apiClient(`${BASE_ROUTE}/${id}`, {
      method: "DELETE"
    });
  },

  removeAll: async (tasks) => {
    const deletePromises = tasks.map((task) =>
      apiClient(`${BASE_ROUTE}/${task.id}`, { method: "DELETE" })
    );
    await Promise.all(deletePromises);
    return {};
  }
};