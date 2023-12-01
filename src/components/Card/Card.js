import React, { useEffect, useState } from "react";
import { isEmpty } from "../Utils";

// CSS
import "./card.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getProd } from "../../actions/produit.action";

export default function Card() {
  const [cart, setCart] = useState([]);
  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const produits = useSelector((state) => state.produitReducer);

  useEffect(() => {
    dispatch(getProd());
  }, [dispatch]);

  // console.log(produits);

  // Fonction pour ajouter un produit au panier local storage
  const ajouterAuPanier = async (produit) => {
    try {
      // Récupérer le panier actuel depuis le stockage local
      const cartData = localStorage.getItem("panier");
      let updatedCart = [];

      if (cartData !== null) {
        updatedCart = JSON.parse(cartData);
      }

      // Vérifie si le produit existe déjà dans le panier
      const existingProductIndex = updatedCart.findIndex(
        (product) => product.id_prod === produit.id_prod
      );

      if (existingProductIndex !== -1) {
        // Si le produit existe déjà, incrémente la quantité
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        // Sinon, ajoutez le produit avec une quantité de 1
        produit.quantity = 1;
        updatedCart.push(produit);
      }

      // Mettre à jour le panier dans le stockage local
      localStorage.setItem("panier", JSON.stringify(updatedCart));

      // Mettre à jour l'état du panier dans l'application
      setCart(updatedCart);
      // console.info("Produit ajouté au panier");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier : ", error);
    }
  };

  return (
    <section className="section-body">
      {!isEmpty(produits) ? (
        produits?.map((produit, index) => (
          <div key={index} className="row">
            <div className="example-2 card">
              <div className="wrapper">
                <div className="header"></div>
                <section className="section-img-produit">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      `/assets/${produit?.img_prod}`
                    }
                    alt={produit?.descrip_img}
                  />
                </section>
                <div className="data">
                  <div className="content">
                    <span className="author">{produit?.prix_prod} €</span>
                    <h1 className="title">
                      <p>{produit?.nom_prod}</p>
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
      ) : (
        <p>Problème d'Affichage des Cards</p>
      )}
    </section>
  );
}
