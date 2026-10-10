
import { Link, useLocation } from "react-router-dom";

function BookingConfirmation() {
  const { state } = useLocation();

  const booking = state?.booking || state || null;

  const hotel =
    booking && typeof booking.hotel === "object"
      ? booking.hotel
      : null;

  const hotelName =
    hotel?.name || booking?.hotelName || "Hotel reservation";

  const location =
    hotel?.location || booking?.location || "Not available";

  const bookingId = booking?._id || booking?.id || "";

  const formatDate = (date) => {
    if (!date) return "Not selected";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPKR = (amount) =>
    `PKR ${Number(amount || 0).toLocaleString("en-PK")}`;

  // Agar actual booking data nahi hai to fake confirmation na dikhayein
  if (!booking || !bookingId) {
    return (
      <main className="confirmation-page">
        <section className="section">
          <div className="container">
            <div className="confirmation-card">
              <div className="confirmation-icon">!</div>

              <h1>Booking details unavailable</h1>

              <p className="confirmation-message">
                Booking confirmation details nahi mil sakin.
                Agar aapne booking submit ki hai, to My Bookings
                page par apni reservation check karein.
              </p>

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
                  Explore Hotels
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const status = booking.status || "Pending";

  return (
    <main className="confirmation-page">
      <section className="section">
        <div className="container">
          <div className="confirmation-card">
            <div className="confirmation-icon">
              {status === "Confirmed" ? "✓" : "✓"}
            </div>

            <span className="confirmation-label">
              Booking Request Received
            </span>

            <h1>Your reservation details</h1>

            <p className="confirmation-message">
              Thank you for choosing StaySphere,
              {" "}
              <strong>{booking.guestName || "Guest"}</strong>.
              Your booking request has been saved successfully.
            </p>

            <div className="confirmation-booking-id">
              <span>Booking Reference</span>
              <strong>
                STY-{bookingId.slice(-8).toUpperCase()}
              </strong>
            </div>

            <div className="confirmation-details">
              <div>
                <span>Hotel</span>
                <strong>{hotelName}</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>{location}</strong>
              </div>

              <div>
                <span>Guest</span>
                <strong>{booking.guestName || "N/A"}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{booking.email || "N/A"}</strong>
              </div>

              <div>
                <span>Check-in</span>
                <strong>{formatDate(booking.checkIn)}</strong>
              </div>

              <div>
                <span>Check-out</span>
                <strong>{formatDate(booking.checkOut)}</strong>
              </div>

              <div>
                <span>Guests</span>
                <strong>{Number(booking.guests || 1)}</strong>
              </div>

              <div>
                <span>Rooms</span>
                <strong>{Number(booking.rooms || 1)}</strong>
              </div>

              <div>
                <span>Room price per night</span>
                <strong>{formatPKR(booking.roomPrice)}</strong>
              </div>

              <div>
                <span>Taxes</span>
                <strong>{formatPKR(booking.taxes)}</strong>
              </div>

              <div>
                <span>Total amount</span>
                <strong>{formatPKR(booking.total)}</strong>
              </div>

              <div>
                <span>Booking status</span>
                <strong>{status}</strong>
              </div>
            </div>

            {booking.notes && (
              <p className="confirmation-note">
                <strong>Special requests:</strong> {booking.notes}
              </p>
            )}

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
              Keep your booking reference for future enquiries.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BookingConfirmation;
