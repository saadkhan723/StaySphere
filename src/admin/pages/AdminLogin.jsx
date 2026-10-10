import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Demo admin login until backend authentication is connected.
    navigate("/admin");
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">

          <Link to="/" className="admin-login-logo">
            Stay<span>Sphere</span>
          </Link>

          <div className="admin-login-badge">
            ADMIN PANEL
          </div>

          <div className="admin-login-header">
            <h1>Admin Login</h1>

            <p>
              Sign in to manage your StaySphere platform.
            </p>
          </div>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >
            <div className="admin-login-field">
              <label htmlFor="admin-email">
                Email Address
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                placeholder="admin@staysphere.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">
                Password
              </label>

              <input
                id="admin-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              Login to Admin Panel
            </button>
          </form>

          <div className="admin-login-divider">
            <span>or</span>
          </div>

          <Link
            to="/"
            className="admin-login-back"
          >
            ← Back to StaySphere
          </Link>

        </div>
      </div>
    </main>
  );
}

export default AdminLogin;