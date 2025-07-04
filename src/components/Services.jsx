
import { motion } from "framer-motion";
import "./Services.css";

export default function Services() {
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

  const services = [
    {
      icon: "🎨",
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user interfaces that provide exceptional user experiences.",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
    },
    {
      icon: "💻",
      title: "Web Development",
      description: "Building responsive and scalable web applications using modern technologies.",
      features: ["Frontend Development", "Backend Development", "Database Design", "API Integration"]
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description: "Developing native and cross-platform mobile applications for iOS and Android.",
      features: ["React Native", "iOS Development", "Android Development", "App Store Optimization"]
    },
    {
      icon: "☁️",
      title: "Cloud Solutions",
      description: "Implementing cloud infrastructure and DevOps practices for scalable applications.",
      features: ["AWS/Azure/GCP", "CI/CD Pipelines", "Containerization", "Monitoring"]
    },
    {
      icon: "🚀",
      title: "Digital Marketing",
      description: "Growing your online presence and reaching your target audience effectively.",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "Analytics"]
    },
    {
      icon: "🔧",
      title: "Consulting",
      description: "Providing expert advice and strategic guidance for your technology decisions.",
      features: ["Technology Assessment", "Strategic Planning", "Process Optimization", "Training"]
    }
  ];

  const processes = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business goals, target audience, and project requirements."
    },
    {
      step: "02",
      title: "Planning",
      description: "We create a detailed project plan with timelines, milestones, and deliverables."
    },
    {
      step: "03",
      title: "Design",
      description: "Our team designs wireframes, mockups, and prototypes for your approval."
    },
    {
      step: "04",
      title: "Development",
      description: "We build your solution using best practices and cutting-edge technologies."
    },
    {
      step: "05",
      title: "Testing",
      description: "Thorough testing ensures your project meets quality standards and requirements."
    },
    {
      step: "06",
      title: "Launch",
      description: "We deploy your project and provide ongoing support and maintenance."
    }
  ];

  return (
    <div className="services-page">
      <motion.div 
        className="services-hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={itemVariants}>Our Services</motion.h1>
        <motion.p variants={itemVariants} className="services-subtitle">
          Comprehensive digital solutions to help your business grow and succeed
        </motion.p>
      </motion.div>

      <motion.section 
        className="services-grid-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="service-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
                <button className="service-btn">Learn More</button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="process-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Our Process</motion.h2>
          <motion.p variants={itemVariants} className="process-intro">
            We follow a proven methodology to ensure successful project delivery
          </motion.p>

          <div className="process-grid">
            {processes.map((process, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="process-step"
              >
                <div className="step-number">{process.step}</div>
                <h3>{process.title}</h3>
                <p>{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="testimonials-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>What Our Clients Say</motion.h2>
          <div className="testimonials-grid">
            <motion.div variants={itemVariants} className="testimonial-card">
              <div className="testimonial-content">
                <p>"Exceptional service and outstanding results. They transformed our digital presence completely."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💼</div>
                <div>
                  <h4>John Smith</h4>
                  <span>CEO, TechCorp</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="testimonial-card">
              <div className="testimonial-content">
                <p>"Professional team that delivers on time and exceeds expectations. Highly recommended!"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👩‍💼</div>
                <div>
                  <h4>Sarah Johnson</h4>
                  <span>Marketing Director, StartupX</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="testimonial-card">
              <div className="testimonial-content">
                <p>"Their expertise in modern technologies helped us scale our business to new heights."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💻</div>
                <div>
                  <h4>Mike Davis</h4>
                  <span>CTO, InnovateNow</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="cta-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 variants={itemVariants}>Ready to Get Started?</motion.h2>
          <motion.p variants={itemVariants}>
            Let's discuss your project and see how we can help you achieve your goals.
          </motion.p>
          <motion.div variants={itemVariants} className="cta-buttons">
            <button className="btn btn-primary">Start Your Project</button>
            <button className="btn btn-secondary">Get Free Consultation</button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
