
import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How can I book a hotel?",
    answer:
      "Open the Hotels page, choose your preferred hotel, check its details, and follow the booking steps.",
  },
  {
    question: "How can I save my favorite hotels?",
    answer:
      "Open the Hotels page and use the heart button to save a hotel to your Wishlist.",
  },
  {
    question: "How can I cancel a booking?",
    answer:
      "Open My Bookings to review your reservations. Cancellation options will depend on the booking policy.",
  },
  {
    question: "How can I contact StaySphere?",
    answer:
      "Visit our Contact page to find the available contact information.",
  },
];

function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <main className="help-page">
      <div className="container section">
        <div className="section-heading">
          <h1 className="section-title">Help Center</h1>
          <p className="section-subtitle">
            Find answers to common questions about StaySphere.
          </p>
        </div>

        <div className="help-faq-list">
          {faqs.map((faq, index) => (
            <article className="help-faq-item" key={faq.question}>
              <button
                type="button"
                className="help-faq-question"
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>

              {openIndex === index && (
                <p className="help-faq-answer">{faq.answer}</p>
              )}
            </article>
          ))}
        </div>

        <div className="help-contact">
          <h2>Still need help?</h2>
          <p>Visit our Contact page for further assistance.</p>
          <Link to="/contact" className="wishlist-browse-button">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HelpCenter;