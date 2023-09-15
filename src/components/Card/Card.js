import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";

// CSS
import "./card.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProd } from "../../actions/produit.action";

export default function Card() {
  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const produits = useSelector((state) => state.produitReducer);

  useEffect(() => {
    dispatch(getProd());
  }, [dispatch]);

  // console.log(produits);

  // Fonction pour ajouter un produit au panier local storage
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
    <section className="section-body">
      {!isEmpty(produits)
        ? produits?.map((produit, index) => (
            <div key={index} className="row">
              <div className="example-2 card">
                <div className="wrapper">
                  <div className="header"></div>
                  <section className="section-img-produit">
                    <img
                      src={`http://localhost:5000/assets/${produit?.img_prod}`}
                      alt={produit?.descrip_img}
                    />
                  </section>
                  <div className="data">
                    <div className="content">
                      <span className="author">{produit?.prix_prod} €</span>
                      <h1 className="title">
                        <p href="#">{produit?.nom_prod}</p>
                      </h1>
                      <p className="text">{produit?.descrip_prod}</p>
                      <button
                        className="button"
                        onClick={() => ajouterAuPanier(produit)}
                      >
                        Ajouter au Panier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </section>
  );
}
