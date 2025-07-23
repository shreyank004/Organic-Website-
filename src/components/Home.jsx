import { motion } from "framer-motion";
import "./Home.css";
import Chatbot from "./Chatbot";

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
          <motion.h1 variants={itemVariants}>Welcome to My App</motion.h1>
          <motion.div variants={itemVariants}>
            <div>Build amazing things with modern web technologies</div>
          </motion.div>
          <p className="hero-subtitle">Build amazing things with React and modern web technologies</p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </motion.div>

      </section>
      <Chatbot />
      <section className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>Built with Vite for lightning-fast development and optimized production builds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Modern Design</h3>
              <p>Clean, responsive design that works perfectly on all devices and screen sizes.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3>Easy to Use</h3>
              <p>Simple and intuitive interface with powerful features under the hood.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of developers building amazing applications.</p>
          <button className="btn btn-primary">Start Building</button>
        </div>
      </section>

    </div>
    
  );
  
}