function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Khan",
      location: "Pakistan",
      rating: "5.0",
      text: "StaySphere made finding a comfortable hotel simple and stress-free. The booking process was smooth.",
    },
    {
      name: "Sarah Ali",
      location: "UAE",
      rating: "4.8",
      text: "I really liked the clean design and hotel information. It helped me compare different stays easily.",
    },
    {
      name: "Usman Malik",
      location: "Pakistan",
      rating: "4.9",
      text: "The deals and hotel options are excellent. I would definitely use StaySphere for my next trip.",
    },
  ];

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="section-title">What Travelers Say</h2>
          <p className="section-subtitle">
            Real experiences from travelers using StaySphere.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <div className="testimonial-rating">
                ★ {testimonial.rating}
              </div>

              <p className="testimonial-text">
                "{testimonial.text}"
              </p>

              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;