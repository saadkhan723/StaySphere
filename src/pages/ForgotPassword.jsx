import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-card">

          <div className="auth-header">
            <h1>Forgot Password?</h1>

            <p>
              Enter your email address and we'll send you a link
              to reset your password.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          {submitted ? (
            <div className="auth-success">
              <strong>Reset link sent!</strong>

              <p>
                If an account exists for{" "}
                <strong>{email}</strong>, you will receive
                password reset instructions.
              </p>

              <Link
                to="/login"
                className="auth-submit"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
              >
                Send Reset Link
              </button>
            </form>
          )}

          {!submitted && (
            <>
              <div className="auth-divider">
                <span>or</span>
              </div>

              <p className="auth-switch">
                Remember your password?{" "}
                <Link to="/login">
                  Back to Login
                </Link>
              </p>
            </>
          )}

        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;