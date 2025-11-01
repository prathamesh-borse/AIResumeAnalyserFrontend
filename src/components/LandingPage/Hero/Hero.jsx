import React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "../../ui/Button";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles />
            <span>AI-Powered Career Intelligence</span>
          </div>

          <h1 className="hero-title">
            Unlock Your Career Potential with AI Resume Analysis
          </h1>

          <p className="hero-description">
            Get instant insights into your skills, discover perfect job matches,
            and bridge skill gaps with personalized learning recommendations.
            Your next career move starts here.
          </p>

          <div className="hero-buttons">
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/auth")}
            >
              Get Started Free →
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/auth")}
            >
              Sign In
            </Button>
          </div>
        </div>

        <div className="hero-image">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
            alt="Professional team collaboration"
          />
        </div>
      </div>
    </section>
  );
}
