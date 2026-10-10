import { useState } from "react";

function Rooms() {
  const [search, setSearch] = useState("");

  const rooms = [
    {
      id: 1,
      hotel: "Serena Hotel Islamabad",
      room: "Deluxe Room",
      type: "Deluxe",
      guests: 2,
      price: "PKR 25,000",
      status: "Available",
    },
    {
      id: 2,
      hotel: "Serena Hotel Islamabad",
      room: "Executive Suite",
      type: "Suite",
      guests: 3,
      price: "PKR 38,000",
      status: "Booked",
    },
    {
      id: 3,
      hotel: "Pearl Continental Lahore",
      room: "Executive Room",
      type: "Executive",
      guests: 2,
      price: "PKR 22,000",
      status: "Available",
    },
    {
      id: 4,
      hotel: "Grand Millennium Dubai",
      room: "Premium Suite",
      type: "Suite",
      guests: 4,
      price: "PKR 32,000",
      status: "Available",
    },
    {
      id: 5,
      hotel: "Swat Serena Hotel",
      room: "Mountain View Room",
      type: "Deluxe",
      guests: 2,
      price: "PKR 18,000",
      status: "Maintenance",
    },
  ];

  const filteredRooms = rooms.filter((room) =>
    `${room.hotel} ${room.room} ${room.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>
          <h1 className="section-title">Rooms</h1>
          <p className="section-subtitle">
            Manage hotel rooms, prices and availability.
          </p>
        </div>

        <button className="admin-primary-button">
          + Add New Room
        </button>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search rooms or hotels..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Room Types</option>
          <option>Deluxe</option>
          <option>Executive</option>
          <option>Suite</option>
        </select>

        <select>
          <option>All Status</option>
          <option>Available</option>
          <option>Booked</option>
          <option>Maintenance</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Room List</h2>
            <p>{filteredRooms.length} rooms found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Hotel</th>
                <th>Type</th>
                <th>Guests</th>
                <th>Price / Night</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <div className="admin-hotel-name">
                      <div className="admin-hotel-icon">🛏️</div>

                      <div>
                        <strong>{room.room}</strong>
                        <span>Room ID: #{room.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{room.hotel}</td>

                  <td>{room.type}</td>

                  <td>👤 {room.guests}</td>

                  <td>
                    <strong>{room.price}</strong>
                  </td>

                  <td>
                    <span
                      className={`admin-status ${
                        room.status === "Available"
                          ? "active"
                          : room.status === "Booked"
                          ? "booked"
                          : "maintenance"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-actions">
                      <button title="View">👁️</button>
                      <button title="Edit">✏️</button>
                      <button title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRooms.length === 0 && (
          <div className="admin-empty-state">
            <div>🛏️</div>
            <h3>No rooms found</h3>
            <p>
              Try searching with a different room or hotel name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;