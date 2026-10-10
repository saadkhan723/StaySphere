import { useState } from "react";

function Bookings() {
  const [search, setSearch] = useState("");

  const bookings = [
    {
      id: "STY-2026-84721",
      customer: "Ali Khan",
      hotel: "Serena Hotel Islamabad",
      room: "Deluxe Room",
      date: "15 Oct 2026",
      amount: "PKR 27,500",
      status: "Confirmed",
    },
    {
      id: "STY-2026-73146",
      customer: "Ahmed Shah",
      hotel: "Pearl Continental Lahore",
      room: "Executive Room",
      date: "22 Nov 2026",
      amount: "PKR 46,000",
      status: "Confirmed",
    },
    {
      id: "STY-2026-59218",
      customer: "Usman Ali",
      hotel: "Grand Millennium Dubai",
      room: "Premium Suite",
      date: "10 Dec 2026",
      amount: "PKR 132,000",
      status: "Upcoming",
    },
    {
      id: "STY-2026-41825",
      customer: "Sara Khan",
      hotel: "Swat Serena Hotel",
      room: "Mountain View Room",
      date: "05 Nov 2026",
      amount: "PKR 36,000",
      status: "Cancelled",
    },
  ];

  const filteredBookings = bookings.filter((booking) =>
    `${booking.id} ${booking.customer} ${booking.hotel}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
          placeholder="Search booking, customer or hotel..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Status</option>
          <option>Confirmed</option>
          <option>Upcoming</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Booking List</h2>
            <p>{filteredBookings.length} bookings found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Hotel / Room</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <div className="admin-hotel-name">
                      <div className="admin-hotel-icon">📅</div>

                      <div>
                        <strong>{booking.id}</strong>
                        <span>Reservation</span>
                      </div>
                    </div>
                  </td>

                  <td>{booking.customer}</td>

                  <td>
                    <div className="admin-booking-info">
                      <strong>{booking.hotel}</strong>
                      <span>{booking.room}</span>
                    </div>
                  </td>

                  <td>{booking.date}</td>

                  <td>
                    <strong>{booking.amount}</strong>
                  </td>

                  <td>
                    <span
                      className={`admin-status ${
                        booking.status === "Cancelled"
                          ? "cancelled"
                          : "active"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-actions">
                      <button title="View">👁️</button>
                      <button title="Edit">✏️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="admin-empty-state">
            <div>📅</div>

            <h3>No bookings found</h3>

            <p>
              Try searching with a different booking or customer name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;