import "./CategoryForm.css";
import Button from "@/components/shared/Button";
import Field from "@/components/shared/Field";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const CategoryForm = (props) => {
  const {
    initialData,
    label = "Додати категорію",
    onSubmit,
    showCancel = false
  } = props;

  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({ title: "" });
  const navigate = useNavigate();
  const titleInputRef = useRef(null);

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
    } else if (form.title.trim().length > 50) {
      newErrors.title = "Максимум 50 символів.";
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

    onSubmit({ ...form });
    setForm(initialData);
    setErrors({ title: "" });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form className="category-form card" onSubmit={handleSubmit}>
      <h2>{label}</h2>
      <div className="wrapper">
        <Field
          id="title"
          name="title"
          label="Назва категорії"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          ref={titleInputRef}
        />
        <Field
          id="color"
          name="color"
          label="Колір"
          type="color"
          title="Оберіть колір"
          classname="round"
          value={form.color}
          onChange={handleChange}
        />
      </div>
      <div className="actions">
        <Button type="submit">
          <Plus />
          Додати
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

export default CategoryForm;