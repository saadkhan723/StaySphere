
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Hotels() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [maxPrice, setMaxPrice] = useState(100000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("staysphere-wishlist") || "[]"
      );
    } catch {
      return [];
    }
  });

  // Backend se hotels load karo
  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(
          "http://localhost:5000/api/hotels"
        );

        if (!response.ok) {
          throw new Error("Hotels load nahi ho sake.");
        }

        const data = await response.json();

        const formattedHotels = (data.hotels || []).map(
          (hotel) => ({
            ...hotel,
            id: hotel._id,
            price: hotel.pricePerNight,
            facilities: hotel.amenities || [],
            reviews: hotel.reviews || 0,
          })
        );

        setHotels(formattedHotels);
      } catch (error) {
        setApiError(
          error.message || "Backend se connection nahi ho saka."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  // Hotels filter karo
  const filteredHotels = hotels.filter((hotel) => {
    const search = destination.trim().toLowerCase();

    const matchesDestination =
      !search ||
      (hotel.name || "").toLowerCase().includes(search) ||
      (hotel.location || "").toLowerCase().includes(search) ||
      (hotel.country || "").toLowerCase().includes(search);

    return (
      matchesDestination &&
      Number(hotel.price || 0) <= Number(maxPrice) &&
      Number(hotel.rating || 0) >= Number(minRating)
    );
  });

  // Hotels sort karo
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === "price-low") {
      return Number(a.price) - Number(b.price);
    }

    if (sortBy === "price-high") {
      return Number(b.price) - Number(a.price);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  // Wishlist update karo
  function toggleWishlist(hotel) {
    const exists = wishlist.some(
      (item) => String(item.id) === String(hotel.id)
    );

    const updated = exists
      ? wishlist.filter(
          (item) => String(item.id) !== String(hotel.id)
        )
      : [...wishlist, hotel];

    setWishlist(updated);

    try {
      localStorage.setItem(
        "staysphere-wishlist",
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error("Wishlist save nahi ho saki:", error);
    }
  }

  // Filters reset karo
  function clearFilters() {
    setDestination("");
    setMaxPrice(100000);
    setMinRating(0);
    setSortBy("recommended");
  }

  // Loading state
  if (loading) {
    return (
      <main className="hotels-page">
        <p>Loading hotels...</p>
      </main>
    );
  }

  // API error state
  if (apiError) {
    return (
      <main className="hotels-page">
        <h1>Unable to load hotels</h1>
        <p>{apiError}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="hotels-page">
      <header className="hotels-header">
        <h1>Explore Hotels</h1>
        <p>
          Discover your next perfect stay with StaySphere.
        </p>
      </header>

      <div className="hotels-content">
        <aside className="hotel-filters">
          <h2>Filter Hotels</h2>

          <label htmlFor="destination">
            Destination
          </label>

          <input
            id="destination"
            type="text"
            placeholder="Search city or country"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <label htmlFor="maxPrice">
            Maximum Price (PKR)
          </label>

          <input
            id="maxPrice"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value === ""
                  ? 0
                  : Number(e.target.value)
              )
            }
          />

          <label htmlFor="minRating">
            Minimum Rating
          </label>

          <select
            id="minRating"
            value={minRating}
            onChange={(e) =>
              setMinRating(Number(e.target.value))
            }
          >
            <option value={0}>All Ratings</option>
            <option value={3}>3+ Stars</option>
            <option value={4}>4+ Stars</option>
            <option value={4.5}>4.5+ Stars</option>
          </select>

          <button type="button" onClick={clearFilters}>
            Clear Filters
          </button>
        </aside>

        <section className="hotels-results">
          <div className="hotels-results-header">
            <h2>{sortedHotels.length} Hotels Found</h2>

            <select
              aria-label="Sort hotels"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
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
                Highest Rated
              </option>
            </select>
          </div>

          {sortedHotels.length === 0 ? (
            <div className="no-hotels">
              <h3>No hotels found</h3>
              <p>
                Try another destination or clear your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Show All Hotels
              </button>
            </div>
          ) : (
            <div className="hotels-grid">
              {sortedHotels.map((hotel) => {
                const isSaved = wishlist.some(
                  (item) =>
                    String(item.id) === String(hotel.id)
                );

                return (
                  <article
                    className="hotel-card"
                    key={hotel.id}
                  >
                    <div className="hotel-image-wrapper">
                      <img
                        className="hotel-image"
                        src={hotel.image}
                        alt={hotel.name}
                      />

                      {hotel.discount ? (
                        <span className="hotel-discount">
                          {hotel.discount}% OFF
                        </span>
                      ) : null}

                      <button
                        type="button"
                        className="hotel-wishlist-button"
                        onClick={() => toggleWishlist(hotel)}
                        aria-label={
                          isSaved
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {isSaved ? "♥" : "♡"}
                      </button>
                    </div>

                    <div className="hotel-card-content">
                      <h3>{hotel.name}</h3>

                      <p className="hotel-location">
                        📍 {hotel.location}
                      </p>

                      <p className="hotel-rating">
                        ⭐ {hotel.rating}{" "}
                        <span>
                          ({hotel.reviews} reviews)
                        </span>
                      </p>

                      <p className="hotel-facilities">
                        {Array.isArray(hotel.facilities)
                          ? hotel.facilities.join(" • ")
                          : hotel.facilities}
                      </p>

                      <div className="hotel-card-footer">
                        <div className="hotel-price">
                          <strong>
                            PKR{" "}
                            {Number(
                              hotel.price || 0
                            ).toLocaleString()}
                          </strong>

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
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Hotels;