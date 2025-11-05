import AddTaskForm from "@/components/AddTaskForm";
import SearchForm from "@/components/SearchForm";
import TaskList from "@/components/TaskList";

const Home = () => {
  return (
    <main>
      <div className="container">
        <AddTaskForm />
        <SearchForm />
        <TaskList />
      </div>
    </main>
  );
};

export default Home;