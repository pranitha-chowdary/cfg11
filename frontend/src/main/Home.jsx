import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../shared/Footer'
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Heart, 
  Star, 
  ArrowRight,
  Globe,
  Shield,
  Award
} from 'lucide-react'
import { productAPI } from '../utils/api'
import ProductCard from '../shared/ProductCard'
import './style.css'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productAPI.getAll({ limit: 8, featured: true })
      setFeaturedProducts(response.data.products || [])
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <Users size={32} />,
      title: "Empowering Rural Communities",
      description: "Supporting Self Help Groups (SHGs) to sell their handcrafted products directly to customers nationwide."
    },
    {
      icon: <ShoppingBag size={32} />,
      title: "Authentic Handmade Products",
      description: "Discover unique, authentic products crafted by skilled artisans from rural India with traditional techniques."
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Direct Market Access",
      description: "Connecting rural sellers directly with urban buyers, eliminating middlemen and ensuring fair prices."
    },
    {
      icon: <Heart size={32} />,
      title: "Social Impact",
      description: "Every purchase contributes to poverty alleviation and women empowerment in rural communities."
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "SHG Member, Rajasthan",
      content: "Taru Foundation has changed my life. I can now sell my handicrafts to customers across India and support my family.",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      role: "Customer, Delhi",
      content: "Amazing quality products! I love supporting rural artisans through this platform. Highly recommended!",
      rating: 5
    },
    {
      name: "Meera Devi",
      role: "SHG Leader, Bihar",
      content: "Our group has benefited tremendously. The platform is easy to use and payments are always on time.",
      rating: 5
    }
  ]

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Empowering Rural Communities Through E-commerce
          </h1>
          <p className="hero-subtitle">
            Connect with authentic handmade products from Self Help Groups across India. 
            Support rural artisans while discovering unique, quality crafts.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              <ShoppingBag size={20} />
              Shop Now
            </Link>
            <Link to="/seller/register" className="btn btn-outline">
              <Users size={20} />
              Join as Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">SHG Families Supported</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">120</div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Training Batches</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Authentic Products</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Taru Foundation?</h2>
            <p className="section-subtitle">
              We're more than just an e-commerce platform. We're a bridge between 
              rural artisans and urban consumers, creating sustainable livelihoods.
            </p>
          </div>
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className="feature-card slide-up">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Discover handcrafted treasures made by skilled artisans from rural India
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-4">
                {featuredProducts.slice(0, 8).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <div className="text-center mt-4">
                <Link to="/products" className="btn btn-primary">
                  View All Products
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div className="slide-up">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                Our Mission
              </h2>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.8', marginBottom: '2rem', color: '#6b7280' }}>
                To work for the Creation, Protection, and Nurturing of poverty-free, educated, 
                skilled, women empowered, prosperous and healthy society through philanthropic 
                thinking, high governance, and best practices across the globe.
              </p>
              <div className="mission-points">
                <div className="mission-point">
                  <Globe className="mission-icon" />
                  <div>
                    <h4>Global Impact</h4>
                    <p>Connecting rural artisans with global markets</p>
                  </div>
                </div>
                <div className="mission-point">
                  <Shield className="mission-icon" />
                  <div>
                    <h4>Quality Assurance</h4>
                    <p>Ensuring authentic, high-quality handmade products</p>
                  </div>
                </div>
                <div className="mission-point">
                  <Award className="mission-icon" />
                  <div>
                    <h4>Excellence</h4>
                    <p>Promoting best practices in rural entrepreneurship</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">
                <Users size={80} color="#3b82f6" />
                <p>Rural Artisans at Work</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Community Says</h2>
            <p className="section-subtitle">
              Stories from our sellers and buyers who are part of the Taru Foundation family
            </p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card slide-up">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Make a Difference?</h2>
            <p className="cta-subtitle">
              Join our community of conscious consumers and rural entrepreneurs
            </p>
            <div className="cta-buttons">
              <Link to="/buyer/register" className="btn btn-primary">
                Start Shopping
              </Link>
              <Link to="/seller/register" className="btn btn-secondary">
                Become a Seller
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
