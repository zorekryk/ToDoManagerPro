import "./Task.css";
import Badge from "@/components/shared/Badge";
import Button from "@/components/shared/Button";
import { Calendar, SquarePen, Tag, Trash2 } from "lucide-react";
import { useId } from "react";

const Task = (props) => {
  const { title, description, category, deadline } = props;
  const id = useId();
  return (
    <div className="task card">
      <div className="task-content">
        <input
          className="checkbox"
          id={id}
          type="checkbox"
        />
        <div className="task-info">
          <label htmlFor={id}>{title}</label>
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
        <Button classname="ghost">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};

export default Task;