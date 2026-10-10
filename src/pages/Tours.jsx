import { useState } from "react";
import { Link } from "react-router-dom";

function Tours() {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [tourType, setTourType] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("staysphere-tour-wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const tours = [
    {
      id: 1,
      title: "Hunza Valley Adventure",
      location: "Hunza, Pakistan",
      duration: "5 Days",
      days: 5,
      price: 45000,
      rating: 4.9,
      reviews: 124,
      type: "adventure",
      image:
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=80",
      description:
        "Explore the breathtaking mountains, lakes, valleys, and beautiful culture of Hunza.",
    },
    {
      id: 2,
      title: "Swat Valley Escape",
      location: "Swat, Pakistan",
      duration: "3 Days",
      days: 3,
      price: 28000,
      rating: 4.8,
      reviews: 98,
      type: "family",
      image:
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
      description:
        "Enjoy peaceful valleys, beautiful rivers, mountains, and unforgettable views in Swat.",
    },
    {
      id: 3,
      title: "Dubai City Experience",
      location: "Dubai, UAE",
      duration: "4 Days",
      days: 4,
      price: 85000,
      rating: 4.7,
      reviews: 156,
      type: "city",
     image:
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
      description:
        "Discover Dubai's iconic attractions, modern architecture, shopping, and nightlife.",
    },
    {
      id: 4,
      title: "Istanbul Cultural Tour",
      location: "Istanbul, Türkiye",
      duration: "5 Days",
      days: 5,
      price: 120000,
      rating: 4.9,
      reviews: 143,
      type: "cultural",
      image:
        "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=900&q=80",
      description:
        "Experience historic mosques, bazaars, Bosphorus views, and the unique culture of Istanbul.",
    },
    {
      id: 5,
      title: "Naran Kaghan Escape",
      location: "Naran, Pakistan",
      duration: "4 Days",
      days: 4,
      price: 35000,
      rating: 4.8,
      reviews: 87,
      type: "adventure",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
      description:
        "Visit stunning lakes, green valleys, waterfalls, and mountain landscapes in Naran.",
    },
    {
      id: 6,
      title: "Baku City Discovery",
      location: "Baku, Azerbaijan",
      duration: "4 Days",
      days: 4,
      price: 95000,
      rating: 4.7,
      reviews: 76,
      type: "city",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=80",
      description:
        "Explore Baku's modern skyline, historic old city, coastline, and famous attractions.",
    },
  ];

  const toggleWishlist = (tour) => {
    setWishlist((currentWishlist) => {
      const alreadySaved = currentWishlist.some(
        (item) => item.id === tour.id
      );

      const updatedWishlist = alreadySaved
        ? currentWishlist.filter((item) => item.id !== tour.id)
        : [...currentWishlist, tour];

      localStorage.setItem(
        "staysphere-tour-wishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  const filteredTours = tours.filter((tour) => {
    const matchesDestination =
      !destination.trim() ||
      tour.location.toLowerCase().includes(destination.toLowerCase());

    let matchesDuration = true;

    if (duration === "1-3") {
      matchesDuration = tour.days >= 1 && tour.days <= 3;
    }

    if (duration === "4-5") {
      matchesDuration = tour.days >= 4 && tour.days <= 5;
    }

    if (duration === "6+") {
      matchesDuration = tour.days >= 6;
    }

    const matchesType =
      !tourType || tour.type === tourType;

    let matchesRating = true;

    if (rating === "5") {
      matchesRating = tour.rating >= 5;
    }

    if (rating === "4") {
      matchesRating = tour.rating >= 4;
    }

    if (rating === "3") {
      matchesRating = tour.rating >= 3;
    }

    return (
      matchesDestination &&
      matchesDuration &&
      matchesType &&
      matchesRating
    );
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  const clearFilters = () => {
    setDestination("");
    setDuration("");
    setTourType("");
    setRating("");
    setSortBy("recommended");
  };

  return (
    <main className="tours-page">
      <section className="section">
        <div className="container">

          <div className="section-heading text-center">
            <h1 className="section-title">
              Explore Amazing Tours
            </h1>

            <p className="section-subtitle">
              Discover beautiful destinations and unforgettable
              travel experiences with StaySphere.
            </p>
          </div>

          <div className="tours-page-layout">

            <aside className="tour-filters">
              <h2>Filters</h2>

              <div className="filter-group">
                <label htmlFor="destination">
                  Destination
                </label>

                <input
                  id="destination"
                  type="text"
                  placeholder="Search destination"
                  value={destination}
                  onChange={(event) =>
                    setDestination(event.target.value)
                  }
                />
              </div>

              <div className="filter-group">
                <label htmlFor="duration">
                  Duration
                </label>

                <select
                  id="duration"
                  value={duration}
                  onChange={(event) =>
                    setDuration(event.target.value)
                  }
                >
                  <option value="">All Durations</option>
                  <option value="1-3">1 - 3 Days</option>
                  <option value="4-5">4 - 5 Days</option>
                  <option value="6+">6+ Days</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="tourType">
                  Tour Type
                </label>

                <select
                  id="tourType"
                  value={tourType}
                  onChange={(event) =>
                    setTourType(event.target.value)
                  }
                >
                  <option value="">All Tour Types</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural</option>
                  <option value="family">Family</option>
                  <option value="city">City Tour</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="rating">
                  Rating
                </label>

                <select
                  id="rating"
                  value={rating}
                  onChange={(event) =>
                    setRating(event.target.value)
                  }
                >
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>
              </div>

              <button
                type="button"
                className="filter-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </aside>

            <section className="tours-results">

              <div className="tours-results-header">
                <div>
                  <h2>Popular Tours</h2>

                  <p>
                    {sortedTours.length}{" "}
                    {sortedTours.length === 1
                      ? "experience"
                      : "experiences"}{" "}
                    available
                  </p>
                </div>

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value)
                  }
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="rating">
                    Top Rated
                  </option>
                </select>
              </div>

              {sortedTours.length > 0 ? (
                <div className="tours-page-grid">
                  {sortedTours.map((tour) => {
                    const isWishlisted = wishlist.some(
                      (item) => item.id === tour.id
                    );

                    return (
                      <article
                        className="tour-page-card"
                        key={tour.id}
                      >
                        <div className="tour-page-image">
                          <img
                            src={tour.image}
                            alt={tour.title}
                          />

                          <button
                            type="button"
                            className={`tour-page-wishlist ${
                              isWishlisted ? "active" : ""
                            }`}
                            onClick={() =>
                              toggleWishlist(tour)
                            }
                            aria-label={
                              isWishlisted
                                ? `Remove ${tour.title} from wishlist`
                                : `Add ${tour.title} to wishlist`
                            }
                          >
                            {isWishlisted ? "♥" : "♡"}
                          </button>
                        </div>

                        <div className="tour-page-content">

                          <div className="tour-page-location">
                            📍 {tour.location}
                          </div>

                          <h3>{tour.title}</h3>

                          <p className="tour-page-description">
                            {tour.description}
                          </p>

                          <div className="tour-page-meta">
                            <span>
                              🕒 {tour.duration}
                            </span>

                            <span>
                              ★ {tour.rating} (
                              {tour.reviews} reviews)
                            </span>
                          </div>

                          <div className="tour-page-bottom">
                            <div>
                              <strong>
                                PKR{" "}
                                {tour.price.toLocaleString()}
                              </strong>

                              <small>
                                / person
                              </small>
                            </div>

                            <Link
                              to={`/tour/${tour.id}`}
                              className="tour-page-button"
                            >
                              View Tour
                            </Link>
                          </div>

                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="hotel-list-placeholder">
                  <p>
                    No tours found with the selected filters.
                  </p>

                  <button
                    type="button"
                    className="filter-button"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Tours;