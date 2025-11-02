import "./Header.css";
import Nav from "../Nav";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>ToDo Manager Pro</h1>
        <Nav />
      </div>
    </header>
  );
};

export default Header;