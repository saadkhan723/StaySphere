import { NavLink, Outlet, Link } from "react-router-dom";

function AdminLayout() {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: "📊" },
    { name: "Hotels", path: "/admin/hotels", icon: "🏨" },
    { name: "Rooms", path: "/admin/rooms", icon: "🛏️" },
    { name: "Tours", path: "/admin/tours", icon: "🌍" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Bookings", path: "/admin/bookings", icon: "📅" },
    { name: "Reviews", path: "/admin/reviews", icon: "⭐" },
    { name: "Deals", path: "/admin/deals", icon: "🎟️" },
    { name: "Settings", path: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link to="/" className="admin-logo">
            Stay<span>Sphere</span>
          </Link>

          <span className="admin-badge">ADMIN</span>
        </div>

        <nav className="admin-sidebar-nav">
          <span className="admin-menu-title">MAIN MENU</span>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-back-website">
            ← Back to Website
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <h2>Admin Panel</h2>
            <span>StaySphere Management</span>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">SA</div>

            <div>
              <strong>Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;