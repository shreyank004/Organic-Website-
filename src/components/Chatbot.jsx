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
