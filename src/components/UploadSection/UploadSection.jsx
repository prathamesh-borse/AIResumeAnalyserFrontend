import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadSection.css"; // Ensure this is the correct path to your CSS file
import Navbar from "../NavbarScreen/NavbarScreen";
import {
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Footer from "../Footer/Footer";

function UploadSection({ onAnalyze, setLoading }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Build API base so it works from localhost and LAN (phone)
  const API_BASE =
    process.env.REACT_APP_API_BASE_URL ||
    `${window.location.protocol}//${window.location.hostname}:8081`;

  const handleAnalyzeProfile = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please select a resume file.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to analyze your profile.");
      navigate("/auth");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", resumeFile);
    if (jobDescription && jobDescription.trim().length > 0) {
      formData.append("jobDescription", jobDescription.trim());
    }

    try {
      const response = await fetch(`${API_BASE}/api/resume/analyzeProfile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      setLoading(false);
      navigate("/results", { state: data });
      if (onAnalyze) onAnalyze(data);
      setResumeFile(null);
      setJobDescription("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      setLoading(false);
      alert("Failed to analyze profile.");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="upload-container">
        <Container maxWidth="md">
          <Card className="main-content">
            <CardContent>
              <header className="header-text">
                <Typography variant="h4" fontWeight={800} gutterBottom>
                  AI Resume Gap Analyzer
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Paste the job description and upload your resume to discover
                  your best-fit roles and skill gaps.
                </Typography>
              </header>

              <form onSubmit={handleAnalyzeProfile}>
                <div className="job-description-parent">
                  <Grid container spacing={2} justifyContent="space-evenly">
                    <Grid item xs={12} md={6}>
                      <div className="job-description-area">
                        <textarea
                          name="jobdescription"
                          id="jobdescriptionarea"
                          cols={20}
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the role's responsibilities, requirements, and nice-to-haves here..."
                          aria-label="Job description"
                        ></textarea>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        className="file-drop-area"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <svg
                          className="file-drop-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"
                          />
                        </svg>
                        <p className="file-drop-text">
                          Drag & drop your resume here
                        </p>
                        <p className="file-drop-text-or">or</p>
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current.click();
                          }}
                        >
                          Upload a file
                        </Button>
                        <input
                          type="file"
                          className="file-input"
                          accept=".pdf,.doc,.docx"
                          ref={fileInputRef}
                          onChange={(e) => setResumeFile(e.target.files[0])}
                        />
                        <p className="input-help-text">
                          PDF, DOC or DOCX up to 10MB
                        </p>
                        {resumeFile && (
                          <p className="file-name-display">{`Selected: ${resumeFile.name}`}</p>
                        )}
                      </div>
                    </Grid>
                  </Grid>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Analyze Resume
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default UploadSection;
