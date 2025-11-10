import "./Nav.css";
import { NavLink } from "react-router";

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >Завдання</NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            className={({ isActive }) => (isActive ? "is-active" : "")}
          >Категорії</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;