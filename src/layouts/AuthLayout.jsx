import { Outlet, Link } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-layout-brand">
        <Link to="/" className="auth-layout-logo">
          Stay<span>Sphere</span>
        </Link>

        <p>
          Your journey starts here.
          <br />
          Find your perfect stay with StaySphere.
        </p>
      </div>

      <main className="auth-layout-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;