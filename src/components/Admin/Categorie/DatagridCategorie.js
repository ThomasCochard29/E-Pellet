import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "../../Utils.js";
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "../admin.css";
import "../Produit/datagridProduit.css";

// Image
import IconDelete from "../../../assets/icon/deletebrown.png";
import IconUpdate from "../../../assets/icon/updatebrown.png";

// Components
import AdminNavBar from "../AdminNavBar.js";
import Search from "../Search.js";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCateg,
  editCateg,
  getCateg,
} from "../../../actions/categorie.action.js";
import SearchCategorie from "../SearchCategorie.js";

export default function DatagridCategorie() {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    textAlign: "center",
    background: "var(--var-green)",
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px"
  };

  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const categorie = useSelector((state) => state.categorieReducer);

  useEffect(() => {
    dispatch(getCateg());
  }, [dispatch]);

  //! ----------------- STATE -----------------
  // State pour Ouvrir / Fermer les Modaux / PopUp

  //? Modal / PopUp Update
  const [isModalOpen, setIsModalOpen] = useState(false);

  //? Modal / PopUp Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // Récupération de la Catégorie Sélectionné
  const [selectedCateg, setSelectedCateg] = useState(null);

  // Récupération des Informations de la Catégorie pour Update
  const [updatedCateg, setUpdatedCateg] = useState({
    id_categ: "",
    nom_categ: "",
    poids_categ: "",
  });

  // Récupération des Informations de la Catégorie pour Delete
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  //! ----------------- FONCTION -----------------
  // Fonction pour Récuperer les Informations pour Update la Categorie
  const handleUpdateClick = (categorie) => {
    setSelectedCateg(categorie);
    setUpdatedCateg({
      id_categ: categorie.id_categ,
      nom_categ: categorie.nom_categ,
      poids_categ: categorie.poids_categ,
    });
    // console.log(selectedCateg);
    // console.log(updatedCateg);
    setIsModalOpen(true);
  };

  // Fonction pour Update la Categorie
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(updatedCateg.id_categ);

    // Dispatch l'action de mise à jour avec les données du produit mis à jour
    dispatch(editCateg(updatedCateg, updatedCateg.id_categ)); // Utilisez les données mises à jour du formulaire
    setIsModalOpen(false); // Fermer le modal après la mise à jour
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={IconUpdate}
          alt="Icon de l'update de la categorie"
          width={40}
        />
        <p>Categorie Update !</p>
      </div>
    );
    window.location.reload();
  };

  // Fonction pour Delete la Categorie
  const handleDeleteClick = (categorie) => {
    // console.log(categorie);
    setCategoryToDelete(categorie);
    setIsModalDeleteOpen(true);
  };

  // Fonction pour la Confirmation de la Suppression de la Categorie
  const handleDeleteYesClick = () => {
    dispatch(deleteCateg(categoryToDelete)); // Assurez-vous d'ajouter l'action de suppression appropriée
    setCategoryToDelete(null);
    handleModalClose();
    toast(
      <div>
        <img src={IconDelete} alt="Icon d'une poubelle" width={40} />
        <p>Catégorie Supprimé !</p>
      </div>
    );
  };

  // Fonction pour la Fermeture du Modal / PopUp
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalDeleteOpen(false);
  };

  //! ----------------- MUI DATAGRID -----------------
  // Variable pour la Création des colonnes et lignes pour la DataGrid
  const columns = [
    { field: "id_categ", headerName: "ID", width: 10 },
    { field: "nom_categ", headerName: "Nom de la Categorie", width: 150 },
    { field: "poids_categ", headerName: "Poids de la Categorie", width: 150 },
    {
      field: "update",
      headerName: "Update",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          style={{
            backgroundColor: "var(--var-brown)",
            color: "var(--var-cream)",
            border: "none",
          }}
          onClick={() => handleUpdateClick(params.row)}
        >
          Update
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          style={{
            backgroundColor: "var(--var-cream)",
            color: "var(--var-brown)",
            border: "none",
          }}
          onClick={() => handleDeleteClick(params.row.id_categ)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      {/* NavBar Admin */}
      <AdminNavBar />

      {/* Contenue de la Page */}
      <div class="content">
        {/* Barre de recherche */}
        <section className="section-search">
          <SearchCategorie />
        </section>

        {/* Bouton Ajout Catégorie */}
        <section className="section-btn-add" style={{ marginRight: "27.8%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            href="/admin/add-categorie"
          >
            Ajout Catégorie
          </Button>
        </section>

        {/* DataGrid Categorie */}
        <div
          style={{
            height: "auto",
            width: "auto",
          }}
        >
          {!isEmpty(categorie) ? (
            // Affichage de la DataGrid
            // Si on récupere les catégories de la base de données
            <DataGrid
              style={{
                alignItems: "center",
                border: "none",
                backgroundColor: "var(--var-green)",
                boxShadow: "27px 27px 54px var(--var-brown)",
              }}
              rows={categorie} // Utilisez le tableau categorie comme source de données
              columns={columns}
              loading={categorie.length === 0}
              disableRowSelectionOnClick
              disableCellSelectionOnClick
              getRowId={(row) => row.id_categ}
              pageSize={10} // Utilisez pageSize au lieu de pagination
              pageSizeOptions={[5, 10, 25, 100]}
            />
          ) : (
            // Affichage de la DataGrid
            // Si on ne récupere aucune catégorie
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress
                style={{ color: "var(--var-green)" }}
                size={100}
              />
              <p
                style={{
                  color: "var(--var-brown)",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Récupération des Categories en Attente
              </p>
            </div>
          )}
        </div>

        {/* Modal / PopUp pour l'Update */}
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          size={50}
          style={styleModal}
        >
          <div className="modal-content">
            <h2>Update Categorie</h2>
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: "25%",
              }}
            >
              <TextField
                className={"textfield"}
                label="Nom de la Categorie"
                variant="standard"
                defaultValue={selectedCateg?.nom_categ || ""}
                onChange={(event) =>
                  setUpdatedCateg((prevCateg) => ({
                    ...prevCateg,
                    nom_categ: event.target.value,
                  }))
                }
              />
              <TextField
                className="textfield"
                label="Poids de la Catégorie"
                variant="standard"
                defaultValue={selectedCateg?.poids_categ || ""}
                onChange={(event) =>
                  setUpdatedCateg((prevCateg) => ({
                    ...prevCateg,
                    poids_categ: event.target.value,
                  }))
                }
              />
              <input type="hidden" value={selectedCateg?.id_categ} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginTop: "10px" }}
                onClick={(e) => handleModalClose()}
              >
                Close
              </Button>
            </form>
          </div>
        </Modal>

        {/* Modal / PopUp pour le Delete */}
        <Modal
          open={isModalDeleteOpen}
          onClose={handleModalClose}
          size={50}
          style={styleModal}
        >
          <div className="modal-content">
            <h2>
              Veux-tu vraiment supprimer cette catégorie : {categoryToDelete} ?
            </h2>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleDeleteYesClick()}
            >
              Oui
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "20px" }}
              onClick={(e) => handleModalClose()}
            >
              Non
            </Button>
          </div>
        </Modal>
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
