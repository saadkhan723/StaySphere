function WhyStaySphere() {
  const features = [
    {
      icon: "✓",
      title: "Trusted Stays",
      description:
        "Find reliable hotels and accommodations for a comfortable journey.",
    },
    {
      icon: "$",
      title: "Best Prices",
      description:
        "Compare options and discover great deals for your budget.",
    },
    {
      icon: "★",
      title: "Verified Reviews",
      description:
        "Make better decisions with ratings and reviews from travelers.",
    },
    {
      icon: "24",
      title: "24/7 Support",
      description:
        "Get help whenever you need it throughout your booking journey.",
    },
  ];

  return (
    <section className="section why-staysphere">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-title">Why Choose StaySphere?</h2>

          <p className="section-subtitle">
            Everything you need for a simple and confident travel booking.
          </p>
        </div>

        <div className="why-staysphere-grid">
          {features.map((feature) => (
            <div className="why-card" key={feature.title}>
              <div className="why-icon">{feature.icon}</div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyStaySphere;