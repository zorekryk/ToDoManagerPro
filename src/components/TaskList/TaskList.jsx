import "./TaskList.css";
import Task from "@/components/Task";
import { useTasks } from "@/stores/useTasks";

const TaskList = () => {
  const tasks = useTasks((state) => state.tasks);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task key={task.id} {...task}/>
      ))}
    </div>
  );
};

export default TaskList;