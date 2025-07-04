
import { motion } from "framer-motion";
import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim() && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted successfully:", formData);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
      
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
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
              
              {submitSuccess && (
                <div className="success-message">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {errors.submit && (
                <div className="error-message">
                  ❌ {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    required 
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                    required 
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? "error" : ""}
                    required 
                  />
                  {errors.subject && <span className="field-error">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "error" : ""}
                    required
                  ></textarea>
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <motion.button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
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
