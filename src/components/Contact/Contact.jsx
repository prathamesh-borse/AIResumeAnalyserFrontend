import React from "react";
import "./ContactPage.css";
import Navbar from "../NavbarScreen/NavbarScreen";

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <div className="contact-page-container-upload">
        <main className="contact-content-upload">
          <h1 className="contact-heading-upload">Contact Us</h1>
          <p className="contact-subheading-upload">
            We're here to help! Reach out with any questions or feedback.
          </p>

          <form className="contact-form-upload">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button type="submit" className="send-button">
              Send Message
            </button>
          </form>

          <p className="email-link-text-upload">
            Or email us directly at
            <a
              href="mailto:prathameshborse.official@gmail.com"
              className="padding-left email-link"
            >
              prathameshborse.official@gmail.com
            </a>
          </p>
        </main>
      </div>
    </div>
  );
};

export default ContactPage;
