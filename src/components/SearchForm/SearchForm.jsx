import "./SearchForm.css";
import Dropdown from "@/components/shared/Dropdown";
import { useTasks } from "@/stores/useTasks";
import { Funnel, Search } from "lucide-react";
import { useRef, useState } from "react";
import Button from "../shared/Button";
import Field from "../shared/Field";

const SearchForm = () => {
  const {
    searchQuery,
    filterStatus,
    setSearchQuery,
    setFilterStatus
  } = useTasks();

  const [showFilters, setShowFilters] = useState(false);
  const filterBtnRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setShowFilters(false);
  };

  return (
    <form className="search-form card">
      <div className="wrapper" style={{ position: "relative" }}>
        <Field
          id="search"
          icon={Search}
          placeholder="Пошук завдань"
          ariaLabel="Пошук"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          classname="outlined menu"
          onClick={() => setShowFilters((prev) => !prev)}
          ref={filterBtnRef}
        >
          <Funnel />
          Фільтри
        </Button>

        <Dropdown
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          triggerRef={filterBtnRef}
          title="Статус завдань"
          align="right"
        >
          <div className="filter-options">
            <Button
              classname={`filter ${filterStatus === "all" ? "active" : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              Всі
            </Button>
            <Button
              classname={`filter ${filterStatus === "active" ? "active" : ""}`}
              onClick={() => handleFilterChange("active")}
            >
              Активні
            </Button>
            <Button
              classname={`filter ${filterStatus === "completed" ? "active" : ""}`}
              onClick={() => handleFilterChange("completed")}
            >
              Виконані
            </Button>
          </div>
        </Dropdown>
      </div>
    </form>
  );
};

export default SearchForm;