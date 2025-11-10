import CategoryForm from "@/components/CategoryForm";
import Button from "@/components/shared/Button";
import { useCategories } from "@/stores/useCategories";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const EditCategoryPage = () => {
  const { id } = useParams();
  const categories = useCategories((state) => state.categories);
  const editCategory = useCategories((state) => state.editCategory);
  const navigate = useNavigate();

  const category = categories.find((category) => category.id === id);

  if (categories.length > 0 && !category) {
    return (
      <main>
        <div className="container">
          <div className="alert alert-error">
            <p>Категорію не знайдено</p>
            <Button onClick={() => navigate("/categories")}>
              <ArrowLeft />
              Повернутися до списку категрій
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const handleEdit = (data) => {
    editCategory(category.id, data);
    navigate("/categories");
  };

  return (
    <main>
      <div className="container">
        <CategoryForm
          initialData={category}
          label="Редагувати категорю"
          onSubmit={handleEdit}
          showCancel
        />
      </div>
    </main>
  );
};

export default EditCategoryPage;