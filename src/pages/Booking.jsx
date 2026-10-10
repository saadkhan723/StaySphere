
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bookingService from "../services/bookingService.js";

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const tourBooking = location.state?.tour || null;
  const selectedHotel = location.state?.hotel || null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
    notes: "",
  });

  const roomPrice = Number(selectedHotel?.pricePerNight || 25000);

  const checkInDate = formData.checkIn
    ? new Date(`${formData.checkIn}T00:00:00`)
    : null;

  const checkOutDate = formData.checkOut
    ? new Date(`${formData.checkOut}T00:00:00`)
    : null;

  const nights =
    checkInDate && checkOutDate && checkOutDate > checkInDate
      ? Math.ceil(
          (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const taxes = 2500 * Number(formData.rooms);

  const total =
    roomPrice * Number(formData.rooms) * (nights || 1) + taxes;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const hotelId = selectedHotel?._id || selectedHotel?.id;

    if (!hotelId) {
      alert("Please select a hotel from the hotel details page.");
      return;
    }

    try {
      const data = await bookingService.createBooking({
        hotel: hotelId,
        guestName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: Number(formData.guests),
        rooms: Number(formData.rooms),
        notes: formData.notes.trim(),
      });

      if (!data?.success || !data?.booking?._id) {
        throw new Error(data?.message || "Booking could not be saved.");
      }

      navigate("/booking-confirmation", {
        state: {
          booking: {
            ...data.booking,
            hotelName:
              data.booking.hotel?.name || selectedHotel.name,
            location:
              data.booking.hotel?.location || selectedHotel.location,
          },
        },
      });
    } catch (error) {
      alert(error.message || "Booking save nahi ho saki.");
    }
  };

  return (
    <main className="booking-page">
      <section className="section">
        <div className="container">
          <div className="booking-breadcrumb">
            <Link to="/hotels">Hotels</Link>
            <span>/</span>
            <strong>Booking</strong>
          </div>

          <div className="booking-layout">
            <form
              className="booking-form-card"
              onSubmit={handleSubmit}
            >
              <h1>Complete Your Booking</h1>

              <p className="booking-subtitle">
                Enter your details to reserve your stay at StaySphere.
              </p>

              <div className="booking-section">
                <h2>Guest Information</h2>

                <div className="booking-form-grid">
                  <div className="booking-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="booking-section">
                <h2>Stay Details</h2>

                <div className="booking-form-grid">
                  <div className="booking-field">
                    <label htmlFor="checkIn">Check-in</label>
                    <input
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={formData.checkIn}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="checkOut">Check-out</label>
                    <input
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      min={formData.checkIn || new Date().toLocaleDateString("en-CA")}
                      value={formData.checkOut}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="booking-field">
                    <label htmlFor="guests">Guests</label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  <div className="booking-field">
                    <label htmlFor="rooms">Rooms</label>
                    <select
                      id="rooms"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                    >
                      <option value="1">1 Room</option>
                      <option value="2">2 Rooms</option>
                      <option value="3">3 Rooms</option>
                      <option value="4">4 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="booking-section">
                <h2>Special Requests</h2>

                <div className="booking-field">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    placeholder="Any special requests?"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="booking-submit-button"
              >
                Confirm Booking
              </button>
            </form>

            <aside className="booking-summary-card">
              <span className="booking-summary-label">
                Your stay
              </span>

              <h2>{selectedHotel?.name || "Select a hotel"}</h2>

              <p className="booking-summary-location">
                {selectedHotel?.location || "Choose a hotel to continue"}
              </p>

              <div className="booking-summary-details">
                <div>
                  <span>Check-in</span>
                  <strong>{formData.checkIn || "Select date"}</strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>{formData.checkOut || "Select date"}</strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>
                    {formData.guests}{" "}
                    {Number(formData.guests) === 1 ? "Guest" : "Guests"}
                  </strong>
                </div>

                <div>
                  <span>Rooms</span>
                  <strong>
                    {formData.rooms}{" "}
                    {Number(formData.rooms) === 1 ? "Room" : "Rooms"}
                  </strong>
                </div>

                <div>
                  <span>Nights</span>
                  <strong>{nights}</strong>
                </div>
              </div>

              <div className="booking-price-breakdown">
                <div>
                  <span>Price per night</span>
                  <strong>PKR {roomPrice.toLocaleString()}</strong>
                </div>

                <div>
                  <span>Room charges</span>
                  <strong>
                    PKR {(roomPrice * Number(formData.rooms) * (nights || 1)).toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Taxes &amp; fees</span>
                  <strong>PKR {taxes.toLocaleString()}</strong>
                </div>

                <div className="booking-total">
                  <span>Total</span>
                  <strong>PKR {total.toLocaleString()}</strong>
                </div>
              </div>

              <p className="booking-secure">
                🔒 Secure booking · No payment required yet
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Booking;
