import CategoriesPage from "@/pages/CategoriesPage";
import EditTaskPage from "@/pages/EditTaskPage";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import HomePage from "./pages/HomePage";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/edit/:id" element={<EditTaskPage />}/>
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
