import React from "react";

// CSS
import "./certification.css";

// Image
import certifImg from "../../assets/Image/PEFC_Logo.png";
import { useLocation } from "react-router-dom";

export default function Certification() {
  const location = useLocation();

  return (
    <div
      className="certif-center-container"
      style={{ height: location.pathname === "/" ? "" : "69.5vh" }}
    >
      <div
        className="certif-container"
        style={{
          alignSelf: "center",
          marginTop: location.pathname === "/" ? "" : "0",
          backgroundImage: location.pathname === "/" ? "" : "none",
          boxShadow: location.pathname === "/" ? "" : "none",
        }}
      >
        <h2 className="certif-title">Certification</h2>
        <section className="certif-section">
          <img src={certifImg} alt="logo Pellet" className="certif-img" />
          <img src={certifImg} alt="logo Pellet" className="certif-img" />
          <img src={certifImg} alt="logo Pellet" className="certif-img" />
          <img src={certifImg} alt="logo Pellet" className="certif-img" />
        </section>
      </div>
    </div>
  );
}
