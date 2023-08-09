import React, { useState } from "react";

// CSS
import './selectPoids.css'

export default function SelectPoids({ onWeightChange }) {
  const options = ["Selection du Poids","10", "50", "100"];
  const [selectedValue, setSelectedValue] = useState("Selection du Poids");

  const handleWeightChange = (selectedItem) => {
    setSelectedValue(selectedItem); // Update the selected weight
    onWeightChange(selectedItem); // Pass the selected weight to the parent component
  };

  if (selectedValue === "") {
    setSelectedValue("Selection du Poids");
  }

  return (
    <div className="select">
      <select
        onChange={(event) => handleWeightChange(event.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
