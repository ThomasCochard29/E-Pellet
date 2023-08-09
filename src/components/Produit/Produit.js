import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// CSS
import "./produit.css";

// Image
import prodImg from "../../assets/Image/sac_superpellet.png";
import SelectPoids from "../SelectPoids/SelectPoids";

export default function Produit() {
  const [selectedWeight, setSelectedWeight] = useState("Selection du Poids"); // Set an initial value for selectedWeight
  const priceMap = {
    10: "10",
    50: "50",
    100: "100",
  };

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
  };

  const location = useLocation();

  return (
    <div
      className="prod-center-container"
      style={{ height: location.pathname === "/" ? "" : "70vh" }}
    >
      <div
        className="prod-container"
        style={{
          backgroundColor: location.pathname === "/" ? "" : "transparent",
          boxShadow: location.pathname === "/" ? "" : "none",
        }}
      >
        <h2
          className="prod-title"
          style={{
            textTransform: location.pathname === "/" ? "" : "uppercase",
          }}
        >
          Produit
        </h2>
        <section className="prod-section-img">
          <img
            src={prodImg}
            alt="Produit Pellet"
            className="prod-img"
            style={{ width: location.pathname === "/" ? "" : "50%" }}
          />
        </section>
        <section className="prod-section-descrip">
          {selectedWeight === "Selection du Poids" ? (
            ""
          ) : (
            <>
              <p className="prod-text">{priceMap[selectedWeight]}€</p>{" "}
              <hr className="prod-hr" />
            </>
          )}
          <SelectPoids onWeightChange={handleWeightChange} />
          <hr className="prod-hr" />
          <p className="prod-text">Pellet</p>
        </section>
      </div>
    </div>
  );
}
