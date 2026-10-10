
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AddHotel() {
  const navigate = useNavigate();
  const routeLocation = useLocation();
  const existingHotel = routeLocation.state?.hotel;
  const isEditing = Boolean(existingHotel?._id);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    rating: "",
    rooms: "",
    facilities: "",
    status: "Active",
    image: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existingHotel) {
      setFormData({
        name: existingHotel.name || "",
        location: existingHotel.location || "",
        description: existingHotel.description || "",
        price: existingHotel.pricePerNight ?? "",
        rating: existingHotel.rating ?? "",
        rooms: existingHotel.rooms ?? "",
        facilities: Array.isArray(existingHotel.amenities)
          ? existingHotel.amenities.join(", ")
          : existingHotel.facilities || "",
        status: existingHotel.status || "Active",
        image: existingHotel.image || "",
      });
    }
  }, [existingHotel]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.location.trim() ||
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("Please enter the hotel name, location, and a valid price.");
      return;
    }

    if (
      formData.rating !== "" &&
      (Number(formData.rating) < 0 || Number(formData.rating) > 5)
    ) {
      setError("Rating must be between 0 and 5.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
      pricePerNight: Number(formData.price),
      rating: formData.rating === "" ? 0 : Number(formData.rating),
      image: formData.image.trim(),
      amenities: formData.facilities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);

      const response = await fetch(
        isEditing
          ? `http://localhost:5000/api/hotels/${existingHotel._id}`
          : "http://localhost:5000/api/hotels",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Hotel save nahi ho saka.");
      }

      navigate("/admin/hotels");
    } catch (err) {
      setError(err.message || "Backend se connection nahi ho saka.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">HOTEL MANAGEMENT</span>
          <h1 className="section-title">
            {isEditing ? "Edit Hotel" : "Add New Hotel"}
          </h1>
          <p className="section-subtitle">
            {isEditing
              ? "Update the details of this hotel."
              : "Add a new hotel to the StaySphere platform."}
          </p>
        </div>
      </div>

      <form className="admin-add-form" onSubmit={handleSubmit}>
        {error && (
          <div className="admin-form-error" role="alert">
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
              <label htmlFor="name">Hotel Name *</label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Serena Hotel Islamabad"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Islamabad, Pakistan"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="price">Price Per Night (PKR) *</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="25000"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="rating">Rating (0–5)</label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                placeholder="4.8"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="rooms">Total Rooms</label>
              <input
                id="rooms"
                name="rooms"
                type="number"
                min="0"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="100"
              />
            </div>

            <div className="admin-form-field">
              <label htmlFor="status">Status</label>
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
              <label htmlFor="image">Hotel Image URL</label>
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/hotel.jpg"
              />
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="facilities">Facilities</label>
              <input
                id="facilities"
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
                placeholder="WiFi, Swimming Pool, Parking, Restaurant"
              />
            </div>

            <div className="admin-form-field admin-form-full">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the hotel..."
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
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Add Hotel"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHotel;
