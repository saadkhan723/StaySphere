import { Link } from "react-router-dom";

function PopularTours() {
  const tours = [
    {
      id: 1,
      title: "Hunza Valley Adventure",
      location: "Hunza, Pakistan",
      duration: "5 Days",
      price: "PKR 45,000",
      image:
        "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 2,
      title: "Swat Valley Escape",
      location: "Swat, Pakistan",
      duration: "3 Days",
      price: "PKR 28,000",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    },

    {
      id: 3,
      title: "Dubai City Experience",
      location: "Dubai, UAE",
      duration: "4 Days",
      price: "PKR 85,000",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="section popular-tours">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Popular Tours</h2>

          <p className="section-subtitle">
            Discover amazing destinations and unforgettable experiences.
          </p>
        </div>

        <div className="tours-grid">
          {tours.map((tour) => (
            <div className="tour-card" key={tour.id}>
              <div className="tour-image">
                <img src={tour.image} alt={tour.title} />
              </div>

              <div className="tour-content">
                <span className="tour-location">
                  📍 {tour.location}
                </span>

                <h3>{tour.title}</h3>

                <p className="tour-duration">
                  🕒 {tour.duration}
                </p>

                <div className="tour-bottom">
                  <div>
                    <strong>{tour.price}</strong>
                    <span> / person</span>
                  </div>

                  <Link
                    to={`/tour/${tour.id}`}
                    className="tour-button"
                  >
                    View Tour
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

export default PopularTours;