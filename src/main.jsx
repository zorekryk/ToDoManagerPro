import CategoriesPage from "@/pages/CategoriesPage/CategoriesPage.jsx";
import EditCategoryPage from "@/pages/EditCategoryPage/EditCategoryPage.jsx";
import EditTaskPage from "@/pages/EditTaskPage/EditTaskPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import "@/app/styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/edit/:id" element={<EditTaskPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<EditCategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
