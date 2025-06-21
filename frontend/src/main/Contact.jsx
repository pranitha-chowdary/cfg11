import React from 'react';
import './style.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We would love to hear from you. Reach out to us using the details below:</p>

      <div className="contact-details">
        <p><strong>Email:</strong> info@tarufoundation.org</p>
        <p><strong>Phone:</strong> +91-9876543210</p>
        <p><strong>Address:</strong> Taru Foundation, 123 Rural Development Lane, Raipur, Chhattisgarh - 492001, India</p>
      </div>

      <form className="contact-form">
        <h2>Send a Message</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea rows="4" placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
