
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/bookings";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // MongoDB se bookings load karo
  const fetchBookings = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Bookings load nahi ho sakin.");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message || "Backend se connection nahi ho saka.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPKR = (amount) =>
    `PKR ${Number(amount || 0).toLocaleString("en-PK")}`;

  // Search aur status filter
  const filteredBookings = bookings.filter((booking) => {
    const hotelName =
      typeof booking.hotel === "object"
        ? booking.hotel?.name || ""
        : "";

    const searchText = [
      booking._id,
      booking.guestName,
      booking.email,
      hotelName,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      (booking.status || "Pending") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Booking status update: Confirm ya Cancel
  const updateBookingStatus = async (booking, action) => {
    const isConfirm = action === "confirm";
    const newStatus = isConfirm ? "Confirmed" : "Cancelled";

    const approved = window.confirm(
      `Kya aap ${booking.guestName} ki booking ${isConfirm ? "confirm" : "cancel"} karna chahte hain?`
    );

    if (!approved) return;

    setActionLoadingId(booking._id);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/${booking._id}/${action}`,
        { method: "PUT" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Booking ${isConfirm ? "confirm" : "cancel"} nahi ho saki.`
        );
      }

      const updatedBooking = {
        ...booking,
        ...(data.booking || {}),
        status: newStatus,
      };

      setBookings((current) =>
        current.map((item) =>
          item._id === booking._id ? updatedBooking : item
        )
      );

      setSelectedBooking((current) =>
        current?._id === booking._id ? updatedBooking : current
      );
    } catch (err) {
      setError(err.message || "Booking update karte waqt error aaya.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Cancelled") return "cancelled";
    if (status === "Confirmed") return "active";
    return "";
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>
          <h1 className="section-title">Bookings</h1>
          <p className="section-subtitle">
            Manage hotel reservations and booking records.
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search booking, customer, email or hotel..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All Status">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
          }}
        >
          {error}
          <button
            type="button"
            onClick={() => fetchBookings(true)}
            style={{ marginLeft: "12px" }}
          >
            Try Again
          </button>
        </div>
      )}

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Booking List</h2>
            <p>
              {loading
                ? "Loading bookings..."
                : `${filteredBookings.length} bookings found`}
            </p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() => fetchBookings(true)}
            disabled={loading || refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Hotel / Rooms</th>
                <th>Check-in / Out</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filteredBookings.map((booking) => {
                  const hotelName =
                    typeof booking.hotel === "object"
                      ? booking.hotel?.name || "Hotel unavailable"
                      : "Hotel unavailable";

                  const status = booking.status || "Pending";
                  const busy = actionLoadingId === booking._id;

                  return (
                    <tr key={booking._id}>
                      <td>
                        <div className="admin-hotel-name">
                          <div className="admin-hotel-icon">📅</div>
                          <div>
                            <strong>
                              {booking._id.slice(-8).toUpperCase()}
                            </strong>
                            <span>Booking ID</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="admin-booking-info">
                          <strong>{booking.guestName}</strong>
                          <span>{booking.email}</span>
                        </div>
                      </td>

                      <td>
                        <div className="admin-booking-info">
                          <strong>{hotelName}</strong>
                          <span>
                            {booking.rooms || 1} room(s) ·{" "}
                            {booking.guests || 1} guest(s)
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="admin-booking-info">
                          <strong>{formatDate(booking.checkIn)}</strong>
                          <span>To {formatDate(booking.checkOut)}</span>
                        </div>
                      </td>

                      <td>
                        <strong>{formatPKR(booking.total)}</strong>
                      </td>

                      <td>
                        <span
                          className={`admin-status ${getStatusClass(status)}`}
                        >
                          {status}
                        </span>
                      </td>

                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            title="View booking details"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            👁️
                          </button>

                          {status === "Pending" && (
                            <button
                              type="button"
                              title="Confirm booking"
                              disabled={busy}
                              onClick={() =>
                                updateBookingStatus(booking, "confirm")
                              }
                            >
                              {busy ? "⏳" : "✅"}
                            </button>
                          )}

                          {status !== "Cancelled" && (
                            <button
                              type="button"
                              title="Cancel booking"
                              disabled={busy}
                              onClick={() =>
                                updateBookingStatus(booking, "cancel")
                              }
                            >
                              {busy ? "⏳" : "❌"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {!loading && filteredBookings.length === 0 && !error && (
          <div className="admin-empty-state">
            <div>📅</div>
            <h3>No bookings found</h3>
            <p>Try another search term or booking status.</p>
          </div>
        )}
      </div>

      {/* Booking details popup */}
      {selectedBooking && (
        <div
          onClick={() => setSelectedBooking(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-details-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              background: "#fff",
              color: "#222",
              borderRadius: "12px",
              padding: "24px",
              width: "100%",
              maxWidth: "520px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 15px 50px rgba(0,0,0,0.25)",
            }}
          >
            <h2 id="booking-details-title">Booking Details</h2>

            <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
            <p><strong>Guest:</strong> {selectedBooking.guestName}</p>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Phone:</strong> {selectedBooking.phone || "N/A"}</p>
            <p>
              <strong>Hotel:</strong>{" "}
              {typeof selectedBooking.hotel === "object"
                ? selectedBooking.hotel?.name || "Hotel unavailable"
                : "Hotel unavailable"}
            </p>
            <p><strong>Check-in:</strong> {formatDate(selectedBooking.checkIn)}</p>
            <p><strong>Check-out:</strong> {formatDate(selectedBooking.checkOut)}</p>
            <p><strong>Rooms:</strong> {selectedBooking.rooms || 1}</p>
            <p><strong>Guests:</strong> {selectedBooking.guests || 1}</p>
            <p><strong>Room price/night:</strong> {formatPKR(selectedBooking.roomPrice)}</p>
            <p><strong>Taxes:</strong> {formatPKR(selectedBooking.taxes)}</p>
            <p><strong>Total:</strong> {formatPKR(selectedBooking.total)}</p>
            <p><strong>Status:</strong> {selectedBooking.status || "Pending"}</p>
            <p><strong>Notes:</strong> {selectedBooking.notes || "None"}</p>

            <button
              type="button"
              className="admin-primary-button"
              onClick={() => setSelectedBooking(null)}
              style={{ marginTop: "12px" }}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
