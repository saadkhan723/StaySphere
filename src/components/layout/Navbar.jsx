
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          Stay<span>Sphere</span>
        </Link>

        <nav
          className={`navbar-links ${menuOpen ? "active" : ""}`}
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/hotels" onClick={closeMenu}>
            Hotels
          </Link>

          <Link to="/tours" onClick={closeMenu}>
            Tours
          </Link>

          <Link to="/deals" onClick={closeMenu}>
            Deals
          </Link>

          <Link to="/wishlist" onClick={closeMenu}>
            Wishlist
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/my-bookings" onClick={closeMenu}>
                My Bookings
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                My Profile
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                Hi, {user?.name?.split(" ")[0] || "User"}
              </span>

              <button
                type="button"
                className="navbar-login"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="navbar-register"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`navbar-menu-button ${
            menuOpen ? "active" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;