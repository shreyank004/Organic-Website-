import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="about-page">
      <motion.div 
        className="about-hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={itemVariants}>About Us</motion.h1>
        <motion.p variants={itemVariants} className="about-subtitle">
          We're passionate about creating amazing digital experiences
        </motion.p>
      </motion.div>

      <motion.section 
        className="about-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <div className="about-grid">
            <motion.div variants={itemVariants} className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded with a vision to revolutionize the digital landscape, we've been 
                crafting exceptional user experiences that blend creativity with cutting-edge 
                technology. Our journey began with a simple belief: great design should be 
                accessible to everyone.
              </p>
              <p>
                Today, we continue to push boundaries, creating solutions that not only meet 
                our clients' needs but exceed their expectations. We believe in the power of 
                collaboration, innovation, and attention to detail.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="about-stats">
              <div className="stat-item">
                <h3>100+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>5+</h3>
                <p>Years Experience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="team-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Meet Our Team</motion.h2>
          <div className="team-grid">
            <motion.div variants={itemVariants} className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>John Doe</h3>
              <p>Frontend Developer</p>
              <span>React & UI/UX Specialist</span>
            </motion.div>

            <motion.div variants={itemVariants} className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Jane Smith</h3>
              <p>Backend Developer</p>
              <span>Node.js & Database Expert</span>
            </motion.div>

            <motion.div variants={itemVariants} className="team-member">
              <div className="member-avatar">👨‍🎨</div>
              <h3>Mike Johnson</h3>
              <p>UI/UX Designer</p>
              <span>Creative Design Lead</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="values-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Our Values</motion.h2>
          <div className="values-grid">
            <motion.div variants={itemVariants} className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We constantly explore new technologies and methodologies to deliver cutting-edge solutions.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>We believe in working together with our clients to achieve extraordinary results.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>We strive for perfection in every project, paying attention to the smallest details.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}