import "./Task.css";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { useTasks } from "@/store";
import { Calendar, SquarePen, Tag, Trash2 } from "lucide-react";
import { useId } from "react";

const Task = (props) => {
  const { id, title, description, category, deadline } = props;
  const fieldId = useId();
  const removeTask = useTasks((state) => state.removeTask);

  return (
    <div className="task card">
      <div className="task-content">
        <input
          className="checkbox"
          id={fieldId}
          type="checkbox"
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
        <Button classname="ghost">
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