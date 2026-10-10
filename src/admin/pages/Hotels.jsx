
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // MongoDB se hotels load karo
  const fetchHotels = async () => {
    try {
      setError("");

      const response = await fetch("http://localhost:5000/api/hotels");

      if (!response.ok) {
        throw new Error("Hotels load nahi ho sake.");
      }

      const data = await response.json();
      setHotels(data.hotels || []);
    } catch (err) {
      setError(err.message || "Server se connection nahi ho saka.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Hotel delete karo
  const handleDelete = async (hotel) => {
    const confirmed = window.confirm(
      `Kya aap "${hotel.name}" ko permanently delete karna chahte hain?`
    );

    if (!confirmed) return;

    setDeletingId(hotel._id);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels/${hotel._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hotel delete nahi ho saka.");
      }

      // List se deleted hotel hatao
      setHotels((currentHotels) =>
        currentHotels.filter((item) => item._id !== hotel._id)
      );
    } catch (err) {
      setError(err.message || "Hotel delete karte waqt error aaya.");
    } finally {
      setDeletingId(null);
    }
  };

  const locations = [
    "All Locations",
    ...new Set(
      hotels
        .map((hotel) => (hotel.location || "").split(",")[0].trim())
        .filter(Boolean)
    ),
  ];

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = `${hotel.name || ""} ${hotel.location || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const city = (hotel.location || "").split(",")[0].trim();

    const matchesLocation =
      locationFilter === "All Locations" || city === locationFilter;

    return matchesSearch && matchesLocation;
  });

  const formatPKR = (price) =>
    `PKR ${Number(price || 0).toLocaleString("en-PK")}`;

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

        <select
          value={locationFilter}
          onChange={(event) => setLocationFilter(event.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" style={{ color: "red", marginBottom: "16px" }}>
          {error}
        </p>
      )}

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Hotel List</h2>
            <p>
              {loading
                ? "Loading hotels..."
                : `${filteredHotels.length} hotels found`}
            </p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Price / Night</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filteredHotels.map((hotel) => (
                  <tr key={hotel._id}>
                    <td>
                      <div className="admin-hotel-name">
                        <div className="admin-hotel-icon">🏨</div>
                        <div>
                          <strong>{hotel.name}</strong>
                          <span>Hotel ID: {hotel._id}</span>
                        </div>
                      </div>
                    </td>

                    <td>{hotel.location || "N/A"}</td>

                    <td>
                      <span className="admin-rating">
                        ⭐ {hotel.rating ?? "N/A"}
                      </span>
                    </td>

                    <td>
                      <strong>{formatPKR(hotel.pricePerNight)}</strong>
                    </td>

                    <td>
                      <div className="admin-actions">
                        <button
                          type="button"
                          title="View on website"
                          onClick={() => navigate(`/hotel/${hotel._id}`)}
                        >
                          👁️
                        </button>

                        <button
                          type="button"
                          title="Edit hotel"
                          onClick={() =>
                            navigate("/admin/hotels/add", {
                              state: { hotel },
                            })
                          }
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          title="Delete hotel"
                          disabled={deletingId === hotel._id}
                          onClick={() => handleDelete(hotel)}
                          style={{
                            color: "#dc2626",
                            opacity: deletingId === hotel._id ? 0.5 : 1,
                            cursor:
                              deletingId === hotel._id
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {deletingId === hotel._id ? "⏳" : "🗑️"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!loading && filteredHotels.length === 0 && !error && (
          <div className="admin-empty-state">
            <div>🏨</div>
            <h3>No hotels found</h3>
            <p>Try another hotel name or location.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;
