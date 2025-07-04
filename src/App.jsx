import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import "./App.css";

function Contact() {
  return (
    <div className="page">
      <h2>Contact Page</h2>
      <p>Get in touch with us!</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
