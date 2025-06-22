import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, MessageCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      details: "info@tarufoundation.org",
      link: "mailto:info@tarufoundation.org"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      details: "+91-9876543210",
      link: "tel:+919876543210"
    },
    {
      icon: <MapPin size={24} />,
      title: "Address",
      details: "Taru Foundation, 123 Rural Development Lane, Raipur, Chhattisgarh - 492001, India",
      link: "#"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-title">Get In Touch</h1>
            <p className="contact-subtitle">
              We would love to hear from you. Whether you have questions about our programs,
              want to collaborate, or need support, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2 className="section-title">Contact Information</h2>
              <p className="info-description">
                Reach out to us through any of the following channels. We're committed to
                responding promptly to all inquiries.
              </p>

              <div className="contact-cards">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index} 
                    href={info.link} 
                    className="contact-card"
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  >
                    <div className="contact-icon">
                      {info.icon}
                    </div>
                    <div className="contact-details">
                      <h3>{info.title}</h3>
                      <p>{info.details}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Office Hours */}
              <div className="office-hours">
                <h3 className="hours-title">
                  <Clock size={20} />
                  Office Hours
                </h3>
                <div className="hours-list">
                  {officeHours.map((hour, index) => (
                    <div key={index} className="hour-item">
                      <span className="day">{hour.day}</span>
                      <span className="time">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info */}
              <div className="quick-info">
                <div className="info-item">
                  <Globe size={20} />
                  <span>Serving communities across India</span>
                </div>
                <div className="info-item">
                  <MessageCircle size={20} />
                  <span>Response time: Within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Send a Message</h2>
                <p className="form-description">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="map-placeholder">
            <MapPin size={60} color="#3b82f6" />
            <p>Interactive Map Coming Soon</p>
            <span>Raipur, Chhattisgarh, India</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;