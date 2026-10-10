
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const [activeTab, setActiveTab] = useState("All Bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/bookings"
        );

        if (!response.ok) {
          throw new Error("Bookings load nahi ho sakin.");
        }

        const data = await response.json();

        const formattedBookings = (data.bookings || []).map(
          (booking) => {
            const hotel = booking.hotel || {};

            return {
              id: booking._id,
              hotel: hotel.name || "Hotel",
              hotelId: hotel._id || "",
              image: hotel.image || "",
              location: hotel.location || "Location unavailable",
              checkIn: booking.checkIn,
              checkOut: booking.checkOut,
              guests: booking.guests,
              rooms: booking.rooms,
              total: booking.total,
              status: booking.status || "Pending",
              roomPrice: booking.roomPrice,
              notes: booking.notes || "",
            };
          }
        );

        setBookings(formattedBookings);
        setError("");
      } catch (err) {
        setError(
          err.message || "Backend se connection nahi ho saka."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  function formatDate(date) {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  function formatPrice(amount) {
    return `PKR ${Number(amount || 0).toLocaleString("en-PK")}`;
  }

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "All Bookings") {
      return true;
    }

    if (activeTab === "Upcoming") {
      return (
        booking.status === "Pending" ||
        booking.status === "Confirmed" ||
        booking.status === "Upcoming"
      );
    }

    if (activeTab === "Completed") {
      return booking.status === "Completed";
    }

    if (activeTab === "Cancelled") {
      return booking.status === "Cancelled";
    }

    return true;
  });

  const tabs = [
    "All Bookings",
    "Upcoming",
    "Completed",
    "Cancelled",
  ];

  if (loading) {
    return (
      <main className="bookings-page">
        <section className="section">
          <div className="container">
            <h1 className="section-title">My Bookings</h1>
            <p>Loading your bookings...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bookings-page">
        <section className="section">
          <div className="container">
            <h1 className="section-title">My Bookings</h1>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bookings-page">
      <section className="section">
        <div className="container">
          <div className="bookings-header">
            <div>
              <h1 className="section-title">My Bookings</h1>
              <p className="section-subtitle">
                Manage your upcoming and previous hotel reservations.
              </p>
            </div>

            <Link
              to="/hotels"
              className="bookings-explore-button"
            >
              Find More Hotels
            </Link>
          </div>

          <div className="bookings-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bookings-list">
            {filteredBookings.length === 0 ? (
              <div className="no-hotels">
                <h3>
                  {bookings.length === 0
                    ? "No bookings yet"
                    : `No ${activeTab.toLowerCase()} bookings`}
                </h3>

                <p>
                  {bookings.length === 0
                    ? "Your hotel reservations will appear here."
                    : "There are no bookings in this category yet."}
                </p>

                <Link
                  to="/hotels"
                  className="bookings-explore-button"
                >
                  Find Hotels
                </Link>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <article
                  className="booking-history-card"
                  key={booking.id}
                >
                  <div className="booking-history-image">
                    {booking.image && (
                      <img
                        src={booking.image}
                        alt={booking.hotel}
                      />
                    )}
                  </div>

                  <div className="booking-history-content">
                    <div className="booking-history-top">
                      <div>
                        <span
                          className={`booking-status ${
                            booking.status === "Cancelled"
                              ? "cancelled"
                              : booking.status === "Completed"
                              ? "completed"
                              : ""
                          }`}
                        >
                          {booking.status}
                        </span>

                        <h2>{booking.hotel}</h2>
                        <p>{booking.location}</p>
                      </div>

                      <span className="booking-id">
                        Booking ID: {booking.id}
                      </span>
                    </div>

                    <div className="booking-history-details">
                      <div>
                        <span>Check-in</span>
                        <strong>
                          {formatDate(booking.checkIn)}
                        </strong>
                      </div>

                      <div>
                        <span>Check-out</span>
                        <strong>
                          {formatDate(booking.checkOut)}
                        </strong>
                      </div>

                      <div>
                        <span>Guests</span>
                        <strong>{booking.guests}</strong>
                      </div>

                      <div>
                        <span>Rooms</span>
                        <strong>{booking.rooms}</strong>
                      </div>
                    </div>

                    <div className="booking-history-bottom">
                      <div>
                        <span>Total</span>
                        <strong>
                          {formatPrice(booking.total)}
                        </strong>
                      </div>

                      <div className="booking-history-actions">
                        {booking.hotelId && (
                          <Link to={`/hotel/${booking.hotelId}`}>
                            View Hotel
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            window.alert(
                              `Booking ID: ${booking.id}\n` +
                              `Hotel: ${booking.hotel}\n` +
                              `Location: ${booking.location}\n` +
                              `Status: ${booking.status}\n` +
                              `Check-in: ${formatDate(booking.checkIn)}\n` +
                              `Check-out: ${formatDate(booking.checkOut)}\n` +
                              `Guests: ${booking.guests}\n` +
                              `Rooms: ${booking.rooms}\n` +
                              `Total: ${formatPrice(booking.total)}`
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyBookings;