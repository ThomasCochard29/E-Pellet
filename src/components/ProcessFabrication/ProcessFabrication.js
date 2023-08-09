import React from "react";
import { useLocation } from "react-router-dom";

// CSS
import "./processFabrication.css";

// Image
import processFab from "../../assets/Image/processFab.png";

export default function ProcessFabrication() {
  const widthImg = 220;
  const location = useLocation();

  return (
    <div
      className="process-center-container"
      style={{ height: location.pathname === "/" ? "" : "70vh" }}
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
          <img
            src={processFab}
            alt="logo Pellet"
            width={widthImg}
            className="process-img"
          />
          <hr className="process-hr" />
          <img
            src={processFab}
            alt="logo Pellet"
            width={widthImg}
            className="process-img"
          />
          <hr className="process-hr" />
          <img
            src={processFab}
            alt="logo Pellet"
            width={widthImg}
            className="process-img"
          />
          <hr className="process-hr" />
          <img
            src={processFab}
            alt="logo Pellet"
            width={widthImg}
            className="process-img"
          />
        </section>
      </div>
    </div>
  );
}
