import { Link } from "react-router-dom";

function Deals() {
  const deals = [
    {
      id: 1,
      title: "Weekend Escape",
      description:
        "Enjoy a relaxing weekend at selected hotels with special savings.",
      discount: "25% OFF",
      price: "From PKR 12,000",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "Early Booking Deal",
      description:
        "Plan your trip early and get better prices on selected stays.",
      discount: "20% OFF",
      price: "From PKR 10,000",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Luxury Stay",
      description:
        "Experience premium hotels and comfortable stays at exclusive prices.",
      discount: "30% OFF",
      price: "From PKR 25,000",
      image:
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "Family Getaway",
      description:
        "Make your family trip memorable with special accommodation offers.",
      discount: "15% OFF",
      price: "From PKR 15,000",
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 5,
      title: "Mountain Escape",
      description:
        "Explore beautiful mountain destinations with special travel deals.",
      discount: "20% OFF",
      price: "From PKR 18,000",
      image:
        "https://images.unsplash.com/photo-1517825738774-7de9363ef735?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 6,
      title: "City Break",
      description:
        "Discover popular cities and enjoy great hotel prices for your trip.",
      discount: "25% OFF",
      price: "From PKR 14,000",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <main className="deals-page">
      <section className="section">
        <div className="container">
          <div className="section-heading text-center">
            <h1 className="section-title">Best Deals &amp; Offers</h1>
            <p className="section-subtitle">
              Save more on your next journey with exclusive
              StaySphere deals.
            </p>
          </div>

          <div className="deals-page-grid">
            {deals.map((deal) => (
              <article className="deals-page-card" key={deal.id}>
                <div className="deals-page-image">
                  <img src={deal.image} alt={deal.title} />
                  <span>{deal.discount}</span>
                </div>

                <div className="deals-page-content">
                  <span className="deals-page-badge">
                    {deal.discount}
                  </span>

                  <h2>{deal.title}</h2>
                  <p>{deal.description}</p>

                  <div className="deals-page-bottom">
                    <strong>{deal.price}</strong>

                    <Link
                      to="/hotels"
                      className="deals-page-button"
                    >
                      View Deal
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="deals-page-cta">
            <div>
              <h2>Looking for more great stays?</h2>
              <p>
                Explore all available hotels and find the perfect
                place for your next trip.
              </p>
            </div>

            <Link
              to="/hotels"
              className="deals-page-button"
            >
              Explore Hotels
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Deals;