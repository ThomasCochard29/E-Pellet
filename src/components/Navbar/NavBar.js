import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// CSS
import "./navBar.css";

// Image
import logoSvg from "../../assets/Image/PEFC_Logo.png";
import IconLogin from "../../assets/icon/icons8-utilisateur-60.png";
import IconAdmin from "../../assets/icon/admin.png";
import IconShoppingCart from "../../assets/icon/shopping-sac.png";

// Component
import Logout from "../User/Logout.js";

// Redux
import { useSelector } from "react-redux";

export default function NavBar() {
  // État local pour stocker les produits du panier
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Récupérer le panier depuis le stockage local
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("panier"));

    if (cartFromLocalStorage) {
      // Mettre à jour l'état local avec les produits du panier
      setCart(cartFromLocalStorage);
    }
  }, []);

  const location = useLocation();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const isAdmin = useSelector((state) => state.authReducer.user?.role_client);

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
    <nav
      className="nav"
      style={
        location.pathname === "/admin" ||
        location.pathname === "/admin/datagrid-produit" ||
        location.pathname === "/admin/add-produit" ||
        location.pathname === "/admin/datagrid-categorie" ||
        location.pathname === "/admin/add-categorie" ||
        location.pathname === "/admin/commande" ||
        location.pathname === "/admin/user-admin"
          ? { display: "none" }
          : {}
      }
    >
      <Link to={"/"} className="logoNav">
        <img src={logoSvg} alt="logo Pellet" width={70} />
      </Link>

      <ul style={{ alignItems: "center" }}>
        <li className="nav-item d-flex">{mesLiens}</li>
        {!isAuthenticated && (
          <Link to="/login" className="nav-link">
            <NavLinkWithBorder isActive={location.pathname === "/login"} />
            <img
              src={IconLogin}
              alt="Icon User Login"
              style={{ width: "50px" }}
            />
          </Link>
        )}
        {isAuthenticated && isAdmin === "admin" && (
          <Link to="/admin" className="nav-link">
            <NavLinkWithBorder isActive={location.pathname === "/login"} />
            <img
              src={IconAdmin}
              alt="Icon User Login"
              style={{ width: "50px" }}
            />
          </Link>
        )}
        <Logout />
        <Link to="/shopping-cart" className="nav-link">
          <NavLinkWithBorder isActive={location.pathname === "/login"} />
          <img
            src={IconShoppingCart}
            alt="Icon User Login"
            style={{ width: "50px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "2vw",
              right: "0.2vw",
              backgroundColor: "var(--var-brown)",
              color: "white",
              borderRadius: "50%",
              padding: "5px 10px",
              fontSize: "16px",
            }}
          >
            {cart.length}
          </div>
        </Link>
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
      }}
    >
      {text}
    </a>
  );
}
