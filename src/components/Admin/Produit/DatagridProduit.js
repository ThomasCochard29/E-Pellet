import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "../../Utils.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "../admin.css";
import "./datagridProduit.css";

// Image
import IconDelete from "../../../assets/icon/deletebrown.png";
import IconUpdate from "../../../assets/icon/updatebrown.png";

// Components
import AdminNavBar from "../AdminNavBar.js";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProd,
  editProd,
  getProd,
} from "../../../actions/produit.action.js";
import { getCateg } from "../../../actions/categorie.action.js";

// MUI
import {
  Button,
  CircularProgress,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import Search from "../Search.js";

export default function DatagridProduit() {
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
  const produits = useSelector((state) => state.produitReducer);
  const categorie = useSelector((state) => state.categorieReducer);
  // console.log(produits);
  // console.log(categorie);

  useEffect(() => {
    dispatch(getProd());
    dispatch(getCateg());
  }, [dispatch]);

  //! ----------------- STATE -----------------
  // State pour Ouvrir / Fermer les Modaux / PopUp
  //? Modal / PopUp Update
  const [isModalOpen, setIsModalOpen] = useState(false);

  //? Modal / PopUp Delete
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  // Récupération de la Catégorie Sélectionné
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Récupération des Informations du Produit pour Update
  const [updatedProduct, setUpdatedProduct] = useState({
    id_prod: "",
    nom_prod: "",
    descrip_prod: "",
    prix_prod: "",
    img_prod: "",
    descrip_img: "",
    id_categ: "",
  });

  // Récupération des Informations du Produit pour Delete
  const [produitToDelete, setProduitToDelete] = useState(null);

  //! ----------------- FONCTION -----------------
  // Fonction pour Récuperer les Informations pour Update le Produit
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      id_prod: product.id_prod,
      nom_prod: product.nom_prod,
      descrip_prod: product.descrip_prod,
      prix_prod: product.prix_prod,
      img_prod: product.img_prod,
      descrip_img: product.descrip_img,
      id_categ: product.id_categ,
    });
    // console.log(selectedProduct);
    // console.log(updatedProduct);
    setIsModalOpen(true);
  };

  // Fonction pour Update le Produit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(updatedProduct.id_prod);
    // Dispatch l'action de mise à jour avec les données du produit mis à jour
    dispatch(editProd(updatedProduct, updatedProduct.id_prod)); // Utilisez les données mises à jour du formulaire
    setIsModalOpen(false); // Fermer le modal après la mise à jour
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={IconUpdate} alt="Icon de l'update du produit" width={40} />
        <p>Produit Update !</p>
      </div>
    );
    window.location.reload();
  };

  // Fonction pour Delete le Produit
  const handleDeleteClick = (produit) => {
    console.log(produit);
    setProduitToDelete(produit);
    setIsModalDeleteOpen(true);
  };

  // Fonction pour la Confirmation de la Suppression de la Categorie
  const handleDeleteYesClick = () => {
    dispatch(deleteProd(produitToDelete)); // Assurez-vous d'ajouter l'action de suppression appropriée
    setProduitToDelete(null);
    handleModalClose();
    toast(
      <div>
        <img src={IconDelete} alt="Icon d'une poubelle" width={40} />
        <p>Produit Supprimé !</p>
      </div>
    );
  };

  // Fonction pour la Fermeture du Modal / PopUp
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalDeleteOpen(false);
  };

  // Variable pour la Création des colonnes et lignes pour la DataGrid
  const columns = [
    { field: "id_prod", headerName: "ID", width: 10 },
    { field: "nom_prod", headerName: "Nom du produit", width: 150 },
    { field: "descrip_prod", headerName: "Description du produit", width: 150 },
    { field: "prix_prod", headerName: "Prix du produit", width: 105 },
    {
      field: "img_prod",
      headerName: "Image du produit",
      width: 150,
      renderCell: (params) => (
        <img src={`http://localhost:5000/assets/${params.value}`} width={50} />
      ),
    },
    {
      field: "descrip_img",
      headerName: "Description de l'image du produit",
      width: 200,
    },
    { field: "id_categ", headerName: "Id de la Categorie", width: 150 },
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
          onClick={() => handleDeleteClick(params.row.id_prod)}
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
          <Search />
        </section>

        {/* Bouton Ajout Catégorie */}
        <section className="section-btn-add" style={{ marginRight: "69.6%" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            href="/admin/add-produit"
          >
            Ajouter un Produit
          </Button>
        </section>

        {/* DataGrid Produit */}
        <div
          style={{
            height: "auto",
            width: "auto",
          }}
        >
          {!isEmpty(produits) ? (
            <DataGrid
              style={{
                alignItems: "center",
                border: "none",
                backgroundColor: "var(--var-green)",
                boxShadow: "27px 27px 54px var(--var-brown)",
              }}
              rows={produits} // Utilisez le tableau produits comme source de données
              columns={columns}
              loading={produits.length === 0}
              disableRowSelectionOnClick
              disableCellSelectionOnClick
              getRowId={(row) => row.id_prod}
              pageSize={10} // Utilisez pageSize au lieu de pagination
              pageSizeOptions={[5, 10, 25, 100]}
            />
          ) : (
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
                Récupération des Produits en Attente
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
          className="modal-update"
        >
          <div className="modal-content">
            <h2>Update Produit</h2>
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                marginLeft: "25%",
              }}
            >
              {/* Exemple de champ de formulaire */}
              <TextField
                className="textfield"
                label="Nom du Produit"
                variant="standard"
                defaultValue={selectedProduct?.nom_prod || ""}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    nom_prod: event.target.value,
                  }))
                }
              />
              <TextField
                className="textfield"
                label="Description du Produit"
                multiline
                variant="standard"
                defaultValue={selectedProduct?.descrip_prod || ""}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    descrip_prod: event.target.value,
                  }))
                }
              />
              <TextField
                className="textfield"
                label="Prix du Produit"
                variant="standard"
                defaultValue={selectedProduct?.prix_prod || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    prix_prod: event.target.value,
                  }))
                }
              />
              <TextField
                className="textfield"
                label="Image du Produit"
                variant="standard"
                defaultValue={selectedProduct?.img_prod || ""}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    img_prod: event.target.value,
                  }))
                }
              />
              <TextField
                className="textfield"
                multiline
                label="Description de l'Image du Produit"
                variant="standard"
                defaultValue={selectedProduct?.descrip_img || ""}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    descrip_img: event.target.value,
                  }))
                }
              />
              <InputLabel>Catégorie du Produit</InputLabel>
              <Select
                value={updatedProduct.id_categ || ""}
                onChange={(event) =>
                  setUpdatedProduct((prevProduct) => ({
                    ...prevProduct,
                    id_categ: event.target.value,
                  }))
                }
              >
                {!isEmpty(categorie) ? (
                  categorie?.map((cat) => (
                    <MenuItem key={cat.id_categ} value={cat.id_categ}>
                      {cat.nom_categ}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem defaultValue="Pas de catégorie récuperer">
                    <p>Pas de catégorie récuperer</p>
                  </MenuItem>
                )}
              </Select>
              <input type="hidden" value={selectedProduct?.id_prod} />
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
              Veux-tu vraiment supprimer cette catégorie : {produitToDelete} ?
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
