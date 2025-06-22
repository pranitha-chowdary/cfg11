import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">About Our Mission</h1>
          <p className="about-subtitle">We strive to create a better, more connected world through technology and innovation.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Mission</h2>
            <p className="section-subtitle">To deliver cutting-edge technology solutions with integrity and passion.</p>
          </div>
          
          <div className="about-grid">
            <div className="about-content">
              <h2>What We Do</h2>
              <p className="about-text">
                We design and develop state-of-the-art platforms that enable businesses to operate efficiently, adapt quickly, and deliver more value to their customers.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <p>Image Goes Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="about-vision">
        <div className="vision-content">
          <h2 className="section-title">Our Vision</h2>
          <p className="vision-text">
            To build a future where technology and human ingenuity unite to solve global challenges and uplift communities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
