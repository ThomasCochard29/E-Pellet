import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "../admin.css";
import "../Produit/datagridProduit.css";

// Image
import IconAdd from "../../../assets/icon/addbrown.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addCateg } from "../../../actions/categorie.action";
import { getCountCateg } from "../../../actions/categorie.action";

// Component
import AdminNavBar from "../AdminNavBar";
import Search from "../Search";
import SearchCategorie from "../SearchCategorie";

export default function AddCategorie() {
  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const categoryCount = useSelector((state) => state.categorieReducer); // Assurez-vous d'accéder à la propriété correcte dans votre state
  console.log(categoryCount);

  useEffect(() => {
    dispatch(getCountCateg());
  }, [dispatch]);

  //! ----------------- STATE -----------------

  // Récupération des Informations de la Catégorie pour l'Ajout
  const [addCategorie, setAddCategorie] = useState({
    nom_categ: "",
    poids_categ: "",
  });

  //! ----------------- FONCTION -----------------
  // Fonction pour Ajouter la Catégorie
  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    // Dispatch l'action d'ajout avec les données de la nouvelle catégorie
    dispatch(addCateg(addCategorie));
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={IconAdd} alt="Icon de l'ajout d'une catégorie" width={40} />
        <p>Catégorie Ajouté !</p>
      </div>
    );
    window.location.reload();
  };

  return (
    <div className="container">
      {/* NavBar Admin */}
      <AdminNavBar />

      {/* Contenue de la Page */}
      <div className="content">
        {/* Barre de recherche */}
        <section className="section-search">
          <SearchCategorie />
        </section>

        <h3
          style={{
            color: "var(--var-brown)",
            alignSelf: "start",
            fontSize: 24,
            fontWeight: "400",
            marginLeft: "3.6%",
          }}
        >
          Categories : ALL ({categoryCount.categoryCount})
        </h3>

        {/* Formulaire Ajout Catégorie */}
        <section
          style={{
            backgroundColor: "var(--var-green)",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            width: "90%",
            height: "70%",
            placeContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={(e) => handleAddFormSubmit(e)}>
            <div
              className="section-img-categ"
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                placeContent: "center",
              }}
            >
              <h2 style={{ color: "var(--var-cream)" }}>
                Information de la Catégorie
              </h2>
              {/* Nom de la Catégorie */}
              <div>
                <p style={{ color: "var(--var-cream)" }}>Nom de la Catégorie</p>
                <input
                  type="text"
                  placeholder="Entrer le Poids"
                  onChange={(event) =>
                    setAddCategorie((prevCateg) => ({
                      ...prevCateg,
                      nom_categ: event.target.value,
                    }))
                  }
                  style={{
                    display: "flex",
                    border: "2px solid rgba(197, 178, 159, 0.50)",
                    padding: "10px",
                    backgroundColor: "rgba(120, 86, 55, 0.50)",
                    placeContent: "center",
                    flexWrap: "wrap",
                    width: "362px",
                    height: "26px",
                    borderRadius: "10px",
                    color: "var(--var-cream)",
                  }}
                />
              </div>

              {/* Poids de la Catégorie */}
              <div>
                <p style={{ color: "var(--var-cream)" }}>
                  Poids de la Catégorie
                </p>
                <input
                  type="number"
                  placeholder="Entrer le Poids"
                  onChange={(event) =>
                    setAddCategorie((prevCateg) => ({
                      ...prevCateg,
                      poids_categ: event.target.value,
                    }))
                  }
                  style={{
                    display: "flex",
                    border: "2px solid rgba(197, 178, 159, 0.50)",
                    padding: "10px",
                    backgroundColor: "rgba(120, 86, 55, 0.50)",
                    placeContent: "center",
                    flexWrap: "wrap",
                    width: "362px",
                    height: "26px",
                    borderRadius: "10px",
                    color: "var(--var-cream)",
                  }}
                />
              </div>

              {/* Bouton */}
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="btn-add-style"
                sx={{
                  color: "var(--var-brown)",
                  backgroundColor: "var(--var-cream)",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontFamily: "Mova",
                  filter: "drop-shadow(8px 4px 10px)",
                  paddingX: "30px",
                  paddingY: "10px",
                  marginTop: "40px",
                }}
              >
                Publier la Catégorie
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="small"
                href="/admin/datagrid-categorie"
                className="btn-add-style"
                sx={{
                  color: "var(--var-cream)",
                  backgroundColor: "var(--var-brown)",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontFamily: "Mova",
                  filter: "drop-shadow(8px 4px 10px)",
                  paddingX: "30px",
                  paddingY: "10px",
                  marginTop: "40px",
                }}
              >
                Back To DataGrid
              </Button>
            </div>
          </form>
        </section>
      </div>
      <ToastContainer
        position="top-right"
        newestOnTop
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        bodyClassName="toastify-content"
        autoClose={5000}
      />
    </div>
  );
}
