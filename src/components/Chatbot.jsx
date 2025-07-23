import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("f505aa07cdb94ae287dc0230f515f7a2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I didn't understand that.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Oops! Something went wrong. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response;
      }
    }

    return predefinedResponses.default;
  };

  // const handleSendMessage = async () => {
  //   if (!inputText.trim()) return;

  //   const userMessage = {
  //     id: Date.now(),
  //     text: inputText,
  //     isBot: false,
  //     timestamp: new Date(),
  //   };

  //   setMessages((prev) => [...prev, userMessage]);
  //   setInputText("");
  //   setIsTyping(true);

  //   setTimeout(
  //     () => {
  //       const botResponse = {
  //         id: Date.now() + 1,
  //         text: getBotResponse(inputText),
  //         isBot: true,
  //         timestamp: new Date(),
  //       };

  //       setMessages((prev) => [...prev, botResponse]);
  //       setIsTyping(false);
  //     },
  //     1000 + Math.random() * 1000,
  //   );
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-info">
                <h3>Chat Assistant</h3>
                <span className="online-status">Online</span>
              </div>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isBot ? "bot-message" : "user-message"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">{message.text}</div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="message bot-message typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-input"
              />
              <motion.button
                onClick={handleSendMessage}
                className="send-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputText.trim()}
              >
                ➤
              </motion.button>
            </div>

            <div className="quick-actions">
              <button
                onClick={() => setInputText("What services do you offer?")}
              >
                Services
              </button>
              <button onClick={() => setInputText("What are your prices?")}>
                Pricing
              </button>
              <button onClick={() => setInputText("Schedule consultation")}>
                Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help you. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = {
    greeting: [
      "Hi there! How can I help you today?",
      "Hello! What can I do for you?",
      "Hey! I'm here to assist you.",
    ],
    services: [
      "We offer web development, mobile apps, UI/UX design, cloud solutions, and digital marketing. Which service interests you?",
      "Our main services include frontend/backend development, mobile applications, design, and consulting. What would you like to know more about?",
    ],
    contact: [
      "You can reach us at hello@example.com or call +1 (555) 123-4567. We typically respond within 24 hours!",
      "Feel free to fill out the contact form above, or email us directly at hello@example.com. We'd love to hear from you!",
    ],
    pricing: [
      "Our pricing varies based on project scope and requirements. Would you like to schedule a free consultation to discuss your specific needs?",
      "We offer competitive pricing tailored to each project. Let's set up a call to discuss your budget and requirements!",
    ],
    default: [
      "That's a great question! For detailed information, I'd recommend contacting our team directly through the form above.",
      "I'd be happy to help you with that! Please feel free to reach out through our contact form and our team will get back to you soon.",
      "Thanks for asking! Our team can provide you with more specific information. Please use the contact form above to get in touch.",
    ],
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    } else if (message.includes("service") || message.includes("what do you do")) {
      return botResponses.services[Math.floor(Math.random() * botResponses.services.length)];
    } else if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
      return botResponses.contact[Math.floor(Math.random() * botResponses.contact.length)];
    } else if (message.includes("price") || message.includes("cost") || message.includes("budget")) {
      return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
    setTimeout(() => sendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <motion.div
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 45 } : { rotate: 0 }}
      >
        {isOpen ? "✕" : "💬"}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <div className="bot-avatar">🤖</div>
                <div>
                  <h3>Support Assistant</h3>
                  <span className="status">Online</span>
                </div>
              </div>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isBot ? "bot-message" : "user-message"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text}
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="message bot-message typing-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="quick-actions">
              <button onClick={() => handleQuickAction("What services do you offer?")}>
                Services
              </button>
              <button onClick={() => handleQuickAction("How can I contact you?")}>
                Contact
              </button>
              <button onClick={() => handleQuickAction("What are your prices?")}>
                Pricing
              </button>
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="send-button"
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
