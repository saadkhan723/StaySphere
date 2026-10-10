import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const hotels = [
    {
      id: 1,
      name: "Serena Hotel Islamabad",
      location: "Islamabad, Pakistan",
      rooms: 124,
      rating: 4.8,
      price: "PKR 25,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Pearl Continental Lahore",
      location: "Lahore, Pakistan",
      rooms: 98,
      rating: 4.7,
      price: "PKR 22,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Grand Millennium Dubai",
      location: "Dubai, UAE",
      rooms: 186,
      rating: 4.6,
      price: "PKR 32,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Swat Serena Hotel",
      location: "Swat, Pakistan",
      rooms: 76,
      rating: 4.5,
      price: "PKR 18,000",
      status: "Active",
    },
  ];

  const filteredHotels = hotels.filter((hotel) =>
    `${hotel.name} ${hotel.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>
          <h1 className="section-title">Hotels</h1>
          <p className="section-subtitle">
            Manage all hotels listed on StaySphere.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-button"
          onClick={() => navigate("/admin/hotels/add")}
        >
          + Add New Hotel
        </button>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search hotels..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Locations</option>
          <option>Pakistan</option>
          <option>UAE</option>
        </select>

        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Hotel List</h2>
            <p>{filteredHotels.length} hotels found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Location</th>
                <th>Rooms</th>
                <th>Rating</th>
                <th>Price / Night</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>
                    <div className="admin-hotel-name">
                      <div className="admin-hotel-icon">🏨</div>

                      <div>
                        <strong>{hotel.name}</strong>
                        <span>Hotel ID: #{hotel.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{hotel.location}</td>

                  <td>{hotel.rooms}</td>

                  <td>
                    <span className="admin-rating">
                      ⭐ {hotel.rating}
                    </span>
                  </td>

                  <td>
                    <strong>{hotel.price}</strong>
                  </td>

                  <td>
                    <span className="admin-status active">
                      {hotel.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-actions">
                      <button type="button" title="View">
                        👁️
                      </button>

                      <button type="button" title="Edit">
                        ✏️
                      </button>

                      <button type="button" title="Delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHotels.length === 0 && (
          <div className="admin-empty-state">
            <div>🏨</div>
            <h3>No hotels found</h3>
            <p>
              Try searching with a different hotel name or location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;