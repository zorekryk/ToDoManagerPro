import "./CategoryList.css";
import CategoryItem from "@/components/CategoryItem";
import { useCategories } from "@/stores/useCategories";

const CategoryList = () => {
  const categories = useCategories((state) => state.categories);
  return (
    <div className="category-list">
      {categories.map((category) => (
        <CategoryItem key={category.id} {...category} />
      ))}
    </div>
  );
};

export default CategoryList;