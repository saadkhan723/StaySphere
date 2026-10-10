import { Link } from "react-router-dom";

function RecommendedHotels() {
  const hotels = [
    {
      id: 1,
      name: "Serena Hotel Islamabad",
      location: "Islamabad, Pakistan",
      rating: "4.8",
      price: "PKR 25,000",
      facilities: "Free WiFi • Breakfast • Pool",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Pearl Continental Lahore",
      location: "Lahore, Pakistan",
      rating: "4.7",
      price: "PKR 22,000",
      facilities: "Free WiFi • Parking • Restaurant",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Grand Millennium Dubai",
      location: "Dubai, UAE",
      rating: "4.6",
      price: "PKR 32,000",
      facilities: "Free WiFi • Gym • Airport Shuttle",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="section recommended-hotels">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Recommended Hotels</h2>

          <p className="section-subtitle">
            Handpicked stays for a comfortable and memorable journey.
          </p>
        </div>

        <div className="hotel-preview-grid">
          {hotels.map((hotel) => (
            <div className="hotel-preview-card" key={hotel.id}>

              <div className="hotel-preview-image">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                />

                <button className="hotel-wishlist">
                  ♡
                </button>

              </div>

              <div className="hotel-preview-content">

                <div className="hotel-rating">
                  ★ {hotel.rating}
                </div>

                <h3>{hotel.name}</h3>

                <p className="hotel-location">
                  📍 {hotel.location}
                </p>

                <p className="hotel-facilities">
                  {hotel.facilities}
                </p>

                <div className="hotel-card-bottom">

                  <div className="hotel-price">
                    <strong>{hotel.price}</strong>
                    <span> / night</span>
                  </div>

                  <Link
                    to={`/hotel/${hotel.id}`}
                    className="hotel-details-button"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedHotels;