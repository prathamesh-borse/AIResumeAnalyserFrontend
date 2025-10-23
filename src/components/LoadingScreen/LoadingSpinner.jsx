import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex flex-col spinner-container">
      <div className="spinner" />
      <p className="mt-4 text-lg text-slate-700 font-medium">{text}</p>
    </div>
  );
}
