
import { Link } from "react-router-dom";

function PopularDestinations() {
  const destinations = [
    {
      name: "Islamabad",
      description: "Home of the iconic Faisal Mosque",
      image:
        "https://images.unsplash.com/photo-1605795733251-a0b6c96d9dea?auto=format&fit=crop&w=1600&h=600&q=80",
    },
    {
      name: "Lahore",
      description: "Home of the historic Badshahi Mosque",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Dubai",
      description: "Luxury & modern travel",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Istanbul",
      description: "History meets modern life",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="section popular-destinations">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Explore popular places and find your perfect stay.
          </p>
        </div>

        <div className="destination-grid">
          {destinations.map((destination) => (
            <Link
              to={`/hotels?destination=${encodeURIComponent(destination.name)}`}
              className="destination-card"
              key={destination.name}
              aria-label={`Explore hotels in ${destination.name}`}
            >
              <div className="destination-image">
                <img
                  src={destination.image}
                  alt={destination.name}
                />
              </div>

              <div className="destination-content">
                <span>{destination.name}</span>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;