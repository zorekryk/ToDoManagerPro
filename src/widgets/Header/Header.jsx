import "./Header.css";
import { Link } from "react-router";
import Nav from "@/widgets/Header/Nav";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>ToDo Manager Pro</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;