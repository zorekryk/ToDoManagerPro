import Button from "@/shared/ui/Button";
import TaskForm from "@/features/TaskForm";
import { useTasks } from "@/entities/task";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const EditTaskPage = () => {
  const { id } = useParams();
  const tasks = useTasks((state) => state.tasks);
  const editTask = useTasks((state) => state.editTask);
  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === id);

  if (tasks.length > 0 && !task) {
    return (
      <main>
        <div className="container">
          <div className="alert alert-error">
            <p>Завдання не знайдено</p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft />
              Повернутися до списку завдань
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const handleEdit = async (data) => {
    await editTask(task.id, data);
    navigate("/");
  };

  return (
    <main>
      <div className="container">
        <TaskForm
          initialData={task}
          submitLabel="Редагувати завдання"
          onSubmit={handleEdit}
          showCancel
        />
      </div>
    </main>
  );
};

export default EditTaskPage;