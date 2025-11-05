import "./SearchForm.css";
import { Funnel, Search } from "lucide-react";
import Button from "../shared/Button";
import Field from "../shared/Field";

const SearchForm = () => {
  return (
    <div className="search-form card">
      <div className="wrapper">
        <Field
          icon={Search}
          placeholder="Пошук завдань"
          ariaLabel="Пошук"
        />
        <Button classname="outlined">
          <Funnel />
          Фільтри
        </Button>
      </div>
      <div className="wrapper">
        <Button classname="filter active">Всі</Button>
        <Button classname="filter">Активні</Button>
        <Button classname="filter">Виконані</Button>
      </div>
    </div>
  );
};

export default SearchForm;
