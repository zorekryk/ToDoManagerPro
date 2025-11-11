import "./TaskItem.css";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { useCategories } from "@/stores/useCategories";
import { useTasks } from "@/stores/useTasks";
import { Calendar, SquarePen, Tag, Trash2 } from "lucide-react";
import { useId } from "react";
import { useNavigate } from "react-router";

const TaskItem = (props) => {
  const { id, completed, title, description, categoryId, deadline } = props;
  const fieldId = useId();

  const navigate = useNavigate();
  const toggleTask = useTasks((state) => state.toggleTask);
  const removeTask = useTasks((state) => state.removeTask);

  const categories = useCategories((state) => state.categories);
  const categoryObject = categories.find((category) => category.id === categoryId);

  return (
    <div className="task card">
      <div className="task-content">
        <input
          className="checkbox"
          id={fieldId}
          type="checkbox"
          onChange={() => toggleTask(id)}
          checked={completed}
        />
        <div className="task-info">
          <label htmlFor={fieldId}>{title}</label>
          {description && (
            <p>{description}</p>
          )}
          <div className="task-other">
            <Badge classname="ghost">
              <Tag size="18" />
              {categoryObject.title}
            </Badge>
            <Badge classname="ghost">
              <Calendar size="18" />
              {deadline}
            </Badge>
          </div>
        </div>
      </div>
      <div className="task-actions">
        <Button classname="ghost" onClick={() => navigate(`edit/${id}`)}>
          <SquarePen />
        </Button>
        <Button classname="ghost" onClick={() => removeTask(id)}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default TaskItem;