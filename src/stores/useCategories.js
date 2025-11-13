import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultCategories = [
  {
    id: crypto.randomUUID(), title: "Особисте", color: "#60a5fa"
  }
];

export const useCategories = create(
  persist(
    (set, get) => ({
      categories: [],

      initDefaultCategories: () => {
        if (get().categories.length === 0) {
          set({ categories: defaultCategories });
        }
      },

      addCategory: (category) =>
        set((state) => ({
          categories:
            [...state.categories,
              {
                id: crypto.randomUUID(),
                ...category
              }
            ]
        })),

      removeCategory: (id) =>
        set((state) => ({
          categories:
            state.categories.filter((category) => category.id !== id)
        })),

      editCategory: (id, newCategory) =>
        set((state) => ({
          categories:
            state.categories.map((category) => category.id === id
              ? {
                ...category,
                ...newCategory
              }
              : category
            )
        }))
    }),
    { name: "categories" }
  )
);