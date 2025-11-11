import SearchForm from "@/components/SearchForm";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useCategories } from "@/stores/useCategories";
import { useTasks } from "@/stores/useTasks";

const HomePage = () => {
  const categories = useCategories((state) => state.categories);
  const addTask = useTasks((state) => state.addTask);

  const INITIAL_FORM_STATE = {
    title: "",
    description: "",
    categoryId: categories[0]?.id || "",
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
          categories={categories.map((c) => ({
            label: c.title,
            value: c.id,
            color: c.color
          }))}
        />
        <SearchForm />
        <TaskList />
      </div>
    </main>
  );
};

export default HomePage;