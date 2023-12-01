import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isEmpty } from "../Utils";

// CSS
import "./produit.css";

// Component
import Card from "../Card/Card";

// Redux
import { useSelector } from "react-redux"; // Import useDispatch

export default function Produit() {
  const [lastProduct, setLastProduct] = useState(null);
  const location = useLocation();

  // Redux
  const produits = useSelector((state) => state.produitReducer);
  // console.log(produits);

  useEffect(() => {
    if (!isEmpty(produits)) {
      setLastProduct(produits[produits.length - 1]);
    }
  }, [produits]);

  const ajouterAuPanier = (produit) => {
    // Récupérez le panier existant du stockage local (s'il existe)
    const panierExist = localStorage.getItem("panier");
    const panier = panierExist ? JSON.parse(panierExist) : [];

    // Ajoutez le produit actuel au panier
    panier.push(produit);

    // Enregistrez le panier mis à jour dans le stockage local
    localStorage.setItem("panier", JSON.stringify(panier));

    // Facultatif : Affichez un message de confirmation ou effectuez d'autres actions ici
    window.location.reload();
  };

  return (
    <div
      className="prod-center-container"
      style={{
        height: location.pathname === "/" ? "" : "69.5vh",
        margin: location.pathname === "/" ? "10vw 0" : "0",
      }}
    >
      {location.pathname === "/" && lastProduct ? (
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
              src={
                process.env.REACT_APP_API_URL +
                `/assets/${lastProduct.img_prod}`
              }
              alt={lastProduct.descrip_img}
              className="prod-img"
              style={{ width: location.pathname === "/" ? "" : "50%" }}
            />
          </section>
          <section className="prod-section-descrip" style={{ display: "flex" }}>
            <div style={{ padding: "0px 20px" }}>
              <p className="prod-text">{lastProduct.prix_prod} €</p>
            </div>
            <hr className="prod-hr" />
            <div style={{ flex: 1, padding: "0px 20px" }}>
              <p className="prod-text">{lastProduct.nom_prod}</p>
            </div>
            <hr className="prod-hr" />
            <div style={{ flex: 1, padding: "0px 10px" }}>
              <p className="prod-text-descrip">{lastProduct.descrip_prod}</p>
            </div>
          </section>
          <section className="section-btn-add-cart">
            <button
              className="button"
              onClick={() => ajouterAuPanier(lastProduct)}
            >
              Ajouter au Panier
            </button>
          </section>
        </div>
      ) : !isEmpty(produits) ? (
        <Card />
      ) : (
        <div
          className="prod-container"
          style={{
            backgroundColor: location.pathname === "/" ? "" : "transparent",
            boxShadow: location.pathname === "/" ? "" : "none",
          }}
        >
          <p>Probleme dans la récuperation des produits</p>
        </div>
      )}
    </div>
  );
}
