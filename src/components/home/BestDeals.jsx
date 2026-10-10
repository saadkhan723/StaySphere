import { Link } from "react-router-dom";

function BestDeals() {
  const deals = [
    {
      title: "Weekend Escape",
      description: "Save up to 25% on selected hotels.",
      discount: "25% OFF",
      location: "Islamabad, Pakistan",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Early Booking Deal",
      description: "Book early and get special prices.",
      discount: "20% OFF",
      location: "Lahore, Pakistan",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Luxury Stay",
      description: "Enjoy premium hotels at better prices.",
      discount: "30% OFF",
      location: "Dubai, UAE",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="section best-deals">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Best Deals</h2>

          <p className="section-subtitle">
            Save more on your next stay with our exclusive offers.
          </p>
        </div>

        <div className="deals-grid">
          {deals.map((deal) => (
            <div className="deal-card" key={deal.title}>
              
              <div className="deal-image">
                <img src={deal.image} alt={deal.title} />

                <span className="deal-discount">
                  {deal.discount}
                </span>
              </div>

              <div className="deal-content">
                <span className="deal-location">
                  📍 {deal.location}
                </span>

                <h3>{deal.title}</h3>

                <p>{deal.description}</p>

                <Link
                  to="/deals"
                  className="deal-button"
                >
                  Explore Deal
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestDeals;