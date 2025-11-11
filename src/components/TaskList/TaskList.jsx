import "./TaskList.css";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/stores/useTasks";

const TaskList = () => {
  const tasks = useTasks((state) => state.tasks);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task}/>
      ))}
    </div>
  );
};

export default TaskList;