import { motion } from "framer-motion";
import "./Contact.css";

export default function Contact() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted!");
  };

  return (
    <div className="contact-page">
      <motion.div
        className="contact-hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={itemVariants}>Get In Touch</motion.h1>
        <motion.p variants={itemVariants} className="contact-subtitle">
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </motion.p>
      </motion.div>

      <motion.section
        className="contact-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <div className="contact-grid">
            <motion.div variants={itemVariants} className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>hello@example.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📱</div>
                  <div>
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div>
                    <h3>Address</h3>
                    <p>
                      123 Business St.
                      <br />
                      Suite 100
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">⏰</div>
                  <div>
                    <h3>Business Hours</h3>
                    <p>
                      Mon - Fri: 9:00 AM - 6:00 PM
                      <br />
                      Sat - Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="contact-form">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input type="text" id="subject" name="subject" required />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="map-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Find Us</motion.h2>
          <motion.div variants={itemVariants} className="map-placeholder">
            <div className="map-content">
              <div className="map-icon">🗺️</div>
              <p>Interactive Map Coming Soon</p>
              <small>123 Business St, Suite 100, City, State 12345</small>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="faq-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>
            Frequently Asked Questions
          </motion.h2>
          <div className="faq-grid">
            <motion.div variants={itemVariants} className="faq-item">
              <h3>How quickly do you respond to inquiries?</h3>
              <p>
                We typically respond to all inquiries within 24 hours during
                business days.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="faq-item">
              <h3>Do you offer free consultations?</h3>
              <p>
                Yes! We offer a free 30-minute consultation to discuss your
                project needs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="faq-item">
              <h3>What information should I include in my message?</h3>
              <p>
                Please include your project timeline, budget range, and any
                specific requirements.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="faq-item">
              <h3>Can we schedule a video call?</h3>
              <p>
                Absolutely! We can arrange video calls at your convenience to
                discuss your project.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
