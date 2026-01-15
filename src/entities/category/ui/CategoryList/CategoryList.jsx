import "./CategoryList.css";
import { useCategories, CategoryItem } from "@/entities/category";
import { useEffect } from "react";

const CategoryList = () => {
  const categories = useCategories((state) => state.categories);
  const fetchCategories = useCategories((state) => state.fetchCategories);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryList;