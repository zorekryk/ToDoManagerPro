import { create } from "zustand/react";

export const useTasks = create((set) => ({
  tasks: [
    // {
    //   id: 1,
    //   title: "Task 1",
    //   description: "Task 1 description",
    //   category: "Life",
    //   deadline: "10.11.2025"
    // },
    // {
    //   id: 2,
    //   title: "Task 2",
    //   description: "Task 2 description",
    //   category: "Work",
    //   deadline: "10.11.2025"
    // },
    // {
    //   id: 3,
    //   title: "Task 3",
    //   category: "Life",
    //   deadline: "11.11.2025"
    // }
  ],
  addTask: (task) => set((state) => ({
    tasks:
      [...state.tasks,
        { id: crypto.randomUUID(), ...task }]
  })),
  removeTask: () => set()
}));