import React from "react";
import { Routes, Route } from "react-router-dom";

// Component
import NavBar from "./Navbar/NavBar.js";
import HistoireEntreprise from "../components/HistoireEntreprise/HistoireEntreprise.js";
import ProcessFabrication from "../components/ProcessFabrication/ProcessFabrication.js";
import Produit from "../components/Produit/Produit";
import Certification from "../components/Certification/Certification";
import Contact from "../components/Contact/Contact";
import Footer from "./Footer/Footer.js";

// Page
import HomePage from "../pages/HomePage.js";

export default function Navigation() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/histoire-entreprise" element={<HistoireEntreprise />} />
        <Route path="/processusfabrication" element={<ProcessFabrication />} />
        <Route path="/produit" element={<Produit />} />
        <Route path="/certification" element={<Certification />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}
