import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// CSS
import "./shoppingCart.css";

// Image
import CartAdd from "../../assets/icon/plus.png";
import CartTrash from "../../assets/icon/trash.png";
import Tiret from "../../assets/icon/tiret.png";

// Redux
import { useSelector } from "react-redux";

export default function ShoppingCart() {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

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

  // console.log(cart);

  // Fonction pour calculer la quantité de chaque produit dans le panier
  const calculateProductQuantity = (productId) => {
    const productQuantity = cart.reduce((total, product) => {
      if (product.id_prod === productId) {
        return total + 1;
      }
      return total;
    }, 0);
    return productQuantity;
  };

  // console.log(cart);

  // Fonction pour supprimer un article du panier
  const removeProductFromCart = (productId) => {
    const productIndex = cart.findIndex(
      (product) => product.id_prod === productId
    );

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(productIndex, 1);
      setCart(updatedCart);

      // Mettre à jour le panier dans le stockage local
      localStorage.setItem("panier", JSON.stringify(updatedCart));
      window.location.reload();
    }
  };

  // Fonction pour ajouter un produit au panier local storage
  const addToCart = (produit) => {
    const productIndex = cart.findIndex(
      (product) => product.id_prod === produit.id_prod
    );
    // console.log(productIndex);

    if (productIndex !== -1) {
      // Récupérez le panier existant du stockage local (s'il existe)
      const panierExist = localStorage.getItem("panier");
      const panier = panierExist ? JSON.parse(panierExist) : [];

      // Ajoutez le produit actuel au panier
      panier.push(produit);

      // Enregistrez le panier mis à jour dans le stockage local
      localStorage.setItem("panier", JSON.stringify(panier));
      window.location.reload();
    }
  };

  // Fonction pour calculer le sous-total
  const calculateSubtotal = () => {
    let subtotal = 0;
    for (const product of cart) {
      subtotal += product.prix_prod;
    }
    return subtotal;
  };

  // Fonction pour calculer le total (sous-total + frais de livraison)
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    // Ajoutez ici les frais de livraison si nécessaire
    const fraisLivraison = 0; // Vous pouvez définir les frais de livraison ici
    return subtotal + fraisLivraison;
  };

  // Filtrer les produits uniques dans le panier
  const uniqueCart = Array.from(
    new Set(cart.map((product) => product.id_prod))
  ).map((id) => cart.find((product) => product.id_prod === id));

  return (
    <div
      style={{
        display: "flex",
        placeContent: "center",
        height: "70vh",
        flexWrap: "wrap",
        color: "white",
      }}
    >
      <section style={{ width: "70%", display: "flex" }}>
        {/* Shopping Cart Content */}
        <div style={{ flex: "1", padding: "10px" }}>
          <h1>Panier</h1>
          {cart.length === 0 ? (
            <div>
              <p
                style={{
                  fontSize: "28px",
                  color: "var(--var-brown)",
                  fontWeight: "600",
                }}
              >
                Vous n'avez aucun produit dans votre panier !
              </p>
            </div>
          ) : (
            uniqueCart.map((product, index) => (
              <>
                <section key={index} style={{ display: "flex" }}>
                  <img
                    src={`http://localhost:5000/assets/${product.img_prod}`}
                    alt="Produit Card"
                    width={100}
                    style={{ margin: "10px 10px", objectFit: "scale-down" }}
                  />
                  <section style={{ display: "flex" }}>
                    <div>
                      <h3 style={{ fontWeight: "normal" }}>
                        {product.nom_prod}
                      </h3>
                      <p style={{ fontSize: "16px" }}>{product.descrip_prod}</p>
                      <p style={{ fontSize: "16px" }}>
                        Quantity : {calculateProductQuantity(product.id_prod)}
                      </p>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => removeProductFromCart(product.id_prod)}
                      >
                        <img
                          src={CartTrash}
                          alt="Supprimer un Article"
                          width={34}
                        />
                      </button>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => addToCart(product)}
                      >
                        <img
                          src={CartAdd}
                          alt="Ajouter un Article"
                          width={34}
                        />
                      </button>
                    </div>
                    <div style={{ position: "absolute", right: "46vw" }}>
                      <p style={{ fontSize: "16px" }}>{product.prix_prod} €</p>
                    </div>
                  </section>
                </section>
                <hr style={{ border: "var(--var-brown) 1px solid" }} />
              </>
            ))
          )}
        </div>
        {/* Récapitulatif Commande */}
        <div style={{ padding: "10px", width: "40%" }}>
          <h1>Récapitulatif</h1>
          <section style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "2px 0px",
              }}
            >
              <p>Sous-Total</p>
              {calculateSubtotal() === 0 ? (
                <img
                  src={Tiret}
                  style={{
                    position: "absolute",
                    right: "15.7vw",
                    top: isAuthenticated ? "31.7vh" : "35.3vh",
                  }}
                  width={40}
                  alt=""
                />
              ) : (
                <p
                  style={{
                    position: "absolute",
                    right: "16vw",
                  }}
                >
                  {calculateSubtotal().toFixed(2) + " EU€"}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p>
                Frais estimés de prise
                <br /> en charge et d'expédition
              </p>
              <p style={{ position: "absolute", right: "16vw" }}>Gratuit</p>
            </div>
            <section>
              <hr
                style={{ border: "var(--var-brown) 1px solid", width: "100%" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p>Total</p>
                {calculateTotal() === 0 ? (
                  <img
                    src={Tiret}
                    style={{
                      position: "absolute",
                      right: "15.7vw",
                      top: isAuthenticated ? "45.9vh" : "49.5vh",
                    }}
                    width={40}
                    alt=""
                  />
                ) : (
                  <p
                    style={{
                      position: "absolute",
                      right: "16vw",
                    }}
                  >
                    {calculateSubtotal().toFixed(2) + " EU€"}
                  </p>
                )}
              </div>
              <hr
                style={{ border: "var(--var-brown) 1px solid", width: "100%" }}
              />
            </section>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                placeContent: "center",
              }}
            >
              {isAuthenticated ? (
                <button className="button">Commander</button>
              ) : (
                <Link to="/login">
                  <button className="button">Connexion</button>
                </Link>
              )}
              {isAuthenticated ? (
                <button className="buttonPaypal">
                  <img
                    src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png"
                    alt="PayPal"
                  />
                </button>
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
