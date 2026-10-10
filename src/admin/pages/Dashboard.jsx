
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [hotelResponse, bookingResponse] = await Promise.all([
          fetch("http://localhost:5000/api/hotels"),
          fetch("http://localhost:5000/api/bookings"),
        ]);

        if (!hotelResponse.ok || !bookingResponse.ok) {
          throw new Error("Dashboard data load nahi ho saka.");
        }

        const hotelData = await hotelResponse.json();
        const bookingData = await bookingResponse.json();

        setHotels(hotelData.hotels || []);
        setBookings(bookingData.bookings || []);
      } catch (err) {
        setError(err.message || "Server se connection nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const activeBookings = bookings.filter(
    (booking) => booking.status !== "Cancelled"
  );

  const totalRevenue = activeBookings.reduce(
    (sum, booking) => sum + Number(booking.total || 0),
    0
  );

  const formatPKR = (amount) =>
    new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount);

  const stats = [
    {
      title: "Total Users",
      value: "N/A",
      icon: "👥",
    },
    {
      title: "Total Hotels",
      value: hotels.length,
      icon: "🏨",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: "📅",
    },
    {
      title: "Total Revenue",
      value: formatPKR(totalRevenue),
      icon: "💰",
    },
  ];

  return (
    <main className="admin-dashboard">
      <section className="section">
        <div className="container">
          <div className="admin-page-header">
            <div>
              <span className="admin-label">ADMIN PANEL</span>
              <h1 className="section-title">Dashboard</h1>
              <p className="section-subtitle">
                Welcome back! Here's what's happening with StaySphere today.
              </p>
            </div>

            <Link to="/hotels" className="admin-view-button">
              View Website
            </Link>
          </div>

          {error && (
            <p role="alert" style={{ color: "red" }}>
              {error}
            </p>
          )}

          {loading ? (
            <p>Dashboard data load ho raha hai...</p>
          ) : (
            <>
              <div className="admin-stats-grid">
                {stats.map((stat) => (
                  <article className="admin-stat-card" key={stat.title}>
                    <div className="admin-stat-top">
                      <span className="admin-stat-icon">{stat.icon}</span>
                    </div>

                    <span className="admin-stat-title">{stat.title}</span>
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

                    <Link to="/admin/bookings">View All</Link>
                  </div>

                  <div className="admin-bookings-list">
                    {bookings.length === 0 ? (
                      <p>Abhi koi booking available nahi hai.</p>
                    ) : (
                      bookings.slice(0, 5).map((booking) => (
                        <div
                          className="admin-booking-row"
                          key={booking._id}
                        >
                          <div className="admin-booking-info">
                            <strong>{booking.guestName}</strong>
                            <span>
                              {booking.hotel?.name || "Hotel details unavailable"}
                            </span>
                          </div>

                          <div className="admin-booking-date">
                            <span>
                              {booking.checkIn
                                ? new Date(booking.checkIn).toLocaleDateString()
                                : "N/A"}
                            </span>
                            <strong>{formatPKR(Number(booking.total || 0))}</strong>
                          </div>

                          <span className="admin-booking-status">
                            {booking.status}
                          </span>
                        </div>
                      ))
                    )}
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
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
