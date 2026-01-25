import { Outlet } from "react-router";
import Header from "@/widgets/Header";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;