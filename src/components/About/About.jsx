import React from "react";
import "./About.css";

// Material UI Icons
import DoneAllIcon from "@mui/icons-material/DoneAll";
import SearchIcon from "@mui/icons-material/Search";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DescriptionIcon from "@mui/icons-material/Description";
import InsightsIcon from "@mui/icons-material/Insights";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Navbar from "../NavbarScreen/NavbarScreen.jsx";

const About = () => (
  <div>
    <Navbar />
    <div className="about-container">
      <h1 className="about-title">About Resume Analyzer</h1>
      <p className="about-subtitle">
        A cutting-edge web application designed to bridge the gap between job
        seekers and their ideal roles.
      </p>

      <div className="about-section-one about-mission-how">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To empower job seekers with the tools and knowledge they need to
            succeed in their career pursuits. We believe that everyone deserves
            the opportunity to find a fulfilling role, and Resume Analyzer is
            here to help achieve that goal.
          </p>
        </div>
        <div className="about-card">
          <h2>How It Works</h2>
          <p>
            Simply upload your resume and the job description. Our AI algorithms
            will analyze both documents, highlight strengths, and identify any
            gaps. You'll receive a detailed report with actionable insights to
            tailor your resume and increase your chances of landing an
            interview.
          </p>
        </div>
      </div>

      <div className="about-techstack">
        <h2>Technology Stack</h2>
        <p>
          Resume Analyzer is built on a robust and modern technology stack,
          ensuring performance, scalability, and reliability.
        </p>
        <div className="techstack-list">
          <div className="tech-card">
            <EngineeringIcon className="tech-icon" />
            <div>Spring Boot</div>
            <span>Backend</span>
          </div>
          <div className="tech-card">
            <DoneAllIcon className="tech-icon" />
            <div>React</div>
            <span>Frontend</span>
          </div>
          <div className="tech-card">
            <InsightsIcon className="tech-icon" />
            <div>AI Models</div>
            <span>Analysis</span>
          </div>
        </div>
      </div>

      <div className="about-benefits">
        <h2>Key Benefits</h2>
        <div className="benefits-list">
          <div className="benefit-card">
            <SearchIcon className="benefit-icon" />
            <div className="benefit-title">Identify Skill Gaps</div>
            <p>
              Pinpoint areas where your qualifications may not align with the
              job description.
            </p>
          </div>
          <div className="benefit-card">
            <DescriptionIcon className="benefit-icon" />
            <div className="benefit-title">Tailor Your Resume</div>
            <p>
              Receive personalized recommendations to optimize your resume for
              specific roles.
            </p>
          </div>
          <div className="benefit-card">
            <TrendingUpIcon className="benefit-icon" />
            <div className="benefit-title">Increase Interview Chances</div>
            <p>
              Improve your application's relevance and increase your chances of
              securing an interview.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About;
