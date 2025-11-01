import React from "react";
import { Users, Target, Award, Zap } from "lucide-react";

export function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">About SkillMatch AI</h2>
          <p className="section-subtitle">
            We're on a mission to democratize career advancement through
            AI-powered insights.
          </p>
        </div>

        <div className="about-content">
          <div className="about-values">
            <h3>Our Values</h3>
            <div className="values-grid">
              <div className="value-card">
                <div
                  className="value-icon"
                  style={{ background: "rgba(59, 130, 246, 0.1)" }}
                >
                  <Users style={{ color: "#3B82F6" }} />
                </div>
                <h4>User-Centric</h4>
                <p>
                  Every feature is designed with your career success in mind.
                </p>
              </div>

              <div className="value-card">
                <div
                  className="value-icon"
                  style={{ background: "rgba(16, 185, 129, 0.1)" }}
                >
                  <Target style={{ color: "#10B981" }} />
                </div>
                <h4>Accuracy</h4>
                <p>
                  Powered by advanced AI models trained on millions of job
                  profiles.
                </p>
              </div>

              <div className="value-card">
                <div
                  className="value-icon"
                  style={{ background: "rgba(249, 115, 22, 0.1)" }}
                >
                  <Award style={{ color: "#F97316" }} />
                </div>
                <h4>Excellence</h4>
                <p>
                  We constantly improve our algorithms to deliver the best
                  results.
                </p>
              </div>

              <div className="value-card">
                <div
                  className="value-icon"
                  style={{ background: "rgba(147, 51, 234, 0.1)" }}
                >
                  <Zap style={{ color: "#9333EA" }} />
                </div>
                <h4>Innovation</h4>
                <p>
                  Leading the way in AI-driven career advancement technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
