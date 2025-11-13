import "./TaskForm.css";
import { Plus, Save } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../shared/Button";
import Field from "../shared/Field";

const TaskForm = (props) => {
  const {
    initialData,
    submitLabel = "Додати завдання",
    onSubmit,
    showCancel = false,
    categories
  } = props;
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({ title: "" });
  const titleInputRef = useRef(null);
  const navigate = useNavigate();

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
    const deadline = form.deadline || "Без дедлайну";

    onSubmit({ ...form, deadline });
    setForm(initialData);
    setErrors({ title: "" });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form className="add-task-form card" onSubmit={handleSubmit}>
      <h2>{submitLabel}</h2>
      <Field
        id="title"
        name="title"
        label="Назва завдання"
        placeholder="Наприклад..."
        value={form.title}
        onChange={handleChange}
        error={errors.title}
        ref={titleInputRef}
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
          id="categoryId"
          name="categoryId"
          label="Категорія"
          type="select"
          options={categories}
          value={form.categoryId}
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
      <div className="actions">
        <Button type="submit">
          {submitLabel.includes("Додати") ? <Plus /> : <Save />}
          {submitLabel.includes("Додати") ? "Додати завдання" : "Зберегти"}
        </Button>
        {showCancel && (
          <Button type="button" onClick={handleCancel} classname="outlined">
            Скасувати
          </Button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;