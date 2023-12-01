import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../actions/api";

export default function SearchDetail() {
  const { id_prod } = useParams(); // Récupérez l'identifiant du produit depuis l'URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Utilisez l'identifiant du produit pour récupérer les informations du produit depuis l'API
    API.get(`/produit/${id_prod}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id_prod]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section-body" style={{ height: "69.5vh" }}>
      <div className="row">
        <div className="example-2 card">
          <div className="wrapper">
            <div className="header"></div>
            <section className="section-img-produit">
              <img
                src={process.env.REACT_APP_API_URL + `/assets/${product.data.img_prod}`}
                alt={
                  product.data.length === "0"
                    ? "Produit Détail Picture"
                    : product.data.descrip_img
                }
              />
            </section>
            <div className="data">
              <div className="content">
                <span className="author">{product.data.prix_prod} €</span>
                <h1 className="title">
                  <a href="#">{product.data.nom_prod}</a>
                </h1>
                <p className="text">{product.data.descrip_prod}</p>
                <button className="button" style={{ visibility: "hidden" }}>
                  Ajouter au Panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
