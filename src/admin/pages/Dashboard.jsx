import { Link } from "react-router-dom";

function Dashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,458",
      change: "+12.5%",
      icon: "👥",
    },
    {
      title: "Total Hotels",
      value: "384",
      change: "+8.2%",
      icon: "🏨",
    },
    {
      title: "Total Bookings",
      value: "1,842",
      change: "+15.8%",
      icon: "📅",
    },
    {
      title: "Total Revenue",
      value: "PKR 8.4M",
      change: "+18.4%",
      icon: "💰",
    },
  ];

  const recentBookings = [
    {
      id: "STY-2026-84721",
      customer: "Ali Khan",
      hotel: "Serena Hotel Islamabad",
      date: "15 Oct 2026",
      amount: "PKR 27,500",
      status: "Confirmed",
    },
    {
      id: "STY-2026-73146",
      customer: "Ahmed Shah",
      hotel: "Pearl Continental Lahore",
      date: "22 Nov 2026",
      amount: "PKR 46,000",
      status: "Confirmed",
    },
    {
      id: "STY-2026-59218",
      customer: "Usman Ali",
      hotel: "Grand Millennium Dubai",
      date: "10 Dec 2026",
      amount: "PKR 132,000",
      status: "Upcoming",
    },
  ];

  return (
    <main className="admin-dashboard">
      <section className="section">
        <div className="container">
          <div className="admin-page-header">
            <div>
              <span className="admin-label">ADMIN PANEL</span>

              <h1 className="section-title">
                Dashboard
              </h1>

              <p className="section-subtitle">
                Welcome back! Here's what's happening with
                StaySphere today.
              </p>
            </div>

            <Link
              to="/hotels"
              className="admin-view-button"
            >
              View Website
            </Link>
          </div>

          <div className="admin-stats-grid">
            {stats.map((stat) => (
              <article
                className="admin-stat-card"
                key={stat.title}
              >
                <div className="admin-stat-top">
                  <span className="admin-stat-icon">
                    {stat.icon}
                  </span>

                  <span className="admin-stat-change">
                    {stat.change}
                  </span>
                </div>

                <span className="admin-stat-title">
                  {stat.title}
                </span>

                <strong className="admin-stat-value">
                  {stat.value}
                </strong>
              </article>
            ))}
          </div>

          <div className="admin-dashboard-grid">
            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2>Recent Bookings</h2>
                  <p>Latest hotel reservations</p>
                </div>

                <Link to="/admin/bookings">
                  View All
                </Link>
              </div>

              <div className="admin-bookings-list">
                {recentBookings.map((booking) => (
                  <div
                    className="admin-booking-row"
                    key={booking.id}
                  >
                    <div className="admin-booking-info">
                      <strong>{booking.customer}</strong>
                      <span>{booking.hotel}</span>
                    </div>

                    <div className="admin-booking-date">
                      <span>{booking.date}</span>
                      <strong>{booking.amount}</strong>
                    </div>

                    <span className="admin-booking-status">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Manage your platform</p>
                </div>
              </div>

              <div className="admin-quick-actions">
                <Link to="/admin/hotels">
                  🏨
                  <span>
                    <strong>Manage Hotels</strong>
                    <small>Add or edit hotels</small>
                  </span>
                </Link>

                <Link to="/admin/rooms">
                  🛏️
                  <span>
                    <strong>Manage Rooms</strong>
                    <small>Manage hotel rooms</small>
                  </span>
                </Link>

                <Link to="/admin/tours">
                  🌍
                  <span>
                    <strong>Manage Tours</strong>
                    <small>Add or edit tours</small>
                  </span>
                </Link>

                <Link to="/admin/users">
                  👥
                  <span>
                    <strong>Manage Users</strong>
                    <small>View registered users</small>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;