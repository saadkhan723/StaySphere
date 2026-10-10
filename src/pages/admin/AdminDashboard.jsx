
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    hotels: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const [hotelResponse, bookingResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/hotels"),
            fetch("http://localhost:5000/api/bookings"),
          ]);

        if (!hotelResponse.ok || !bookingResponse.ok) {
          throw new Error("Dashboard data load nahi ho saka.");
        }

        const hotelData = await hotelResponse.json();
        const bookingData = await bookingResponse.json();

        setStats({
          hotels: hotelData.count ?? hotelData.hotels?.length ?? 0,
          bookings:
            bookingData.count ?? bookingData.bookings?.length ?? 0,
        });
      } catch (err) {
        setError(err.message || "Backend se connection nahi ho saka.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="admin-dashboard container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to StaySphere management.</p>

      {loading ? (
        <p>Dashboard load ho raha hai...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <div className="admin-stats">
          <article className="admin-stat-card">
            <h2>Total Hotels</h2>
            <p>{stats.hotels}</p>
          </article>

          <article className="admin-stat-card">
            <h2>Total Bookings</h2>
            <p>{stats.bookings}</p>
          </article>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
