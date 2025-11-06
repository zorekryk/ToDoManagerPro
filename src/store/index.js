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
              { id: crypto.randomUUID(), ...task }]
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks:
            state.tasks.filter((task) => task.id !== id)
        }))
    }),
    { name: "tasks" }
  )
);