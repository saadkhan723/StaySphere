import { useState } from "react";

function Tours() {
  const [search, setSearch] = useState("");

  const tours = [
    {
      id: 1,
      name: "Hunza Valley Adventure",
      location: "Hunza, Pakistan",
      duration: "5 Days",
      bookings: 84,
      price: "PKR 45,000",
      status: "Active",
    },
    {
      id: 2,
      name: "Swat Valley Escape",
      location: "Swat, Pakistan",
      duration: "4 Days",
      bookings: 67,
      price: "PKR 32,000",
      status: "Active",
    },
    {
      id: 3,
      name: "Dubai City Experience",
      location: "Dubai, UAE",
      duration: "6 Days",
      bookings: 52,
      price: "PKR 125,000",
      status: "Active",
    },
    {
      id: 4,
      name: "Istanbul Heritage Tour",
      location: "Istanbul, Turkey",
      duration: "7 Days",
      bookings: 41,
      price: "PKR 145,000",
      status: "Active",
    },
    {
      id: 5,
      name: "Naran Kaghan Explorer",
      location: "Naran, Pakistan",
      duration: "4 Days",
      bookings: 29,
      price: "PKR 28,000",
      status: "Inactive",
    },
  ];

  const filteredTours = tours.filter((tour) =>
    `${tour.name} ${tour.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>

          <h1 className="section-title">Tours</h1>

          <p className="section-subtitle">
            Manage travel tours, destinations and tour packages.
          </p>
        </div>

        <button className="admin-primary-button">
          + Add New Tour
        </button>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search tours or destinations..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Destinations</option>
          <option>Pakistan</option>
          <option>UAE</option>
          <option>Turkey</option>
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
            <h2>Tour List</h2>
            <p>{filteredTours.length} tours found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tour</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Bookings</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTours.map((tour) => (
                <tr key={tour.id}>
                  <td>
                    <div className="admin-hotel-name">
                      <div className="admin-hotel-icon">🌍</div>

                      <div>
                        <strong>{tour.name}</strong>
                        <span>Tour ID: #{tour.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{tour.location}</td>

                  <td>{tour.duration}</td>

                  <td>{tour.bookings}</td>

                  <td>
                    <strong>{tour.price}</strong>
                  </td>

                  <td>
                    <span
                      className={`admin-status ${
                        tour.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {tour.status}
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

        {filteredTours.length === 0 && (
          <div className="admin-empty-state">
            <div>🌍</div>

            <h3>No tours found</h3>

            <p>
              Try searching with a different tour or destination.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tours;