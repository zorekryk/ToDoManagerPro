import { create } from "zustand";
import { taskApi } from "@/entities/task/api/taskApi.js";

export const useTasks = create(
  (set, get) => ({
    tasks: [],
    searchQuery: "",
    filterStatus: "all",

    fetchTasks: async () => {
      try {
        const data = await taskApi.getAll();
        set({ tasks: data });
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    },

    addTask: async (taskData) => {
      try {
        const newTask = await taskApi.create(
          { ...taskData, isCompleted: false });
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      } catch (error) {
        console.error("Failed to create task", error);
        alert("Failed to create task");
      }
    },

    removeTask: async (id) => {
      const previousTasks = get().tasks;

      set((state) => ({
        tasks:
          state.tasks.filter((task) => task.id !== id)
      }));

      try {
        await taskApi.remove(id);
      } catch (error) {
        console.error("Failed to remove task", error);
        set({ tasks: previousTasks });
        alert("Failed to remove task.");
      }
    },

    editTask: async (id, newTask) => {
      try {
        await taskApi.edit(id, newTask);
        set((state) => ({
          tasks: state.tasks.map(
            (task) => task.id === id ? { ...task, ...newTask } : task
          )
        }));
      } catch (error) {
        console.error("Failed to edit task", error);
        alert("Failed to edit task.");
      }
    },

    toggleTask: async (id) => {
      const tasks = get().tasks;
      const task = tasks.find((task) => task.id === id);

      const newStatus = !task.isCompleted;

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: newStatus } : task
        )
      }));

      try {
        await taskApi.toggleComplete(id, newStatus);
      } catch (error) {
        console.error("Failed to toggle task", error);
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !newStatus } : task
          )
        }));
        alert("Failed to toggle task");
      }
    },

    setSearchQuery: (query) => set({ searchQuery: query }),

    setFilterStatus: (status) => set({ filterStatus: status })
  })
);
