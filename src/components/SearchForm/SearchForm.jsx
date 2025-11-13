import "./SearchForm.css";
import Dropdown from "@/components/shared/Dropdown";
import { useDebounce } from "@/hooks/useDebounce";
import { useTasks } from "@/stores/useTasks";
import { Funnel, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery);
  const debouncedSearch = useDebounce(localSearchValue, 300);
  const filterBtnRef = useRef(null);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  useEffect(() => {
    setLocalSearchValue(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setLocalSearchValue(e.target.value);
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