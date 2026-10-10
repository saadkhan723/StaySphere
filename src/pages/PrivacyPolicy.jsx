
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <main className="privacy-page">
      <div className="container section">
        <div className="section-heading">
          <h1 className="section-title">Privacy Policy</h1>
          <p className="section-subtitle">
            Learn how StaySphere handles your information.
          </p>
        </div>

        <div className="legal-content">
          <p className="legal-updated">
            Last updated: October 2026
          </p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to StaySphere, a hotel and travel booking
              platform. This page explains how information may be
              handled when you use our website.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <p>
              Depending on the features you use, information may
              include your name, email address, booking details,
              travel preferences, and information you provide
              through forms.
            </p>
          </section>

          <section>
            <h2>3. How We Use Information</h2>
            <p>
              Information may be used to provide website features,
              manage bookings, personalize your experience, respond
              to enquiries, and improve our services.
            </p>
          </section>

          <section>
            <h2>4. Storage and Security</h2>
            <p>
              The current demonstration version may store certain
              preferences and demo account information in your
              browser. Browser storage is not a secure database.
              Never use real passwords or sensitive personal
              information in this demo.
            </p>
          </section>

          <section>
            <h2>5. Sharing of Information</h2>
            <p>
              StaySphere should only share personal information
              when necessary to provide a requested service or when
              required by applicable law. Actual sharing practices
              will depend on the services connected to the platform.
            </p>
          </section>

          <section>
            <h2>6. Your Choices</h2>
            <p>
              You can manage browser-stored demo data through the
              website features or your browser settings. Once real
              accounts and backend services are implemented, this
              policy must be updated to reflect their actual data
              handling practices.
            </p>
          </section>

          <section>
            <h2>7. Policy Updates</h2>
            <p>
              This page may be updated as StaySphere develops.
              Please review it periodically for changes.
            </p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>
              For questions about privacy, visit our Contact page.
            </p>
            <Link to="/contact" className="legal-link">
              Contact Us
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;