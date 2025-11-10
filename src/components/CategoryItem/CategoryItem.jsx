import "./CategoryItem.css";
import Button from "@/components/shared/Button";
import { useCategories } from "@/stores/useCategories";
import { SquarePen, Trash2 } from "lucide-react";

const CategoryItem = (props) => {
  const {
    id,
    title,
    color
  } = props;

  const handleDelete = useCategories((state) => state.removeCategory);


  return (
    <div className="category-item card">
      <header className="category-header">
        <div className="category-name">
          <span style={{ backgroundColor: color }}> </span>
          <h2>{title}</h2>
        </div>
        <div className="category-actions">
          <Button classname="ghost">
            <SquarePen />
          </Button>
          <Button classname="ghost" onClick={() => handleDelete(id)}>
            <Trash2 />
          </Button>
        </div>
      </header>
    </div>
  );
};

export default CategoryItem;