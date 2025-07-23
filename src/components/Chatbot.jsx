import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = [
    "How can I help you?",
    "Tell me about your services",
    "Contact information",
    "Pricing details",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage) => {
    try {
      const response = await fetch("[vite] connecting...", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY || "[vite] connecting..."}`,
        },
        body: JSON.stringify({
          model: "gemini-2.0-flash:generateContent",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful customer service assistant. Be friendly, concise, and helpful. Keep responses under 100 words.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("API Error:", error);

      // Fallback to local responses if API fails
      const fallbackResponses = [
        "I apologize, but I'm having trouble connecting to my knowledge base right now. Could you try asking your question again?",
        "I'm experiencing some technical difficulties. In the meantime, you can reach out to our support team directly.",
        "Sorry, I'm having connectivity issues. Please try your question again or contact our support team for immediate assistance.",
        "I'm unable to process your request at the moment. Our team is here to help - please don't hesitate to reach out directly.",
      ];

      return fallbackResponses[
        Math.floor(Math.random() * fallbackResponses.length)
      ];
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Generate response using AI API
      const botResponseText = await generateBotResponse(currentInput);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);

      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble responding right now. Please try again or contact our support team.",
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        className="chatbot-toggle"
        onClick={toggleChatbot}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-info">
                <h3>Assistant</h3>
                <span className="status online">● Online</span>
              </div>
              <button className="chatbot-close" onClick={toggleChatbot}>
                ✕
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.isBot ? "bot" : "user"}`}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="message bot typing"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="quick-action-btn"
                  disabled={isTyping}
                >
                  {action}
                </button>
              ))}
            </div>

            <form className="chatbot-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="chatbot-input"
                disabled={isTyping}
              />
              <motion.button
                type="submit"
                className="chatbot-send"
                disabled={isTyping || !inputMessage.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📤
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
