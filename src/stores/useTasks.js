import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTasks = create(
  persist(
    (set) => ({
      tasks: [],

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
        }))
    }),
    { name: "tasks" }
  )
);