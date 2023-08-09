import React from "react";
import { Link, useLocation } from "react-router-dom";

// CSS
import "./navBar.css";

// Image
import logoSvg from "../../assets/Image/PEFC_Logo.png";

export default function NavBar() {
  const location = useLocation();

  const lienMenu = [
    {
      id: 1,
      nom: "Histoire Entreprise",
      lien: "/histoire-entreprise",
    },
    {
      id: 2,
      nom: "Processus de Fabrication",
      lien: "/processusfabrication",
    },
    {
      id: 3,
      nom: "Produit",
      lien: "/produit",
    },
    {
      id: 4,
      nom: "Certification",
      lien: "/certification",
    },
    {
      id: 5,
      nom: "Contact",
      lien: "/contact",
    },
  ];

  // On parcourt le tableau lienMenu pour les afficher
  const mesLiens = lienMenu.map((lien, i) => (
    <Link key={i} className="nav-link" to={lien.lien}>
      <NavLinkWithBorder
        isActive={location.pathname === lien.lien}
        text={lien.nom}
      />
    </Link>
  ));

  return (
    <nav className="nav">
      <Link to={"/"} className="logoNav">
        <img src={logoSvg} alt="logo Pellet" width={70} />
      </Link>

      <ul>
        <li className="nav-item d-flex">{mesLiens}</li>
      </ul>
    </nav>
  );
}

function NavLinkWithBorder({ isActive, text }) {
  return (
    <a
      href
      style={{
        borderBottom: isActive ? "3px solid rgba(116, 154, 112, 1)" : "",
        transition: "border-bottom 0.3s linear",
        color: isActive ? "rgba(116, 154, 112, 1)" : "rgba(120, 86, 55, 1)",
        textDecoration: "none",
        fontSize: "24px",
        fontWeight: "500",
        padding: "8px 8px",
        letterSpacing: "1px",
        fontFamily: "Mova",
        textTransform: "capitalize",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {text}
    </a>
  );
}
