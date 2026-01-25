import { create } from "zustand";
import { categoryApi } from "@/entities/category/api/categoryApi.js";

export const useCategories = create(
  (set, get) => ({
    categories: [],

    fetchCategories: async () => {
      try {
        const data = await categoryApi.getAll();
        set({ categories: data });
      } catch (error) {
        console.error("", error);
      }
    },

    addCategory: async (category) => {
      try {
        const newCategory = await categoryApi.create(category);
        set((state) => ({ categories: [...state.categories, newCategory] }));
      } catch (error) {
        console.error("Failed to create category ", error);
        alert("Failed to create category");
      }
    },

    removeCategory: async (id) => {
      const previousCategories = get().categories;

      if (previousCategories.length <= 1) {
        alert("Cannot delete last category.");
        return;
      }

      set((state) => ({
        categories: state.categories.filter((category) => category.id !== id)
      }));

      try {
        await categoryApi.remove(id);
      } catch (error) {
        console.error("Failed to remove category ", error);
        set({ categories: previousCategories });
        alert("Failed to remove category");
      }
    },

    editCategory: async (id, newCategory) => {
      try {
        await categoryApi.edit(id, newCategory);
        set((state) => ({
          categories:
            state.categories.map((category) => category.id === id
              ? { ...category, ...newCategory } : category
            )
        }));
      } catch (error) {
        console.error("Failed to edit category", error);
      }

    }
  })
);