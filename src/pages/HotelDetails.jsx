import hotelService from "../services/hotelService.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotel() {
      try {
        setLoading(true);
        setError("");

      const data = await hotelService.getHotelById(id);

if (!data.success || !data.hotel) {
  throw new Error(data.message || "Hotel nahi mila.");
}

setHotel(data.hotel);

      } catch (err) {
        setError(err.message || "Hotel load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchHotel();
    } else {
      setError("Hotel ID nahi mili.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <main className="hotel-details-page">
        <section className="section">
          <div className="container">
            <p>Loading hotel details...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !hotel) {
    return (
      <main className="hotel-details-page">
        <section className="section">
          <div className="container">
            <h1>Hotel details unavailable</h1>
            <p>{error || "Hotel nahi mila."}</p>
            <Link to="/hotels">Back to Hotels</Link>
          </div>
        </section>
      </main>
    );
  }

  const price = Number(hotel.pricePerNight || 0);
  const amenities = hotel.amenities || [];

  const images = [
    hotel.image,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
  ];

  return (
    <main className="hotel-details-page">
      <section className="section">
        <div className="container">
          <div className="hotel-details-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/hotels">Hotels</Link>
            <span>/</span>
            <strong>{hotel.name}</strong>
          </div>

          <div className="hotel-details-gallery">
            <div className="hotel-main-image">
              <img src={images[0]} alt={hotel.name} />
            </div>

            <div className="hotel-small-images">
              {images.slice(1).map((image, index) => (
                <div key={image}>
                  <img
                    src={image}
                    alt={`${hotel.name} view ${index + 2}`}
                  />
                </div>
              ))}

              <div>
                <img src={images[0]} alt={`${hotel.name} exterior`} />
              </div>
            </div>
          </div>

          <div className="hotel-details-layout">
            <div className="hotel-details-content">
              <div className="hotel-details-heading">
                <div>
                  <span className="hotel-details-location">
                    📍 {hotel.location}
                  </span>

                  <h1>{hotel.name}</h1>

                  <div className="hotel-details-rating">
                    <span>★ {hotel.rating ?? 0}</span>
                    <span>
                      {hotel.reviews ?? 0} reviews
                    </span>
                  </div>
                </div>
              </div>

              <p className="hotel-details-description">
                {hotel.description ||
                  "Enjoy a comfortable stay with StaySphere."}
              </p>

              <div className="hotel-details-section">
                <h2>About this hotel</h2>
                <p>
                  {hotel.description ||
                    `${hotel.name} offers accommodation in ${hotel.location}.`}
                </p>
              </div>

              <div className="hotel-details-section">
                <h2>Popular facilities</h2>

                <div className="hotel-facilities">
                  {amenities.length > 0 ? (
                    amenities.map((amenity) => (
                      <span key={amenity}>✓ {amenity}</span>
                    ))
                  ) : (
                    <span>Facilities information coming soon.</span>
                  )}
                </div>
              </div>

              <div className="hotel-details-section">
                <h2>Guest reviews</h2>

                <div className="hotel-review-summary">
                  <strong>{hotel.rating ?? 0}</strong>

                  <div>
                    <span>★★★★★</span>
                    <p>
                      {hotel.reviews ?? 0} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hotel-booking-card">
              <span className="hotel-booking-label">
                Starting from
              </span>

              <div className="hotel-booking-price">
                <strong>PKR {price.toLocaleString()}</strong>
                <span>/ night</span>
              </div>

              <div className="hotel-booking-info">
                <div>
                  <span>Check-in</span>
                  <strong>Select date</strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>Select date</strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>2 Guests</strong>
                </div>
              </div>

              <Link
  to="/booking"
  state={{
    hotel: {
      id: hotel._id,
      name: hotel.name,
      location: hotel.location,
      pricePerNight: hotel.pricePerNight,
    },
  }}
  className="hotel-reserve-button"
>
  Reserve Now
</Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HotelDetails;