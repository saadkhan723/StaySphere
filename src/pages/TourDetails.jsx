import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function TourDetails() {
  const { id } = useParams();

  const tours = {
    1: {
      title: "Hunza Valley Adventure",
      location: "Hunza, Pakistan",
      rating: "4.9",
      reviews: "124 reviews",
      price: 45000,
      duration: "5 Days / 4 Nights",
      groupSize: "Up to 12",
      type: "Adventure",
      language: "English / Urdu",
      description:
        "Explore the breathtaking mountains, beautiful lakes, peaceful valleys, and rich culture of Hunza on an unforgettable adventure.",
      about:
        "Experience the beauty of Hunza Valley with its spectacular mountains, crystal-clear lakes, historic forts, local villages, and breathtaking landscapes. This tour is designed for travelers who want to explore nature and experience the local culture.",
      images: [
        "https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=900&q=80",
      ],
      highlights: [
        "Attabad Lake",
        "Baltit Fort",
        "Passu Cones",
        "Khunjerab Pass",
        "Local Food Experience",
        "Mountain Views",
      ],
      included: [
        "Hotel accommodation",
        "Daily breakfast",
        "Private transport",
        "Tour guide",
        "Entry tickets",
        "Airport / hotel transfer",
      ],
      itinerary: [
        {
          day: "Day 1",
          text: "Arrival in Hunza and hotel check-in.",
        },
        {
          day: "Day 2",
          text: "Explore Karimabad, Baltit Fort and local markets.",
        },
        {
          day: "Day 3",
          text: "Visit Attabad Lake and Passu Valley.",
        },
        {
          day: "Day 4",
          text: "Explore Khunjerab Pass and surrounding areas.",
        },
        {
          day: "Day 5",
          text: "Breakfast, final sightseeing and departure.",
        },
      ],
    },

    2: {
      title: "Swat Valley Escape",
      location: "Swat, Pakistan",
      rating: "4.8",
      reviews: "98 reviews",
      price: 28000,
      duration: "3 Days / 2 Nights",
      groupSize: "Up to 15",
      type: "Nature",
      language: "English / Urdu",
      description:
        "Discover the beautiful mountains, rivers, forests, and peaceful landscapes of Swat Valley.",
      about:
        "Enjoy a relaxing journey through Swat Valley and explore its beautiful scenery, local culture, rivers, and mountain villages.",
      images: [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=900&q=80",
      ],
      highlights: [
        "Mingora",
        "Malam Jabba",
        "Kalam Valley",
        "Swat River",
        "Local Food",
        "Mountain Views",
      ],
      included: [
        "Hotel accommodation",
        "Breakfast",
        "Private transport",
        "Tour guide",
        "Sightseeing",
        "Hotel transfer",
      ],
      itinerary: [
        {
          day: "Day 1",
          text: "Arrival in Swat and sightseeing around Mingora.",
        },
        {
          day: "Day 2",
          text: "Visit Malam Jabba and explore the surrounding mountains.",
        },
        {
          day: "Day 3",
          text: "Explore Kalam Valley and departure.",
        },
      ],
    },

    3: {
      title: "Dubai City Experience",
      location: "Dubai, UAE",
      rating: "4.7",
      reviews: "156 reviews",
      price: 85000,
      duration: "4 Days / 3 Nights",
      groupSize: "Up to 10",
      type: "City Tour",
      language: "English / Urdu",
      description:
        "Explore Dubai's iconic landmarks, modern attractions, luxury shopping destinations, and unforgettable experiences.",
      about:
        "Experience the best of Dubai with visits to iconic landmarks, beautiful beaches, modern architecture, shopping destinations, and exciting city attractions.",
      images: [
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=900&q=80",
      ],
      highlights: [
        "Burj Khalifa",
        "Dubai Marina",
        "Palm Jumeirah",
        "Dubai Mall",
        "Desert Safari",
        "Jumeirah Beach",
      ],
      included: [
        "Hotel accommodation",
        "Daily breakfast",
        "Private transport",
        "Tour guide",
        "Entry tickets",
        "Airport transfer",
      ],
      itinerary: [
        {
          day: "Day 1",
          text: "Arrival in Dubai, hotel check-in and evening city tour.",
        },
        {
          day: "Day 2",
          text: "Visit Burj Khalifa, Dubai Mall and Downtown Dubai.",
        },
        {
          day: "Day 3",
          text: "Explore Palm Jumeirah, Marina and enjoy a desert safari.",
        },
        {
          day: "Day 4",
          text: "Breakfast, final sightseeing and departure.",
        },
      ],
    },
  };

  const tour = tours[id] || tours[1];

  const [selectedDuration, setSelectedDuration] = useState(
    tour.duration
  );
  const [selectedGroupSize, setSelectedGroupSize] = useState("2");
  const [selectedType, setSelectedType] = useState(tour.type);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [activeImage, setActiveImage] = useState(0);

  const [isWishlisted, setIsWishlisted] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem(
        "staysphere-tour-wishlist"
      );

      if (!savedWishlist) return false;

      const wishlist = JSON.parse(savedWishlist);

      return wishlist.some((item) => item.id === Number(id));
    } catch {
      return false;
    }
  });

  const toggleWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem(
        "staysphere-tour-wishlist"
      );

      const wishlist = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      const tourId = Number(id);

      const alreadySaved = wishlist.some(
        (item) => item.id === tourId
      );

      let updatedWishlist;

      if (alreadySaved) {
        updatedWishlist = wishlist.filter(
          (item) => item.id !== tourId
        );
      } else {
        updatedWishlist = [
          ...wishlist,
          {
            id: tourId,
            title: tour.title,
            location: tour.location,
            price: tour.price,
            rating: tour.rating,
            reviews: tour.reviews,
            image: tour.images[0],
          },
        ];
      }

      localStorage.setItem(
        "staysphere-tour-wishlist",
        JSON.stringify(updatedWishlist)
      );

      setIsWishlisted(!alreadySaved);
    } catch (error) {
      console.error("Unable to update wishlist:", error);
    }
  };

  return (
    <main className="tour-details-page">
      <section className="section">
        <div className="container">
          {/* Breadcrumb */}
          <div className="tour-details-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/tours">Tours</Link>
            <span>/</span>
            <strong>{tour.title}</strong>
          </div>

          {/* Gallery */}
          <div className="tour-details-gallery">
            <div className="tour-main-image">
              <img
                src={tour.images[activeImage]}
                alt={tour.title}
              />
            </div>

            <div className="tour-small-images">
              {tour.images.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={activeImage === index ? "active" : ""}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View tour image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${tour.title} view ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="tour-details-layout">
            <div className="tour-details-content">
              {/* Heading */}
              <div className="tour-details-heading">
                <div>
                  <span className="tour-details-location">
                    📍 {tour.location}
                  </span>

                  <h1>{tour.title}</h1>

                  <div className="tour-details-rating">
                    <span>★ {tour.rating}</span>
                    <span>{tour.reviews}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`tour-details-wishlist ${
                    isWishlisted ? "active" : ""
                  }`}
                  onClick={toggleWishlist}
                  aria-label={
                    isWishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >
                  {isWishlisted ? "♥" : "♡"}
                </button>
              </div>

              <p className="tour-details-description">
                {tour.description}
              </p>

              {/* Select Tour Options */}
              <div className="tour-details-highlights">
                <div>
                  <span>Duration</span>
                  <select
                    value={selectedDuration}
                    onChange={(e) =>
                      setSelectedDuration(e.target.value)
                    }
                  >
                    {[
                      ...new Set([
                        tour.duration,
                        "2 Days / 1 Night",
                        "3 Days / 2 Nights",
                        "5 Days / 4 Nights",
                        "7 Days / 6 Nights",
                      ]),
                    ].map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span>Group Size</span>
                  <select
                    value={selectedGroupSize}
                    onChange={(e) =>
                      setSelectedGroupSize(e.target.value)
                    }
                  >
                    {["2", "4", "6", "8", "10", "12", "15"].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size} People
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <span>Tour Type</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    {[
                      ...new Set([
                        tour.type,
                        "Adventure",
                        "Nature",
                        "City Tour",
                        "Cultural",
                        "Family",
                      ]),
                    ].map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span>Language</span>
                  <select
                    value={selectedLanguage}
                    onChange={(e) =>
                      setSelectedLanguage(e.target.value)
                    }
                  >
                    <option value="English">English</option>
                    <option value="Urdu">Urdu</option>
                    <option value="English / Urdu">
                      English / Urdu
                    </option>
                  </select>
                </div>
              </div>

              {/* About */}
              <div className="tour-details-section">
                <h2>About this tour</h2>
                <p>{tour.about}</p>
              </div>

              {/* Tour Highlights */}
              <div className="tour-details-section">
                <h2>Tour Highlights</h2>

                <div className="tour-highlights-list">
                  {tour.highlights.map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div className="tour-details-section">
                <h2>What's Included</h2>

                <div className="tour-included-list">
                  {tour.included.map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="tour-details-section">
                <h2>Itinerary</h2>

                <div className="tour-itinerary">
                  {tour.itinerary.map((item) => (
                    <div key={item.day}>
                      <strong>{item.day}</strong>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <aside className="tour-booking-card">
              <span className="tour-booking-label">
                Starting from
              </span>

              <div className="tour-booking-price">
                <strong>
                  PKR {tour.price.toLocaleString()}
                </strong>
                <span>/ person</span>
              </div>

              <div className="tour-booking-info">
                <div>
                  <span>Duration</span>
                  <strong>{selectedDuration}</strong>
                </div>

                <div>
                  <span>Guests</span>
                  <strong>{selectedGroupSize} People</strong>
                </div>

                <div>
                  <span>Tour Type</span>
                  <strong>{selectedType}</strong>
                </div>

                <div>
                  <span>Language</span>
                  <strong>{selectedLanguage}</strong>
                </div>

                <div>
                  <span>Availability</span>
                  <strong>Available</strong>
                </div>
              </div>

              <Link
                to="/booking"
                state={{
                  tour: {
                    id: Number(id),
                    title: tour.title,
                    location: tour.location,
                    price: tour.price,
                    duration: selectedDuration,
                    groupSize: selectedGroupSize,
                    type: selectedType,
                    language: selectedLanguage,
                    image: tour.images[0],
                  },
                }}
                className="tour-book-button"
              >
                Book This Tour
              </Link>

              <p className="tour-booking-note">
                Secure your spot · No payment required yet
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TourDetails;