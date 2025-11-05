import "./AddTaskForm.css";
import { useTasks } from "@/store";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import Button from "../shared/Button";
import Field from "../shared/Field";

const categories = ["Життя", "Робота", "Навчання", "Покупки"];
const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  category: categories[0],
  deadline: ""
};

const AddTaskForm = () => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({ title: "" });
  const titleInputRef = useRef(null);
  const addTask = useTasks((state) => state.addTask);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { title: "" };

    if (!form.title.trim()) {
      newErrors.title = "Назва не може бути порожньою.";
    } else if (form.title.trim().length > 100) {
      newErrors.title = "Максимум 100 символів";
    }

    return newErrors.title ? newErrors : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      titleInputRef.current?.focus();
      return;
    }
    const deadline = form.deadline || "Без дедлайну"

    addTask({...form, deadline});
    setForm(INITIAL_FORM_STATE);
    setErrors({ title: "" });
  };

  return (
    <form className="add-task-form card" onSubmit={handleSubmit}>
      <h2>Додати нове завдання</h2>
      <Field
        id="title"
        name="title"
        label="Назва завдання"
        placeholder="Наприклад..."
        value={form.title}
        onChange={handleChange}
        error={errors.title}
      />
      <Field
        id="description"
        name="description"
        label="Опис завдання"
        placeholder="Детальний опис завдання..."
        type="textarea"
        value={form.description}
        onChange={handleChange}
      />
      <div className="other-info">
        <Field
          id="category"
          name="category"
          label="Категорія"
          type="select"
          options={categories}
          value={form.category}
          onChange={handleChange}
        />
        <Field
          id="deadline"
          name="deadline"
          label="Дедлайн"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          min={today}
        />
      </div>
      <Button type="submit">
        <Plus />Додати завдання
      </Button>
    </form>
  );
};

export default AddTaskForm;