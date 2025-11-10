import "./Task.css";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { useTasks } from "@/stores/useTasks";
import { Calendar, SquarePen, Tag, Trash2 } from "lucide-react";
import { useId } from "react";
import { useNavigate } from "react-router";

const Task = (props) => {
  const { id, completed, title, description, category, deadline } = props;
  const fieldId = useId();

  const navigate = useNavigate();
  const toggleTask = useTasks((state) => state.toggleTask);
  const removeTask = useTasks((state) => state.removeTask);

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
              {category}
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

export default Task;