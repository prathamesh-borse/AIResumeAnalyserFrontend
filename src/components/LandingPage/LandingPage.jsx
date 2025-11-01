import React from "react";
import { useNavigate } from "react-router-dom";
import { Hero } from "./Hero/Hero";
import { Features } from "./Features/Features";
import { HowItWorks } from "./HowItWorks/HowItWorks";
import { About } from "./About/About";
import { Contact } from "./Contact/Contact";
import { Footer } from "./Footer/Footer";
import Navbar from "../NavbarScreen/NavbarScreen";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const auth = { token: null };

  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar auth={auth} logout={() => navigate("/auth")} />
      <Hero />

      <div id="features">
        <Features />
      </div>

      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
