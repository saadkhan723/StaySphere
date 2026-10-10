import { useState } from "react";
import { Link } from "react-router-dom";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      return;
    }

    setSubmitted(true);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <span className="contact-label">
            GET IN TOUCH
          </span>

          <h1>How can we help you?</h1>

          <p>
            Have a question about a booking, destination, or StaySphere?
            Our support team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">

          <div className="contact-layout">

            {/* Contact Information */}
            <div className="contact-info">

              <span className="contact-section-label">
                CONTACT INFORMATION
              </span>

              <h2>We're here for you</h2>

              <p>
                Get in touch with our team and we'll help you with your
                travel plans, bookings, or any questions you may have.
              </p>

              <div className="contact-info-list">

                <div>
                  <span>📧</span>

                  <div>
                    <strong>Email</strong>
                    <p>support@staysphere.com</p>
                  </div>
                </div>

                <div>
                  <span>📞</span>

                  <div>
                    <strong>Phone</strong>
                    <p>+92 300 1234567</p>
                  </div>
                </div>

                <div>
                  <span>📍</span>

                  <div>
                    <strong>Office</strong>
                    <p>Islamabad, Pakistan</p>
                  </div>
                </div>

                <div>
                  <span>🕒</span>

                  <div>
                    <strong>Support Hours</strong>
                    <p>24/7 Customer Support</p>
                  </div>
                </div>

              </div>

              <div className="contact-booking-link">
                <p>
                  Need help with an existing reservation?
                </p>

                <Link to="/my-bookings">
                  View My Bookings →
                </Link>
              </div>

            </div>

            {/* Contact Form */}
            <div className="contact-form-card">

              <h2>Send us a message</h2>

              <p>
                Fill out the form and our team will get back to you.
              </p>

              {submitted && (
                <div className="contact-success-message">
                  ✓ Your message has been sent successfully. We'll
                  get back to you soon.
                </div>
              )}

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="contact-form-grid">

                  <div className="contact-field">
                    <label htmlFor="firstName">
                      First Name
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="lastName">
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="contact-field">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="subject">
                    Subject
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="booking">
                      Booking Help
                    </option>

                    <option value="payment">
                      Payment Issue
                    </option>

                    <option value="account">
                      Account Support
                    </option>

                    <option value="general">
                      General Question
                    </option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="message">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="contact-submit-button"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Contact;