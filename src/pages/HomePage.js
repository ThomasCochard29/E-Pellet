import React from "react";

// Components
import Carousel from "../components/Carousel/Carousel.js";
import HistoireEntreprise from "../components/HistoireEntreprise/HistoireEntreprise.js";
import ProcessFabrication from "../components/ProcessFabrication/ProcessFabrication.js";
import Produit from "../components/Produit/Produit.js";
import Certification from "../components/Certification/Certification.js";
import Contact from "../components/Contact/Contact.js";

export default function HomePage() {
  return (
    <>
      <Carousel />
      <HistoireEntreprise />
      <ProcessFabrication />
      <Produit />
      <Certification />
      <Contact />
    </>
  );
}
