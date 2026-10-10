
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <main className="wishlist-page">
      <div className="container section">
        <div className="section-heading">
          <h1 className="section-title">My Wishlist ❤️</h1>

          <p className="section-subtitle">
            Your saved hotels will appear here.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">♡</div>

            <h2>Your wishlist is empty</h2>

            <p>
              Save your favorite hotels and find them here later.
            </p>

            <Link to="/hotels" className="wishlist-browse-button">
              Browse Hotels
            </Link>
          </div>
        ) : (
          <>
            <div className="wishlist-grid">
              {wishlist.map((hotel) => (
                <article className="wishlist-card" key={hotel.id}>
                  <div className="wishlist-card-image">
                    <img src={hotel.image} alt={hotel.name} />
                  </div>

                  <div className="wishlist-card-content">
                    <div className="wishlist-card-rating">
                      ★ {hotel.rating}
                    </div>

                    <h2>{hotel.name}</h2>

                    <p className="wishlist-card-location">
                      📍 {hotel.location}
                    </p>

                    <p className="wishlist-card-facilities">
                      {Array.isArray(hotel.facilities)
                        ? hotel.facilities.join(" • ")
                        : hotel.facilities || "Facilities available"}
                    </p>

                    <div className="wishlist-card-bottom">
                      <div>
                        <strong>
                          PKR{" "}
                          {Number(hotel.price || 0).toLocaleString()}
                        </strong>
                        <span> / night</span>
                      </div>

                      <Link
                        to={`/hotel/${hotel.id}`}
                        className="wishlist-view-button"
                      >
                        View Details
                      </Link>
                    </div>

                    <button
                      type="button"
                      className="wishlist-remove-button"
                      onClick={() => removeFromWishlist(hotel.id)}
                    >
                      ❤️ Remove from Wishlist
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="wishlist-more">
              <Link to="/hotels" className="wishlist-browse-button">
                + Browse More Hotels
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Wishlist;