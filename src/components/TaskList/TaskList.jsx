import "./TaskList.css";
import TaskItem from "@/components/TaskItem";
import { useFilteredTasks} from "@/stores/useTasks";
import { Info } from "lucide-react";

const TaskList = () => {
  const filteredTasks = useFilteredTasks();

  if (filteredTasks.length === 0) {
    return (
      <div className="task-not-found card">
        <Info />
        <p>Завдань не знайдено</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskList;