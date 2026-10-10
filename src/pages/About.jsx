import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* About Hero */}
      <section className="about-hero">
        <div className="container">
          <span className="about-label">
            ABOUT STAYSPHERE
          </span>

          <h1>
            Making travel planning
            <br />
            simple and enjoyable.
          </h1>

          <p>
            StaySphere is a modern hotel and travel booking platform
            designed to help travelers discover comfortable stays,
            exciting destinations, and great travel experiences.
          </p>

          <div className="about-hero-actions">
            <Link
              to="/hotels"
              className="about-primary-button"
            >
              Explore Hotels
            </Link>

            <Link
              to="/tours"
              className="about-secondary-button"
            >
              Discover Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">

          <div className="about-story">
            <div>
              <span className="about-section-label">
                OUR STORY
              </span>

              <h2>
                Built for better travel experiences
              </h2>
            </div>

            <div>
              <p>
                StaySphere brings hotels, tours, deals, and travel
                experiences together in one convenient platform.
              </p>

              <p>
                Our goal is to make finding and booking your next
                destination simple, transparent, and enjoyable.
              </p>

              <p>
                Whether you are planning a weekend getaway, a family
                vacation, or a business trip, StaySphere helps you
                discover the right stay and experience for your journey.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="about-values">

            <article>
              <span>01</span>

              <h3>Trusted Stays</h3>

              <p>
                Discover carefully selected properties and comfortable
                places to stay.
              </p>
            </article>

            <article>
              <span>02</span>

              <h3>Best Experiences</h3>

              <p>
                Explore destinations and tours designed to make every
                journey memorable.
              </p>
            </article>

            <article>
              <span>03</span>

              <h3>Simple Booking</h3>

              <p>
                Find your stay, compare options, and manage your booking
                through one easy platform.
              </p>
            </article>

          </div>

          {/* Stats */}
          <div className="about-stats">

            <div>
              <strong>10K+</strong>
              <span>Properties</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Destinations</span>
            </div>

            <div>
              <strong>25K+</strong>
              <span>Travelers</span>
            </div>

            <div>
              <strong>4.8/5</strong>
              <span>Average Rating</span>
            </div>

          </div>

          {/* CTA */}
          <div className="about-cta">

            <div>
              <span className="about-section-label">
                START YOUR JOURNEY
              </span>

              <h2>
                Ready to plan your next adventure?
              </h2>

              <p>
                Explore our hotels and tours and start planning your
                next memorable trip with StaySphere.
              </p>
            </div>

            <div className="about-cta-actions">

              <Link
                to="/hotels"
                className="about-primary-button"
              >
                Browse Hotels
              </Link>

              <Link
                to="/deals"
                className="about-secondary-button"
              >
                View Deals
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;