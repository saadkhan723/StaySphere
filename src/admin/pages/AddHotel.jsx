import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddHotel() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    rating: "",
    rooms: "",
    facilities: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.price ||
      !formData.rooms
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    alert("Hotel added successfully.");

    navigate("/admin/hotels");
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">HOTEL MANAGEMENT</span>
          <h1 className="section-title">Add New Hotel</h1>
          <p className="section-subtitle">
            Add a new hotel to the StaySphere platform.
          </p>
        </div>
      </div>

      <form className="admin-add-form" onSubmit={handleSubmit}>
        {error && (
          <div className="admin-form-error">
            {error}
          </div>
        )}

        <div className="admin-form-card">
          <div className="admin-settings-header">
            <h2>Hotel Information</h2>
            <p>Enter the basic information about the hotel.</p>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-field">
              <label htmlFor="name">
                Hotel Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Serena Hotel Islamabad"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="location">
                Location *
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Islamabad, Pakistan"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="price">
                Price Per Night (PKR) *
              </label>

              <input
                id="price"
                name="price"
                type="number"
                placeholder="25000"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="rating">
                Rating
              </label>

              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="4.8"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="rooms">
                Total Rooms *
              </label>

              <input
                id="rooms"
                name="rooms"
                type="number"
                placeholder="100"
                value={formData.rooms}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="facilities">
                Facilities
              </label>

              <input
                id="facilities"
                name="facilities"
                type="text"
                placeholder="WiFi, Swimming Pool, Parking, Restaurant"
                value={formData.facilities}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Write a short description about the hotel..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-cancel-button"
            onClick={() => navigate("/admin/hotels")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="admin-primary-button"
          >
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHotel;