import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditTask = () => {
  const { id } = useParams();
  const tasks = useTasks((state) => state.tasks);
  const editTask = useTasks((state) => state.editTask);
  const navigate = useNavigate();
  const [task, setTask] = useState(() => {
    const stored = useTasks.getState().tasks;
    return stored.find((t) => t.id === id);
  });

  useEffect(() => {
    console.log('Looking for id:', id);
    console.log('Available tasks:', tasks);
    if (!tasks || tasks.length === 0) return;
    const found = tasks.find((t) => t.id === id);
    console.log('Found task:', found);
    if (found) setTask(found);
  }, [id, tasks]);

  if (!tasks || tasks.length === 0) {
    return (
      <main>
        <div className="container">
          <p>Завантаження списку завдань...</p>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main>
        <div className="container">
          <p>Завантаження завдання...</p>
        </div>
      </main>
    );
  }

  const handleEdit = (data) => {
    editTask(task.id, data);
    navigate("/");
  };
  return (
    <main>
      <div className="container">
        <TaskForm
          initialData={task}
          submitLabel="Редагувати завдання"
          showCancel
          onSubmit={handleEdit}
        />
      </div>
    </main>
  );
};

export default EditTask;