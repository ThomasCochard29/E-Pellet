import React, { useState } from "react";

// Redux
import { isEmpty } from "../Utils.js";

// CSS
import "./selectPoids.css";

export default function SelectPoids({ onWeightChange, onCategoryChange, categories }) {
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
        onChange={(event) => {
          handleWeightChange(event.target.value);
          onCategoryChange(
            event.target.selectedOptions[0].getAttribute("data-id")
          );
        }}
      >
        {/* Mapper les catégories aux options */}
        {!isEmpty(categories)
          ? categories?.map((category) => (
              <option key={category.id_categ} value={category.nom_categ}>
                {category.nom_categ}
                {/* Supposons que vous avez un champ 'name' dans votre catégorie */}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
}
