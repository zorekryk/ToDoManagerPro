import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCategories = create(
  persist(
    (set) => ({
      categories: [],

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