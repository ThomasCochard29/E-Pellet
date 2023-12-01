import React from "react";
import { useLocation } from "react-router-dom";

// CSS
import "./processFabrication.css";

// Image
import processFab from "../../assets/Image/processFab.png";

export default function ProcessFabrication() {
  const location = useLocation();

  return (
    <div
      className="process-center-container"
      style={{ height: location.pathname === "/" ? "" : "69.5vh" }}
    >
      <div
        className="process-container"
        style={{
          // marginTop: location.pathname === "/" ? "" : "4%",
          alignSelf: "center",
          backgroundColor: location.pathname === "/" ? "" : "transparent",
          boxShadow: location.pathname === "/" ? "" : "none",
        }}
      >
        <h2 className="process-title">Processus de Fabrication</h2>
        <section className="process-section">
          <img src={processFab} alt="logo Pellet" className="process-img" />
          <hr className="process-hr" />
          <img src={processFab} alt="logo Pellet" className="process-img" />
          <hr className="process-hr" />
          <img src={processFab} alt="logo Pellet" className="process-img" />
          <hr className="process-hr" />
          <img src={processFab} alt="logo Pellet" className="process-img" />
        </section>
      </div>
    </div>
  );
}
