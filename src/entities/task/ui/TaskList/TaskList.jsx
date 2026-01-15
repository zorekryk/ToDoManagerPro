import "./TaskList.css";
import { TaskItem, useTasks } from "@/entities/task";
import { Info } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

const TaskList = () => {
  const { tasks, searchQuery, filterStatus, fetchTasks } = useTasks(
    useShallow((state) => ({
      tasks: state.tasks,
      searchQuery: state.searchQuery,
      filterStatus: state.filterStatus,
      fetchTasks: state.fetchTasks
    })));

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filterStatus === "active") {
      result = result.filter((t) => !t.isCompleted);
    } else if (filterStatus === "completed") {
      result = result.filter((t) => !t.isCompleted);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [filterStatus, searchQuery, tasks]);

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

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