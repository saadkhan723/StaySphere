import { useState } from "react";

function Reviews() {
  const [search, setSearch] = useState("");

  const reviews = [
    {
      id: 1,
      user: "Ali Khan",
      hotel: "Serena Hotel Islamabad",
      rating: 5,
      comment: "Excellent hotel and amazing service.",
      date: "14 Oct 2026",
      status: "Published",
    },
    {
      id: 2,
      user: "Ahmed Shah",
      hotel: "Pearl Continental Lahore",
      rating: 4,
      comment: "Very comfortable stay and friendly staff.",
      date: "20 Oct 2026",
      status: "Published",
    },
    {
      id: 3,
      user: "Usman Ali",
      hotel: "Grand Millennium Dubai",
      rating: 5,
      comment: "Beautiful hotel with excellent facilities.",
      date: "02 Nov 2026",
      status: "Published",
    },
    {
      id: 4,
      user: "Sara Khan",
      hotel: "Swat Serena Hotel",
      rating: 3,
      comment: "Nice location but room service was slow.",
      date: "05 Nov 2026",
      status: "Pending",
    },
  ];

  const filteredReviews = reviews.filter((review) =>
    `${review.user} ${review.hotel} ${review.comment}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <span className="admin-label">MANAGEMENT</span>

          <h1 className="section-title">Reviews</h1>

          <p className="section-subtitle">
            Review and manage customer feedback for hotels.
          </p>
        </div>
      </div>

      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search reviews, users or hotels..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select>
          <option>All Ratings</option>
          <option>5 Stars</option>
          <option>4 Stars</option>
          <option>3 Stars</option>
          <option>2 Stars</option>
          <option>1 Star</option>
        </select>

        <select>
          <option>All Status</option>
          <option>Published</option>
          <option>Pending</option>
        </select>
      </div>

      <div className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Customer Reviews</h2>
            <p>{filteredReviews.length} reviews found</p>
          </div>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Hotel</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <div className="admin-user-name">
                      <div className="admin-user-avatar">
                        {review.user.charAt(0)}
                      </div>

                      <div>
                        <strong>{review.user}</strong>
                        <span>Customer</span>
                      </div>
                    </div>
                  </td>

                  <td>{review.hotel}</td>

                  <td>
                    <span className="admin-review-rating">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </td>

                  <td>
                    <span className="admin-review-comment">
                      {review.comment}
                    </span>
                  </td>

                  <td>{review.date}</td>

                  <td>
                    <span
                      className={`admin-status ${
                        review.status === "Published"
                          ? "active"
                          : "pending"
                      }`}
                    >
                      {review.status}
                    </span>
                  </td>

                  <td>
                    <div className="admin-actions">
                      <button title="View">👁️</button>
                      <button title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReviews.length === 0 && (
          <div className="admin-empty-state">
            <div>⭐</div>

            <h3>No reviews found</h3>

            <p>
              Try searching with a different customer or hotel name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;