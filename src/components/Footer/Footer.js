import React from "react";
import { useLocation } from "react-router-dom";

// CSS
import "./footer.css";

// Image
import imgInsta from "../../assets/Image/Instagram_logo.png";
import imgTwitter from "../../assets/Image/Logo_of_Twitter.png";

export default function Footer() {
  const location = useLocation();
  const styleLocation =
    location.pathname === "/admin" ||
    location.pathname === "/admin/datagrid-produit" ||
    location.pathname === "/admin/add-produit" ||
    location.pathname === "/admin/datagrid-categorie" ||
    location.pathname === "/admin/add-categorie" ||
    location.pathname === "/admin/commande" ||
    location.pathname === "/admin/user-admin"
      ? { display: "none" }
      : {};

  let contentMarginTop = "auto";

  if (location.pathname !== "/") {
    contentMarginTop = "11.2vh"; // Ajustez cette valeur en fonction de vos besoins
  }

  return (
    <footer
      style={Object.assign({}, styleLocation, { marginTop: contentMarginTop })}
    >
      <div className="footer-cgu" style={{ width: "16%" }}>
        <p>CGU - Mention Legale</p>
      </div>
      <div className="footer-rs">
        <img
          src={imgInsta}
          alt="Logo Insta"
          width={50}
          height={50}
          style={{ marginRight: "20px" }}
        />
        <img src={imgTwitter} alt="Logo Twitter" width={50} height={40} />
      </div>
    </footer>
  );
}
