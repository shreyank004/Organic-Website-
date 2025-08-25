import { motion } from "framer-motion";
import "./Home.css";
import Chatbot from "./Chatbot";
import ImageSlider from "./ImageSlider";
import WhyChooseUs from "./WhyChooseUs";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="home-page">
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="hero-left">
            <motion.div variants={itemVariants}>
              <ImageSlider 
                slides={[
                  {
                    title: "Healthy Food",
                    subtitle: "It's not a diet. It's called eating healthy",
                    description: "Discover amazing recipes and nutrition tips that will transform your lifestyle. Our platform provides everything you need to maintain a balanced and healthy diet.",
                    primaryBtn: "Sign Up",
                    secondaryBtn: "Login",
                    emoji: "🥗"
                  },
                  {
                    title: "Fresh Ingredients",
                    subtitle: "Quality ingredients for quality life",
                    description: "We source the finest organic ingredients from local farmers. Every product is carefully selected to ensure maximum nutrition and taste.",
                    primaryBtn: "Shop Now",
                    secondaryBtn: "Learn More",
                    emoji: "🥬"
                  },
                  {
                    title: "Smart Nutrition",
                    subtitle: "Science-based nutrition guidance",
                    description: "Get personalized nutrition plans based on your goals and lifestyle. Our experts help you make informed decisions about your health.",
                    primaryBtn: "Get Started",
                    secondaryBtn: "Free Trial",
                    emoji: "🍎"
                  },
                  {
                    title: "Community Support",
                    subtitle: "Join our healthy living community",
                    description: "Connect with like-minded people who share your passion for healthy living. Share recipes, tips, and motivate each other.",
                    primaryBtn: "Join Community",
                    secondaryBtn: "Explore",
                    emoji: "🤝"
                  }
                ]}
                interval={6000}
              />
            </motion.div>
          </div>
          
        </motion.div>

      </section>
      <Chatbot />
     
      <section className="promotional-banners">
        <div className="container">
          <div className="banners-grid">
            <div className="promo-banner vegetable-banner">
              <div className="banner-content">
                <h3>Get 10% off on Vegetables</h3>
                <p>Shop our selection of organic fresh vegetables in a discounted price. 10% off on all vegetables.</p>
                <button className="shop-now-btn vegetable-btn">Shop now</button>
              </div>
              <div className="banner-image">
                <img src="/src/image/broccoli.svg" alt="Fresh vegetables" />
              </div>
              <div className="banner-logo">
                <span>FARM FOOD MARKET</span>
                <span>PRODUCT</span>
                <span>ESTD 1998</span>
              </div>
            </div>
            
            <div className="promo-banner fruit-banner">
              <div className="banner-content">
                <h3>Get garden fresh fruits</h3>
                <p>Shop our selection of organic fresh fruits in a discounted price. 10% off on all fruits.</p>
                <button className="shop-now-btn fruit-btn">Shop now</button>
              </div>
              <div className="banner-image">
                <img src="/src/image/blueberries.svg" alt="Fresh fruits" />
              </div>
              <div className="banner-logo">
                <span>Farm Fresh</span>
                <span>PRODUCT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h3 className="cta-subtitle">~ About us ~</h3>
              <h2 className="cta-title">We believe in working with accredited farmers</h2>
              <p className="cta-description">
                Organic Foods and Café is a family run company founded in 2004 that runs organic supermarkets
              </p>
              <p className="cta-description">
                Organic means growing our food, which is to nourish us, without chemical aids during the growing process such as fertilisers, pesticides, fungcides, herbacides, larbicides etc
              </p>
            </div>
            <div className="cta-features">
              <div className="feature-item">
                <div className="feature-icon">🌱</div>
                <h4>Why Organic?</h4>
                <p>We're making room for self care today with plan.</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🍃</div>
                <h4>Speciality Produce</h4>
                <p>We're making room for self care today with plan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
    </div>
    
  );
  
}