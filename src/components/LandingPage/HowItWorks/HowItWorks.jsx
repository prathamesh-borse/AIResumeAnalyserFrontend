import React from "react";
import { Upload, Zap, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

const steps = [
    {
        number: "01",
        title: "Upload & Analyze",
        description: "Upload your resume and the job description you're targeting. Our AI instantly begins analyzing both documents.",
        icon: Upload,
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
        number: "02",
        title: "Get AI Insights",
        description: "Receive detailed analysis of your skills match, role recommendations, and identified gaps in seconds.",
        icon: Zap,
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
        number: "03",
        title: "Take Action",
        description: "Follow personalized learning recommendations and download your comprehensive PDF report to track progress.",
        icon: TrendingUp,
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="how-section">
            <div className="section-header">
                <h2 className="section-title">How It Works</h2>
                <p className="section-subtitle">Get started in minutes with our simple three-step process</p>
            </div>

            <div className="how-container">
                <div className="steps-content">
                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.number} className="step-item">
                                <div className="step-icon" style={{ background: step.gradient }}>
                                    <Icon />
                                </div>
                                <div className="step-text">
                                    <h3>Step {step.number}</h3>
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="how-image">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                        alt="Analytics and data visualization" fallback={"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"} />
                </div>
            </div>
        </section>
    );
}