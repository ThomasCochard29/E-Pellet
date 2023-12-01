import React, { useEffect, useState } from "react";
import API from "../../actions/api";

// Image
import Success from "../../assets/Image/success.png";
import { useSelector } from "react-redux";

export default function CheckoutSuccess() {
  const [refresh, setRefresh] = useState(false);
  const userId = useSelector((state) => state.authReducer.user?.userId);
  const [userIdFetched, setUserIdFetched] = useState(false);

  // État local pour stocker les produits du panier
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    try {
      const cartData = await localStorage.getItem("panier");

      if (cartData !== null) {
        const parsedCart = JSON.parse(cartData);
        setCart(parsedCart);
      }
      console.log("panier récupéré");
    } catch (error) {
      console.error("Erreur lors du chargement du panier : ", error);
    }
  };

  useEffect(() => {
    loadCart();
    if (userId) {
      setUserIdFetched(true);
    }
  }, [userId]);

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

  useEffect(() => {
    if (userIdFetched) {
      createOrder();
    }
  }, [userIdFetched]);

  const createOrder = async () => {
    // console.log("Create Order");
    const products = uniqueCart;
    console.info(products);

    API.post("/order/add", {
      totalFinal,
      products,
      userId,
    })
      .then((response) => {
        let numberOrder = response.data.order_number; // Déclarez numberOrder ici avec let
        console.log(numberOrder);
        clearCart();
      })
      .catch((err) => console.error(err));
    setRefresh(!refresh);
  };

  // Ensuite, pour vider le panier
  const clearCart = async () => {
    try {
      await localStorage.removeItem("panier"); // Supprimez la clé "panier" du stockage local
      setCart([]);
      console.log("Panier vidé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du panier :", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={Success}
        alt="Success Payment"
        width={655}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}
