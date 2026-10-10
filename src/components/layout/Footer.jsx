import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Stay<span>Sphere</span>
          </Link>

          <p>
            Find comfortable stays, discover amazing destinations,
            and plan your next journey with StaySphere.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/hotels">Hotels</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/deals">Deals</Link>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 StaySphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;