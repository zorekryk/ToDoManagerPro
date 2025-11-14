import SearchForm from "@/components/SearchForm";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useTasks } from "@/stores/useTasks";

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