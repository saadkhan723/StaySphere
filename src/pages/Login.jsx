
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(
    location.state?.registered
      ? "Account created successfully! Please log in."
      : ""
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const savedUsers = JSON.parse(
      localStorage.getItem("staysphere-registered-users") || "[]"
    );

    const matchedUser = savedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Login successful: update the shared authentication context.
    login({
      name: matchedUser.name,
      email: matchedUser.email,
    });

    navigate("/", { replace: true });
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>
              Login to your StaySphere account to manage your bookings.
            </p>
          </div>

          {success && (
            <div className="auth-success" role="status">
              {success}
            </div>
          )}

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="auth-label-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) =>
                  setRememberMe(event.target.checked)
                }
              />
              <span>Remember me</span>
            </label>

            <button type="submit" className="auth-submit">
              Login
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;