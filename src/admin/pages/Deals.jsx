import { useState } from "react";

function Deals() {
  const [search, setSearch] = useState("");

  const deals = [
    {
      id: 1,
      title: "Summer Hotel Escape",
      hotel: "Serena Hotel Islamabad",
      discount: "25% OFF",
      validUntil: "30 Nov 2026",
      bookings: 128,
      status: "Active",
    },
    {
      id: 2,
      title: "Lahore Weekend Deal",
      hotel: "Pearl Continental Lahore",
      discount: "20% OFF",
      validUntil: "15 Dec 2026",
      bookings: 94,
      status: "Active",
    },
    {
      id: 3,
      title: "Dubai Luxury Offer",
      hotel: "Grand Millennium Dubai",
      discount: "30% OFF",
      validUntil: "31 Dec 2026",
      bookings: 76,
      status: "Active",
    },
    {
      id: 4,
      title: "Swat Winter Special",
      hotel: "Swat Serena Hotel",
      discount: "15% OFF",
      validUntil: "20 Dec 2026",
      bookings: 43,
      status: "Expired",
    },
  ];

  const filteredDeals = deals.filter((deal) =>
    `${deal.title} ${deal.hotel}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>

          <h1 className="section-title">Deals</h1>

          <p className="section-subtitle">
            Create and manage special offers and promotional deals.
          </p>
        </div>

        <button className="admin-primary-button">
          + Add New Deal
        </button>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search deals or hotels..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Deal List</h2>
            <p>{filteredDeals.length} deals found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Hotel</th>
                <th>Discount</th>
                <th>Valid Until</th>
                <th>Bookings</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id}>
                  <td>
                    <div className="admin-hotel-name">
                      <div className="admin-hotel-icon">🎟️</div>

                      <div>
                        <strong>{deal.title}</strong>
                        <span>Deal ID: #{deal.id}</span>
                      </div>
                    </div>
                  </td>

                  <td>{deal.hotel}</td>

                  <td>
                    <strong className="admin-discount">
                      {deal.discount}
                    </strong>
                  </td>

                  <td>{deal.validUntil}</td>

                  <td>{deal.bookings}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        deal.status === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {deal.status}
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

        {filteredDeals.length === 0 && (
          <div className="admin-empty-state">
            <div>🎟️</div>

            <h3>No deals found</h3>

            <p>
              Try searching with a different deal or hotel name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Deals;