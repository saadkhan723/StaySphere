
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
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
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms & Conditions.");
      return;
    }

    // Demo registration: do not automatically log in.
    const registeredUser = {
      name,
      email,
      password: formData.password,
    };

    const savedUsers = JSON.parse(
      localStorage.getItem("staysphere-registered-users") || "[]"
    );

    const emailExists = savedUsers.some(
      (user) => user.email === email
    );

    if (emailExists) {
      setError("This email is already registered. Please log in.");
      return;
    }

    savedUsers.push(registeredUser);

    localStorage.setItem(
      "staysphere-registered-users",
      JSON.stringify(savedUsers)
    );

    // Account create hone ke baad Login page par bhejo.
    navigate("/login", {
      state: {
        email,
        registered: true,
      },
    });
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Your Account</h1>
            <p>
              Join StaySphere and start planning your next journey.
            </p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

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
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(event) =>
                  setAgreeTerms(event.target.checked)
                }
                required
              />
              <span>
                I agree to the Terms & Conditions
              </span>
            </label>

            <button type="submit" className="auth-submit">
              Create Account
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;