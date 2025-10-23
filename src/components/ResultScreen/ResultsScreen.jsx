import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./ResultsScreen.css";
import Navbar from "../NavbarScreen/NavbarScreen.jsx";
import resourcesData from "../ResultScreen/resources.json";
import serverIcon from "../../assets/roles/server.svg";
import monitorIcon from "../../assets/roles/monitor.svg";
import layersIcon from "../../assets/roles/layers.svg";
import databaseIcon from "../../assets/roles/database.svg";
import cloudIcon from "../../assets/roles/cloud.svg";
import {
  Container,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { MenuBook, ChevronRight } from "@mui/icons-material";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Build API base so it works from localhost and LAN (phone)
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  `${window.location.protocol}//${window.location.hostname}:8081`;

const roleIcons = {
  "Backend Developer": serverIcon,
  "Frontend Developer": monitorIcon,
  "Fullstack Developer": layersIcon,
  "Data Engineer": databaseIcon,
  "DevOps Engineer": cloudIcon,
};

export default function ResultsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    recommendedRoles = [],
    skillFrequency = [],
    uniqueCurrentSkills = [],
    uniqueMissingSkills = [],
  } = location.state || {};

  // View toggle for the separate Skill Gap section
  const [skillView, setSkillView] = useState("frequency");

  if (!location.state) {
    return (
      <div className="results-container">
        <h2>No results to display.</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  // Pie chart data
  const pieData = {
    labels: ["Current Skills", "Missing Skills"],
    datasets: [
      {
        data: [uniqueCurrentSkills.length, uniqueMissingSkills.length],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data (Skill Frequency)
  const barData = {
    labels: skillFrequency.length
      ? skillFrequency.map((s) => capitalize(s.skill))
      : uniqueCurrentSkills.map(capitalize),
    datasets: [
      {
        label: "Skill Frequency",
        data: skillFrequency.length
          ? skillFrequency.map((s) => s.count)
          : uniqueCurrentSkills.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: "#93c5fd",
        borderColor: "#3b82f6",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  // Separate Skill Gap section datasets
  const gapBarData = {
    labels:
      uniqueMissingSkills.length > 0
        ? uniqueMissingSkills.map(capitalize)
        : ["No Missing Skills"],
    datasets: [
      {
        label: "Skill Gap",
        data:
          uniqueMissingSkills.length > 0
            ? uniqueMissingSkills.map(() => 1)
            : [0],
        backgroundColor: "#fecaca",
        borderColor: "#ef4444",
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  // Example suggested resources if not provided
  const defaultResources = [
    {
      name: "Machine Learning Basics",
      desc: "Learn the fundamentals of machine learning.",
      icon: "psychology",
      link: "#",
    },
    {
      name: "Cloud Computing Essentials",
      desc: "Explore cloud computing platforms and services.",
      icon: "cloud",
      link: "#",
    },
    {
      name: "Agile Methodologies",
      desc: "Understand agile principles and practices.",
      icon: "checklist",
      link: "#",
    },
  ];

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Normalize skill keys for comparison
  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "").trim();

  // Create a lookup map for normalized keys from resources.json
  const resourceMap = Object.keys(resourcesData).reduce((map, key) => {
    map[normalize(key)] = resourcesData[key];
    return map;
  }, {});

  // Map missing skills → resources
  const mappedResources = uniqueMissingSkills.flatMap((skill) => {
    const key = normalize(skill);
    return resourceMap[key] || [];
  });

  const resources = mappedResources.length
    ? mappedResources.map((r) => ({
        name: r.title,
        desc: r.description,
        icon: r.image,
        link: r.url,
      }))
    : defaultResources;

  // Function to download report as text file
  async function downloadReport() {
    const roleMatch =
      Array.isArray(recommendedRoles) && recommendedRoles.length
        ? String(recommendedRoles[0].role)
        : "";

    const matchedSkills = Array.isArray(uniqueCurrentSkills)
      ? uniqueCurrentSkills.map(String)
      : [];

    const missingSkills = Array.isArray(uniqueMissingSkills)
      ? uniqueMissingSkills.map(String)
      : [];

    const skillFrequencies =
      Array.isArray(skillFrequency) && skillFrequency.length
        ? skillFrequency.map((row) => ({
            skill: String(row.skill ?? row.name ?? ""),
            frequency: Number(row.frequency ?? row.freq ?? row.count ?? 0),
          }))
        : uniqueCurrentSkills.map((skill) => ({
            skill: String(skill),
            frequency: Math.floor(Math.random() * 10) + 1, // fallback random
          }));

    const overallCoverage = recommendedRoles.map((r) => ({
      role: String(r.role),
      score: Number(r.score).toFixed(1),
    }));

    const username = localStorage.email;

    const payload = {
      username,
      roleMatch,
      overallCoverage,
      matchedSkills,
      missingSkills,
      skillFrequencies,
      learningResources: resources,
    };

    const response = await fetch(`${API_BASE}/api/resume/downloadProfile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to generate report");

    const blob = await response.blob();
    const contentDisposition =
      response.headers.get("Content-Disposition") || "";
    const match = contentDisposition.match(/filename="?([^";]+)"?/);
    const filename = match?.[1] ?? "Resume_Analysis_Report.pdf";

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      className="relative min-h-screen w-full flex flex-col bg-slate-50"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <Navbar />
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, lg: 6 } }}>
        {/* Header Section */}
        <div className="main-resume-text mb-5 header-wrap flex items-center justify-between gap-3">
          <div className="resume-text">
            <h1 className="text-1xl">Resume Analysis Report</h1>
            <p className="text-base font-normal">
              Here's a breakdown of your skills and recommended job roles based
              on your resume.
            </p>
          </div>
          <div className="header-actions">
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ width: { xs: "100%", sm: "auto" } }}
              onClick={downloadReport}
            >
              Download Report
            </Button>
          </div>
        </div>
        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 results-grid">
          {/* Left Section: Roles + Skills */}
          <div className="lg:col-span-8 results-left">
            <div className="space-y-6">
              {/* Recommended Roles */}
              <div className="box-shadow rounded-md border border-slate-200 bg-white section-roles">
                <div className="p-6">
                  <h2 className="text-slate-800 text-lg font-semibold leading-snug">
                    Recommended Job Roles
                  </h2>
                  <p className="text-sm text-slate-500">
                    Based on your skills and experience, we recommend the
                    following roles.
                  </p>
                  <hr />
                </div>
                <div className="grid grid-cols-1 gap-4 border-t border-slate-200 equal-padding sm:grid-cols-2">
                  {recommendedRoles.map((r, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-roles roles-padding roles-padding-1 equal-padding-1 transition-colors hover:bg-slate-50"
                    >
                      <div
                        className="w-16 h-16 bg-center roles-padding bg-no-repeat bg-cover flex-shrink-0 role-icon"
                        style={{
                          backgroundImage: `url(${
                            roleIcons[r.role] || serverIcon
                          })`,
                        }}
                      ></div>
                      <div>
                        <p className="text-slate-800 text-base font-semibold leading-normal">
                          {r.role}
                        </p>
                        <p className="text-slate-800 text-base leading-normal">
                          Confidence: {r.score.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Skills Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 section-skills">
                <div className="rounded-md border border-slate-200 bg-white box-shadow card-current">
                  <div className="border-b border-slate-200 p-currentskills">
                    <h3 className="text-base font-semibold text-slate-800">
                      Current Skills
                    </h3>
                    <hr className="current-skills" />
                  </div>
                  <div className="flex flex-wrap gap-2 p-currentskills">
                    {uniqueCurrentSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center bg-blue-100 text-blue-800 add-padding"
                      >
                        {capitalize(skill)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-md border border-slate-200 bg-white box-shadow card-missing">
                  <div className="border-b border-slate-200 p-currentskills">
                    <h3 className="text-base font-semibold text-slate-800">
                      Missing Skills
                    </h3>
                    <hr className="missing-skills" />
                  </div>
                  <div className="flex flex-wrap gap-2 p-currentskills">
                    {uniqueMissingSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-md bg-red-100 text-sm font-medium text-red-800 add-padding-1"
                      >
                        {capitalize(skill)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resources Section: placed after right column for correct mobile order */}
              <div className="results-resources">
                <div className="rounded-md border border-slate-200 bg-white box-shadow add-margin section-resources">
                  <div className="resources-padding">
                    <h2 className="text-slate-800 text-large font-semibold leading-snug">
                      Suggested Learning Resources
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Bridge your skill gaps with these recommended resources.
                    </p>
                  </div>
                  <ul
                    className="border-t border-slate-200 list-style"
                    style={{ paddingLeft: "8px", margin: "0" }}
                  >
                    {resources.map((res, idx) => (
                      <li
                        key={idx}
                        className="transition-colors hover:bg-slate-50 border-b border-slate-200"
                      >
                        <a
                          className="group flex items-center justify-between gap-4 text-inherit no-underline resources py-4 px-6"
                          href={res.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {/* Start Group: Icon + Text */}
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 increase-padding resource-icon">
                              {res.icon ? (
                                <img
                                  src={res.icon}
                                  alt={res.name}
                                  className="w-10 h-10 object-contain"
                                />
                              ) : (
                                <MenuBook sx={{ color: "primary.main" }} />
                              )}
                            </div>
                            <div className="add-left-margin min-w-0 resources-text">
                              <p className="text-slate-800 text-resources font-semibold leading-normal decrease-margin resource-title">
                                {res.name}
                              </p>
                              <p className="text-slate-500 text-sm font-normal leading-normal move-to-left resource-desc">
                                {res.desc}
                              </p>
                            </div>
                          </div>
                          {/* End Group */}
                          <div className="right-icon flex-shrink-0">
                            <ChevronRight className="group-hover:text-slate-600" />
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="lg:col-span-4 results-right">
            <div className="space-y-6">
              {/* Pie Chart */}
              <div className="rounded-md border border-slate-200 bg-white p-6 box-shadow section-pie">
                <h3 className="text-slate-800 text-base font-semibold leading-snug mb-4">
                  Skills Distribution
                </h3>
                <div className="relative h-64 flex items-center justify-center">
                  <Doughnut
                    data={pieData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      cutout: "70%",
                    }}
                  />
                </div>
                <div className="skills-margin flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-blue-500"></div>
                    <span>Current Skills</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500"></div>
                    <span>Missing Skills</span>
                  </div>
                </div>
              </div>
              {/* Skill Frequency and Skill Gap Section */}
              <div className="rounded-md border border-slate-200 bg-white p-6 box-shadow section-bar">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-800 text-base font-semibold leading-snug">
                    {skillView === "frequency"
                      ? "Skill Frequency"
                      : "Skill Gap"}
                  </h3>
                  <ToggleButtonGroup
                    size="small"
                    exclusive
                    value={skillView}
                    onChange={(e, v) => v && setSkillView(v)}
                    aria-label="Skill chart view"
                  >
                    <ToggleButton value="frequency" aria-label="frequency">
                      Frequency
                    </ToggleButton>
                    <ToggleButton value="gap" aria-label="gap">
                      Gap
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                {skillView === "gap" && uniqueMissingSkills.length === 0 ? (
                  <div className="text-sm text-slate-500 h-64 flex items-center justify-center">
                    You have no missing skills. Great job!
                  </div>
                ) : (
                  <div className="relative h-64 flex items-center justify-center">
                    <Bar
                      data={skillView === "frequency" ? barData : gapBarData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                            grid: { color: "#e2e8f0" },
                            ticks: { color: "#64748b" },
                          },
                          x: {
                            grid: { display: false },
                            ticks: {
                              color: "#64748b",
                              padding: 10,
                            },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          tooltip: { backgroundColor: "#1e293b" },
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
