
import { Link } from "react-router-dom";

function TermsConditions() {
  return (
    <main className="terms-page">
      <div className="container section">
        <div className="section-heading">
          <h1 className="section-title">Terms &amp; Conditions</h1>
          <p className="section-subtitle">
            Please read the terms for using StaySphere.
          </p>
        </div>

        <div className="legal-content">
          <p className="legal-updated">
            Last updated: October 2026
          </p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By using StaySphere, you agree to these Terms and
              Conditions. If you disagree, please do not use the website.
            </p>
          </section>

          <section>
            <h2>2. About StaySphere</h2>
            <p>
              StaySphere is a hotel and travel booking demonstration.
              Listings, prices, tours, and availability may be sample data.
            </p>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <p>
              Provide accurate information, protect your account details,
              and do not misuse or disrupt the website.
            </p>
          </section>

          <section>
            <h2>4. Bookings and Payments</h2>
            <p>
              This demo does not guarantee real reservations or process
              actual payments. Displayed bookings are for demonstration.
            </p>
          </section>

          <section>
            <h2>5. Prices and Availability</h2>
            <p>
              Prices, offers, and availability may be illustrative.
              Confirm details with the hotel or service provider.
            </p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>
            <p>
              Do not copy or reuse protected website content, branding,
              or materials without appropriate permission.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>
              StaySphere does not guarantee the accuracy of demonstration
              listings or unconfirmed booking information.
            </p>
          </section>

          <section>
            <h2>8. Changes to These Terms</h2>
            <p>
              These terms may be updated as the platform develops.
              Please review this page for changes.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              For questions about these terms, visit our Contact page.
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

export default TermsConditions;