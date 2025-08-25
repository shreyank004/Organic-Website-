import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickActions = ["Hello", "Services", "Contact", "Pricing"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



const generateBotResponse = async (userMessage) => {
  try {

    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a helpful customer service assistant. Be friendly, concise, and helpful. Keep responses under 100 words. User: ${userMessage}`,
          parameters: {
            max_length: 150,
            temperature: 0.8,
            do_sample: true,
            top_p: 0.9,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    

    if (data && data[0] && data[0].generated_text) {
      let responseText = data[0].generated_text;
      

      const promptIndex = responseText.indexOf("User: " + userMessage);
      if (promptIndex !== -1) {
        responseText = responseText.substring(promptIndex + userMessage.length + 6).trim();
      }
      

      responseText = responseText.replace(/You are a helpful customer service assistant.*?User:.*?/g, '').trim();
      
      if (responseText.length > 5) {
        return responseText;
      }
    }
    
    const altResponse = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: {
            max_length: 100,
            temperature: 0.7,
          },
        }),
      }
    );

    if (altResponse.ok) {
      const altData = await altResponse.json();
      if (altData && altData[0] && altData[0].generated_text) {
        return altData[0].generated_text.trim();
      }
    }
    
    throw new Error("No valid response from APIs");
    
  } catch (error) {
    console.error("API Error:", error);
    
    const fallbackResponses = [
      "I'm having trouble connecting to my AI service right now. Please try again in a moment.",
      "There seems to be a temporary issue with my response system. Could you try asking again?",
      "I'm experiencing a connection issue. Please wait a moment and try your question again.",
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
        text: "I'm having trouble responding right now. Please try again or contact our support team.",
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

      <motion.button
        className="chatbot-toggle"
        onClick={toggleChatbot}
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="chatbot-header">
              <div className="chatbot-avatar">🤖</div>
              <div className="chatbot-info">
                <h3>Chat Support</h3>
                <span className="status online">Online</span>
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
                Send
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
