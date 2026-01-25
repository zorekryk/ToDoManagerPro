import SearchForm from "@/features/SearchForm";
import TaskForm from "@/features/TaskForm";
import TaskList from "@/entities/task/ui/TaskList";
import { useTasks } from "@/entities/task";

const HomePage = () => {
  const addTask = useTasks((state) => state.addTask);

  const INITIAL_FORM_STATE = {
    title: "",
    description: "",
    categoryId: "",
    deadline: ""
  };

  const handleAdd = (data) => {
    addTask(data);
  };

  return (
    <main>
      <div className="container">
        <TaskForm
          initialData={INITIAL_FORM_STATE}
          onSubmit={handleAdd}
        />
        <SearchForm />
        <TaskList />
      </div>
    </main>
  );
};

export default HomePage;