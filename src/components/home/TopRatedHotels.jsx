import { Link } from "react-router-dom";

function TopRatedHotels() {
  const hotels = [
    {
      id: 1,
      name: "The Centaurus Hotel",
      location: "Islamabad, Pakistan",
      rating: "4.9",
      reviews: "324 reviews",
      price: "PKR 28,000",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Avari Hotel",
      location: "Lahore, Pakistan",
      rating: "4.8",
      reviews: "287 reviews",
      price: "PKR 24,000",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "Atlantis Resort",
      location: "Dubai, UAE",
      rating: "4.9",
      reviews: "512 reviews",
      price: "PKR 45,000",
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="section top-rated-hotels">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Top Rated Hotels</h2>

          <p className="section-subtitle">
            Highly rated stays loved by travelers.
          </p>
        </div>

        <div className="top-rated-grid">
          {hotels.map((hotel) => (
            <div className="top-rated-card" key={hotel.id}>
              
              <div className="top-rated-image">
                <img src={hotel.image} alt={hotel.name} />
              </div>

              <div className="top-rated-content">
                <div className="top-rated-rating">
                  ★ {hotel.rating}
                </div>

                <h3>{hotel.name}</h3>

                <p className="top-rated-location">
                  📍 {hotel.location}
                </p>

                <p className="top-rated-reviews">
                  {hotel.reviews}
                </p>

                <div className="top-rated-bottom">
                  <div>
                    <strong>{hotel.price}</strong>
                    <span> / night</span>
                  </div>

                  <Link
                    to={`/hotel/${hotel.id}`}
                    className="top-rated-button"
                  >
                    View Hotel
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

export default TopRatedHotels;