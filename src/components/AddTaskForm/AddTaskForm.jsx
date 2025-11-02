import "./AddTaskForm.css";
import { Plus } from "lucide-react";
import Button from "../shared/Button";
import Field from "../shared/Field";

const options = [
  {
    label: "Життя",
    value: "life"
  },
  {
    label: "Робота",
    value: "work"
  },
  {
    label: "Навчання",
    value: "study"
  },
  {
    label: "Покупки",
    value: "shopping"
  }
];

const AddTaskForm = () => {
  return (
    <div className="add-task-form">
      <h2>Додати нове завдання</h2>
      <Field
        label="Назва завдання"
        error="Не може бути пустим"
        placeholder="Наприклад..."
      />
      <Field
        label="Опис завдання"
        placeholder="Детальний опис завдання..."
        type="textarea"
      />
      <div className="other-info">
        <Field label="Категорія" type="select" options={options} />
        <Field label="Дедлайн" type="date" />
      </div>
      <Button title="Додати завдання" icon={Plus} />
    </div>
  );
};

export default AddTaskForm;