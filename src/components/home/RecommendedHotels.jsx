
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hotelService from "../../services/hotelService.js";

function RecommendedHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await hotelService.getHotels();
        setHotels(response.hotels || []);
      } catch (err) {
        setError(err.message || "Hotels load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
    <section className="section recommended-hotels">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Recommended Hotels</h2>
          <p className="section-subtitle">
            Handpicked stays for a comfortable and memorable journey.
          </p>
        </div>

        {loading && <p>Hotels load ho rahe hain...</p>}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && hotels.length === 0 && (
          <p>Abhi koi hotel available nahi hai.</p>
        )}

        {!loading && !error && hotels.length > 0 && (
          <div className="hotel-preview-grid">
            {hotels.map((hotel) => (
              <div className="hotel-preview-card" key={hotel._id}>
                <div className="hotel-preview-image">
                  <img
                    src={
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={hotel.name}
                  />
                  <button
                    className="hotel-wishlist"
                    type="button"
                    aria-label={`Add ${hotel.name} to wishlist`}
                  >
                    ♡
                  </button>
                </div>

                <div className="hotel-preview-content">
                  <div className="hotel-rating">
                    ★ {Number(hotel.rating || 0).toFixed(1)}
                  </div>

                  <h3>{hotel.name}</h3>

                  <p className="hotel-location">
                    📍 {hotel.location}
                  </p>

                  <p className="hotel-facilities">
                    {hotel.amenities?.length
                      ? hotel.amenities.join(" • ")
                      : "Comfortable stay"}
                  </p>

                  <div className="hotel-card-bottom">
                    <div className="hotel-price">
                      <strong>
                        PKR {Number(hotel.pricePerNight).toLocaleString()}
                      </strong>
                      <span> / night</span>
                    </div>

                    <Link
                      to={`/hotel/${hotel._id}`}
                      className="hotel-details-button"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default RecommendedHotels;
