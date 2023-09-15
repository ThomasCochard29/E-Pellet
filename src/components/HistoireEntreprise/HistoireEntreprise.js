import React from "react";
import { useLocation } from "react-router-dom";

// CSS
import "./histoireEntreprise.css";

export default function HistoireEntreprise() {
  const location = useLocation();

  return (
    <div
      className="he-center-container"
      style={{
        marginTop: location.pathname === "/" ? "-4vw" : "",
        height: location.pathname === "/" ? "" : "63.3vh",
      }}
    >
      <div
        className="he-container"
        style={{
          position: location.pathname === "/" ? "relative" : "",
          top: location.pathname === "/" ? "-20%" : "",
          alignSelf: "center",
          backgroundColor: location.pathname === "/" ? "" : "transparent",
          boxShadow: location.pathname === "/" ? "" : "none",
        }}
      >
        <h2
          className="he-title"
          style={{
            textTransform: location.pathname === "/" ? "" : "uppercase",
          }}
        >
          Histoire de l'Entreprise
        </h2>
        <p className="he-text">
          Charogne de géritole de saint-sacrament de saint-ciboire de sacristi
          de bout d'ciarge de patente à gosse de mautadit de viarge d'enfant
          d'chienne de sacrament de saint-ciarge d'esprit.
        </p>
      </div>
    </div>
  );
}
