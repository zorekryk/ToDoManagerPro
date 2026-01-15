import "./TaskItem.css";
import Badge from "@/shared/ui/Badge";
import Button from "@/shared/ui/Button";
import { useCategories } from "@/entities/category";
import { useTasks } from "@/entities/task";
import { getTaskStatus } from "@/entities/task/lib/getTaskStatus.js";
import { Calendar, SquarePen, Tag, Trash2 } from "lucide-react";
import { useId } from "react";
import { useNavigate } from "react-router";

const TaskItem = (props) => {
  const { id, isCompleted, title, description, categoryId, deadline } = props;
  const fieldId = useId();

  const navigate = useNavigate();
  const toggleTask = useTasks((state) => state.toggleTask);
  const removeTask = useTasks((state) => state.removeTask);

  const categories = useCategories((state) => state.categories);
  const categoryObject = categories.find((category) => category.id === categoryId);
  const status = getTaskStatus(deadline, isCompleted);

  return (
    <div className={`task card ${status} ${isCompleted ? "completed" : ""}`}>
      <div className="task-content">
        <input
          className="checkbox"
          id={fieldId}
          type="checkbox"
          onChange={() => toggleTask(id)}
          checked={isCompleted}
        />
        <div className="task-info">
          <label htmlFor={fieldId} className="task-title">{title}</label>
          {description && (
            <p>{description}</p>
          )}
          <div className="task-other">
            <div className="task-badges">
              <Badge classname="ghost">
                <Tag size="18" />
                {categoryObject.title}
              </Badge>
              <Badge classname="ghost">
                <Calendar size="18" />
                {deadline}
              </Badge>
            </div>

            <div className="task-actions-mobile">
              <Button classname="ghost" onClick={() => navigate(`edit/${id}`)}>
                <SquarePen />
              </Button>
              <Button classname="ghost" onClick={() => removeTask(id)}>
                <Trash2 />
              </Button>
            </div>
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