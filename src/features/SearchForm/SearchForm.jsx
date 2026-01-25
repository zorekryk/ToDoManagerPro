import "./SearchForm.css";
import Dropdown from "@/shared/ui/Dropdown";
import { useDebounce } from "@/shared/hooks/useDebounce.js";
import { useTasks } from "@/entities/task";
import { Funnel, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "@/shared/ui/Button";
import Field from "@/shared/ui/Field";
import { useShallow } from "zustand/react/shallow";

const SearchForm = () => {
  const {
    filterStatus,
    setSearchQuery,
    setFilterStatus
  } = useTasks(
    useShallow((state) => ({
      filterStatus: state.filterStatus,
      setSearchQuery: state.setSearchQuery,
      setFilterStatus: state.setFilterStatus
    }))
  );

  const [showFilters, setShowFilters] = useState(false);
  const [localSearchValue, setLocalSearchValue] = useState("");
  const debouncedSearch = useDebounce(localSearchValue, 300);
  const filterBtnRef = useRef(null);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearchChange = (e) => {
    setLocalSearchValue(e.target.value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setShowFilters(false);
  };

  return (
    <form className="search-form card" onSubmit={(e) => e.preventDefault()}>
      <div className="wrapper" style={{ position: "relative" }}>
        <Field
          id="search"
          icon={Search}
          placeholder="Пошук завдань"
          ariaLabel="Пошук"
          value={localSearchValue}
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
              classname={`filter ${filterStatus === "completed"
                ? "active"
                : ""} 
                `}
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