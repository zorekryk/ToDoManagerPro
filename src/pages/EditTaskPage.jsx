import Button from "@/components/shared/Button";
import TaskForm from "@/components/TaskForm";
import { useTasks } from "@/stores/useTasks";
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

  const handleEdit = (data) => {
    editTask(task.id, data);
    navigate("/");
  };

  return (
    <main>
      <div className="container">
        <TaskForm
          initialData={task}
          submitlabel="Редагувати завдання"
          onSubmit={handleEdit}
          showCancel
        />
      </div>
    </main>
  );
};

export default EditTaskPage;