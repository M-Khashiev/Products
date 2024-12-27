import { Link } from "react-router-dom";
import "./styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/products" className="navbar-link">Products</Link>
        <Link to="/create-product" className="navbar-link">Create product</Link>
      </div>

      <div className="navbar-right">
        <Link to="/products/favorites" className="navbar-link">Избранное</Link>
      </div>
    </nav>
  );
}

export default Navbar;
