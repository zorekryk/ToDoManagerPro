import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";
import { useCategories } from "@/stores/useCategories";

const INITIAL_CATEGORY_DATA = {
  title: "",
  color: "#6c84ff"
};

const CategoriesPage = () => {
  const addCategory = useCategories((state) => state.addCategory);

  const handleAdd = (data) => {
    addCategory(data);
  }

  return (
    <main>
      <div className="container">
        <CategoryForm initialData={INITIAL_CATEGORY_DATA} onSubmit={handleAdd} />
        <CategoryList />
      </div>
    </main>
  );
};

export default CategoriesPage;