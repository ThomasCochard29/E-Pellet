import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../actions/api";
import { loadStripe } from "@stripe/stripe-js";

// CSS
import "./shoppingCart.css";

// Image
import CartAdd from "../../assets/icon/plus.png";
import CartTrash from "../../assets/icon/trash.png";
import Tiret from "../../assets/icon/tiret.png";

// Redux
import { useSelector } from "react-redux";

export default function ShoppingCart() {
  const [professionnel, setProfessionnel] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  const userId = useSelector((state) => state.authReducer.user?.userId);
  // console.log("USER ID :", userId);

  const professionnelTrue = () => {
    if (userId) {
      API.get(`/client/${userId}`)
        .then((res) => {
          setProfessionnel(res.data);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données :", error);
        });
    }
  };

  useEffect(() => {
    professionnelTrue();
  }, []);

  // console.log(professionnel?.data.is_professionnel);

  // État local pour stocker les produits du panier
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const cartData = await localStorage.getItem("panier");

      if (cartData !== null) {
        const parsedCart = JSON.parse(cartData);
        setCart(parsedCart);
      }
      console.log("panier récupérer");
    } catch (error) {
      console.error("Erreur lors du chargement du panier : ", error);
    }
  };

  const syncCart = async () => {
    const updatedCart = {
      userId: userId,
      cartItems: JSON.parse(localStorage.getItem("panier")),
    };

    // console.log(updatedCart);

    await API.post(`/cart/sync`, updatedCart)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadCart();
    if (isAuthenticated) {
      syncCart();
    }
  }, [refresh]);

  // console.log(cart);

  // Fonction pour supprimer un article du panier
  const removeProductFromCart = async (produit) => {
    try {
      const productIndex = cart.findIndex(
        (product) => product.id_prod === produit.id_prod
      );

      if (productIndex !== -1) {
        const panierExist = await localStorage.getItem("panier");
        const panier = panierExist ? JSON.parse(panierExist) : [];

        // Vérifiez si la quantité est supérieure à 1, puis décrémentez-la
        if (panier[productIndex].quantity > 1) {
          panier[productIndex].quantity -= 1;
        } else {
          // Si la quantité est égale à 1, retirez complètement le produit du panier
          panier.splice(productIndex, 1);
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        setCart(panier);
        setRefresh(!refresh);
        console.info("Moins 1");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du produit du panier : ",
        error
      );
    }
  };
  // Fonction pour ajouter un produit au panier local storage
  const addToCart = async (produit) => {
    try {
      const productIndex = cart.findIndex(
        (product) => product.id_prod === produit.id_prod
      );

      if (productIndex !== -1) {
        const panierExist = await localStorage.getItem("panier");
        const panier = panierExist ? JSON.parse(panierExist) : [];

        // Incrémentez la quantité du produit existant
        panier[productIndex].quantity += 1;

        localStorage.setItem("panier", JSON.stringify(panier));
        setCart(panier);
        setRefresh(!refresh);
        console.info("Plus 1");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier : ", error);
    }
  };

  // Filtrer les produits uniques dans le panier
  const uniqueCart = Array.from(
    new Set(cart?.map((product) => product.id_prod))
  ).map((id) => cart.find((product) => product.id_prod === id));

  // Calcul du subtotal
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.prix_prod * item.quantity;
  }, 0);

  // Calcul des frais de livraison (modifiable en fonction de votre logique)
  const fraisDeLivraison = 20; // Remplacez ceci par votre logique de calcul des frais de livraison

  // Calcul du total final
  const totalFinal = subtotal + fraisDeLivraison;

  // console.log(uniqueCart);

  // Stripe
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NryosCFE5X3Slec1Tk2ADIscxKuhYGPiEfI88mT3zMdOTFN2HldCJF6agMD91Ki9adn5oVLXOpFnfv0xLXIVMZP00rX0FeFCP"
    );

    const body = {
      products: uniqueCart,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="shopping-cart-body">
      <section className="shopping-cart-section">
        {/* Shopping Cart Content */}
        <div className="cart-div">
          <h1>Panier</h1>
          {cart.length === 0 ? (
            <div>
              <p className="cart-length-null">
                Vous n'avez aucun produit dans votre panier !
              </p>
            </div>
          ) : (
            uniqueCart.map((product, index) => (
              <>
                <section key={index} className="cart-section">
                  <img
                    src={
                      process.env.REACT_APP_API_URL +
                      `/assets/${product.img_prod}`
                    }
                    alt="Produit Card"
                    className="cart-section-img"
                  />
                  <section className="cart-section-descrip">
                    <div className="cart-div-left">
                      <h3>{product.nom_prod}</h3>
                      <p>{product.descrip_prod}</p>
                      <p>Quantity : {product.quantity}</p>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => removeProductFromCart(product)}
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
                    <section>
                      <div style={{ position: "absolute", right: "46vw" }}>
                        <p style={{ fontSize: "16px" }}>
                          {product.prix_prod} €
                        </p>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          right: "46vw",
                          marginTop: "2vw",
                        }}
                      >
                        <p style={{ fontSize: "16px" }}>
                          Prix total :{" "}
                          {(product.prix_prod * product.quantity).toFixed(2)} €
                        </p>
                      </div>
                    </section>
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
              {subtotal === 0 ? (
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
                  {subtotal.toFixed(2) + " EU€"}
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
              {professionnel?.data.is_professionnel ? (
                <p style={{ position: "absolute", right: "16vw" }}>Gratuit</p>
              ) : (
                <p style={{ position: "absolute", right: "16vw" }}>
                  {fraisDeLivraison} €
                </p>
              )}
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
                {subtotal === 0 ? (
                  <img
                    src={Tiret}
                    style={{
                      position: "absolute",
                      right: "15.7vw",
                      top: isAuthenticated ? "47.4vh" : "49.5vh",
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
                    {totalFinal.toFixed(2) + " EU€"}
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
                <button className="button" onClick={makePayment}>
                  Commander
                </button>
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
