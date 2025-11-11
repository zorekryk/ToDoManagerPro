import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTasks = create(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: "",
      filterStatus: "all",

      addTask: (task) =>
        set((state) => ({
          tasks:
            [...state.tasks,
              {
                id: crypto.randomUUID(),
                completed: false,
                ...task
              }
            ]
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks:
            state.tasks.filter((task) => task.id !== id)
        })),

      editTask: (id, newTask) =>
        set((state) => ({
          tasks:
            state.tasks.map((task) => task.id === id
              ? {
                ...task,
                ...newTask
              }
              : task
            )
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks:
            state.tasks.map((task) => task.id === id
              ? {
                ...task,
                completed: !task.completed
              }
              : task
            )
        })),

      setSearchQuery: (query) =>
        set({ searchQuery: query }),

      setFilterStatus: (status) =>
        set({ filterStatus: status }),

      getFilteredTasks: (state) => {
        let filtered = state.tasks;

        if (state.filterStatus === "active") {
          filtered = filtered.filter((task) => !task.completed);
        } else if (state.filterStatus === "completed") {
          filtered = filtered.filter((task) => task.completed);
        }

        if (state.searchQuery.trim()) {
          const query = state.searchQuery.toLowerCase();
          filtered = filtered.filter(
            (task) =>
              task.title.toLowerCase().includes(query) ||
              task.description?.toLowerCase().includes(query)
          );
        }

        return filtered;
      }

    }),
    { name: "tasks" }
  )
);

export const useFilteredTasks = () => {
  const tasks = useTasks((state) => state.tasks);
  const searchQuery = useTasks((state) => state.searchQuery);
  const filterStatus = useTasks((state) => state.filterStatus);
  const getFilteredTasks = useTasks((state) => state.getFilteredTasks);

  return getFilteredTasks({ tasks, searchQuery, filterStatus });
};