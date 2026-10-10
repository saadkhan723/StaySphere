import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-card">
          <span className="not-found-code">404</span>

          <h1>Page Not Found</h1>

          <p>
            Sorry, the page you're looking for doesn't exist or may
            have been moved.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="not-found-primary">
              Back to Home
            </Link>

            <Link to="/hotels" className="not-found-secondary">
              Explore Hotels
            </Link>

            <button
              type="button"
              className="not-found-secondary"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;