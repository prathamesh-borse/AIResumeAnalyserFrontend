import React from "react";
import {
  Upload,
  FileText,
  Target,
  CheckCircle,
  XCircle,
  BookOpen,
  BarChart3,
  Download,
} from "lucide-react";

const features = [
  {
    title: "Upload Job Description",
    desc: "Simply paste or upload any job description you're interested in to get started with the analysis.",
    icon: Upload,
    color: "rgba(59, 130, 246, 0.1)",
    iconColor: "#3B82F6",
  },
  {
    title: "Upload Your Resume",
    desc: "Upload your resume in PDF or DOCX format. Our AI will parse and analyze your experience instantly.",
    icon: FileText,
    color: "rgba(147, 51, 234, 0.1)",
    iconColor: "#9333EA",
  },
  {
    title: "Recommended Roles",
    desc: "Discover job roles that perfectly match your skills and experience based on AI analysis.",
    icon: Target,
    color: "rgba(16, 185, 129, 0.1)",
    iconColor: "#10B981",
  },
  {
    title: "Current Skills Analysis",
    desc: "Get a comprehensive breakdown of your existing skills and how they align with market demands.",
    icon: CheckCircle,
    color: "rgba(34, 197, 94, 0.1)",
    iconColor: "#22C55E",
  },
  {
    title: "Missing Skills Identified",
    desc: "Know exactly which skills you need to develop to land your target role.",
    icon: XCircle,
    color: "rgba(249, 115, 22, 0.1)",
    iconColor: "#F97316",
  },
  {
    title: "Learning Resources",
    desc: "Receive personalized course recommendations and learning paths to bridge your skill gaps.",
    icon: BookOpen,
    color: "rgba(236, 72, 153, 0.1)",
    iconColor: "#EC4899",
  },
  {
    title: "Skill Frequency Analytics",
    desc: "Visualize skill trends and understand which competencies are most in-demand in your field.",
    icon: BarChart3,
    color: "rgba(99, 102, 241, 0.1)",
    iconColor: "#6366F1",
  },
  {
    title: "Download PDF Report",
    desc: "Get a professional PDF report with all insights to share with recruiters or save for reference.",
    icon: Download,
    color: "rgba(20, 184, 166, 0.1)",
    iconColor: "#14B8A6",
  },
];

export function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div className="section-header">
          <h2 className="section-title">
            Everything You Need to Advance Your Career
          </h2>
          <p className="section-subtitle">
            Our comprehensive AI-powered platform provides all the tools you
            need to analyze, improve, and optimize your career path.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="feature-card">
                <div
                  className="feature-icon"
                  style={{ background: feature.color }}
                >
                  <Icon style={{ color: feature.iconColor }} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
