import { Link, useLocation } from "react-router-dom";

function BookingConfirmation() {
  const { state } = useLocation();

  const booking = state || {
    guestName: "Guest",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    rooms: "1",
    notes: "",
    hotelName: "Serena Hotel Islamabad",
    location: "Islamabad, Pakistan",
    roomType: "Deluxe Room",
    roomPrice: 25000,
    taxes: 2500,
    total: 27500,
  };

  const formatDate = (date) => {
    if (!date) {
      return "Not selected";
    }

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <main className="confirmation-page">
      <section className="section">
        <div className="container">

          <div className="confirmation-card">

            <div className="confirmation-icon">
              ✓
            </div>

            <span className="confirmation-label">
              Booking Confirmed
            </span>

            <h1>Your stay is booked!</h1>

            <p className="confirmation-message">
              Thank you for choosing StaySphere,{" "}
              <strong>{booking.guestName}</strong>.
              Your hotel reservation has been successfully created.
            </p>

            <div className="confirmation-booking-id">
              <span>Booking ID</span>

              <strong>
                STY-{Date.now().toString().slice(-8)}
              </strong>
            </div>

            <div className="confirmation-details">

              <div>
                <span>Hotel</span>
                <strong>{booking.hotelName}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{booking.location}</strong>
              </div>

              <div>
                <span>Room</span>
                <strong>{booking.roomType}</strong>
              </div>

              <div>
                <span>Check-in</span>
                <strong>
                  {formatDate(booking.checkIn)}
                </strong>
              </div>

              <div>
                <span>Check-out</span>
                <strong>
                  {formatDate(booking.checkOut)}
                </strong>
              </div>

              <div>
                <span>Guests</span>
                <strong>
                  {booking.guests}{" "}
                  {Number(booking.guests) === 1
                    ? "Guest"
                    : "Guests"}
                </strong>
              </div>

              <div>
                <span>Rooms</span>
                <strong>
                  {booking.rooms}{" "}
                  {Number(booking.rooms) === 1
                    ? "Room"
                    : "Rooms"}
                </strong>
              </div>

              <div>
                <span>Total</span>
                <strong>
                  PKR {booking.total.toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="confirmation-actions">

              <Link
                to="/my-bookings"
                className="confirmation-primary"
              >
                View My Bookings
              </Link>

              <Link
                to="/hotels"
                className="confirmation-secondary"
              >
                Explore More Hotels
              </Link>

            </div>

            <p className="confirmation-note">
              🔒 Your reservation details are securely saved.
            </p>

          </div>

        </div>
      </section>
    </main>
  );
}

export default BookingConfirmation;