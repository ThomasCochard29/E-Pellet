import React, { useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { isEmpty } from "../../Utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProd } from "../../../actions/produit.action";
import { getCountProd } from "../../../actions/produit.action";
import { getCateg } from "../../../actions/categorie.action";

// Component
import AdminNavBar from "../AdminNavBar";
import Search from "../Search";

// Image
import VisaCard from "../../../assets/icon/Visa.png";
import MasterCard from "../../../assets/icon/Mastercard.png";
import PayPalCard from "../../../assets/icon/PayPal.png";
import GooglePayCard from "../../../assets/icon/GooglePay.png";
import ApplePayCard from "../../../assets/icon/ApplePay.png";
import IconAdd from "../../../assets/icon/addbrown.png";
import IconClear from "../../../assets/icon/eraser.png";

export default function AddProduit() {
  //! ----------------- STYLES -----------------
  // Method Payement
  const styleMethodPayement = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const styleMarginImgPayement = { marginBottom: "10px" };
  const widthImgPayement = 51;

  //! ----------------- REDUX -----------------
  const dispatch = useDispatch();
  const produitCount = useSelector((state) => state.produitReducer); // Assurez-vous d'accéder à la propriété correcte dans votre state
  const categorie = useSelector((state) => state.categorieReducer);
  console.log(produitCount);

  useEffect(() => {
    dispatch(getCountProd());
    dispatch(getCateg());
  }, [dispatch]);

  //! ----------------- STATE -----------------
  // Récupération des Informations de la Catégorie pour l'Ajout
  const [addProduit, setAddProduit] = useState({
    nom_prod: "",
    descrip_prod: "",
    prix_prod: "",
    descrip_img: "",
    id_categ: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState(null);
  // console.log(selectedFile);

  //! ----------------- FONCTION -----------------
  // Fonction pour récuperer l'image
  const fileChangedHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileData(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fonction pour Ajouter le Produit
  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Veuillez choisir un fichier à uploader.");
      return;
    }

    const formData = new FormData();
    formData.append("nom_prod", addProduit.nom_prod);
    formData.append("descrip_prod", addProduit.descrip_prod);
    formData.append("prix_prod", addProduit.prix_prod);
    formData.append("descrip_img", addProduit.descrip_img);
    formData.append("id_categ", addProduit.id_categ);
    formData.append("img_prod", selectedFile);

    // Dispatch l'action d'ajout avec les données de la nouvelle catégorie
    dispatch(addProd(formData));

    console.log("produit ajouté");

    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={IconAdd} alt="Icon de l'ajout' du produit" width={40} />
        <p>Produit Ajouté !</p>
      </div>
    );
    window.location.reload();
  };

  const handleClear = () => {
    setAddProduit({
      nom_prod: "",
      descrip_prod: "",
      prix_prod: "",
      descrip_img: "",
      id_categ: "",
    });
    setSelectedFile(null);
    setFileData(null);
    toast(
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={IconClear}
          alt="Icon de l'ajout' du produit"
          width={40}
          style={{ paddingRight: "4px" }}
        />
        <p style={{ fontSize: "15px" }}>Tous les champs on était effacé!</p>
      </div>
    );
  };

  return (
    <div className="container">
      {/* NavBar Admin */}
      <AdminNavBar />

      {/* Contenue de la Page */}
      <div className="content">
        {/* Barre de recherche */}
        <section className="section-search">
          <Search />
        </section>

        <h3
          style={{
            color: "var(--var-brown)",
            alignSelf: "start",
            fontSize: 24,
            fontWeight: "400",
            marginLeft: "3.6%",
            fontFamily: "Mova"
          }}
        >
          Produits : ALL ({produitCount.produitCount})
        </h3>

        {/* Formulaire Ajout Produit */}
        <section
          style={{
            backgroundColor: "var(--var-green)",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            width: "90%",
          }}
        >
          <form
            onSubmit={(e) => handleAddFormSubmit(e)}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* Formulaire Coté Gauche */}
            <div className="section-img-categ">
              <h2 style={{ color: "var(--var-cream)" }}>
                Information de la Catégorie
              </h2>
              <p style={{ color: "var(--var-cream)" }}>Image de la Catégorie</p>
              <div
                style={{
                  display: "flex",
                  border: "2px dotted rgba(197, 178, 159, 0.50)",
                  padding: "10px",
                  backgroundColor: "rgba(120, 86, 55, 0.50)",
                  height: "200px",
                  placeContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="file"
                  onChange={fileChangedHandler}
                  style={{
                    height: "220px",
                    width: "600px",
                    border: "black 1px solid",
                    position: "absolute",
                    marginTop: "-11px",
                    opacity: "0",
                  }}
                />
                <section>
                  <p>
                    Glisser-déposer des fichiers ici, ou cliquez pour
                    sélectionner des fichiers
                  </p>
                  <img
                    src={fileData}
                    style={{ width: "100px" }}
                    alt="Fichier Déposer"
                  />
                </section>
              </div>

              <p style={{ color: "var(--var-cream)" }}>
                Description de l'Image du Produit
              </p>
              <div>
                <textarea
                  type="text"
                  value={addProduit.descrip_img}
                  style={{
                    display: "flex",
                    border: "2px solid rgba(197, 178, 159, 0.50)",
                    padding: "10px",
                    backgroundColor: "rgba(120, 86, 55, 0.50)",
                    placeContent: "center",
                    flexWrap: "wrap",
                    width: "581px",
                    height: "200px",
                    boxShadow: " 0.5em 0.5em rgba(120, 86, 55, 0.30)",
                  }}
                  onChange={(event) =>
                    setAddProduit((prevProd) => ({
                      ...prevProd,
                      descrip_img: event.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Formulaire Coté Droit */}
            <div style={{ marginLeft: "100px" }}>
              {/* Nom du Produit */}
              <div>
                <p style={{ color: "var(--var-cream)" }}>Nom du Produit</p>
                <input
                  type="text"
                  value={addProduit.nom_prod}
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
                  }}
                  onChange={(event) =>
                    setAddProduit((prevProd) => ({
                      ...prevProd,
                      nom_prod: event.target.value,
                    }))
                  }
                />
              </div>
              <br />

              {/* Select Categorie / Prix */}
              <div style={{ display: "flex" }}>
                <div>
                  <p style={{ color: "var(--var-cream)" }}>
                    Catégorie du Produit
                  </p>
                  <Select
                    id="categorie"
                    name="categorie"
                    placeholder="Selectionnez une catégorie"
                    value={addProduit.id_categ}
                    required
                    size="small"
                    sx={{
                      border: "2px solid rgba(197, 178, 159, 0.50)",
                      padding: "10px",
                      backgroundColor: "rgba(120, 86, 55, 0.50)",
                      borderRadius: "10px",
                      width: "100%",
                      height: "42px",
                    }}
                    onChange={(event) =>
                      setAddProduit((prevProd) => ({
                        ...prevProd,
                        id_categ: event.target.value,
                      }))
                    }
                  >
                    {!isEmpty(categorie) ? (
                      [
                        <MenuItem key="default" disabled>
                          Sélectionnez une catégorie
                        </MenuItem>,
                        ...categorie?.map((cat) => (
                          <MenuItem key={cat.id_categ} value={cat.id_categ}>
                            {cat.nom_categ}
                          </MenuItem>
                        )),
                      ]
                    ) : (
                      <MenuItem defaultValue="Pas de catégorie récuperer">
                        <p>Pas de catégorie récuperer</p>
                      </MenuItem>
                    )}
                  </Select>
                </div>
                <div style={{ marginLeft: "38px" }}>
                  <p style={{ color: "var(--var-cream)" }}>Prix du Produit</p>
                  <input
                    type="number"
                    id="prix"
                    name="prix"
                    required
                    value={addProduit.prix_prod}
                    style={{
                      border: "2px solid rgba(197, 178, 159, 0.50)",
                      padding: "10px",
                      backgroundColor: "rgba(120, 86, 55, 0.50)",
                      borderRadius: "10px",
                      width: "143px",
                    }}
                    onChange={(event) =>
                      setAddProduit((prevProd) => ({
                        ...prevProd,
                        prix_prod: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Description Produit */}
              <div>
                <p style={{ color: "var(--var-cream)" }}>
                  Description du Produit
                </p>
                <div>
                  <textarea
                    type="text"
                    value={addProduit.descrip_prod}
                    cols={64}
                    rows={10}
                    style={{
                      display: "flex",
                      border: "2px solid rgba(197, 178, 159, 0.50)",
                      padding: "10px",
                      backgroundColor: "rgba(120, 86, 55, 0.50)",
                      placeContent: "center",
                      flexWrap: "wrap",
                      borderRadius: "10px",
                    }}
                    onChange={(event) =>
                      setAddProduit((prevProd) => ({
                        ...prevProd,
                        descrip_prod: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Method Payement */}
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <div className="method-payement" style={styleMethodPayement}>
                  <img
                    src={VisaCard}
                    alt="Visa Payement"
                    width={widthImgPayement}
                    style={styleMarginImgPayement}
                  />
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="Visa"
                      id="visaCheckbox"
                    />
                    <label for="visaCheckbox" />
                  </div>
                </div>
                <div className="method-payement" style={styleMethodPayement}>
                  <img
                    src={MasterCard}
                    alt="MasterCard Payement"
                    width={widthImgPayement}
                    style={styleMarginImgPayement}
                  />
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="MasterCard"
                      id="masterCardCheckbox"
                    />
                    <label for="masterCardCheckbox" />
                  </div>
                </div>
                <div className="method-payement" style={styleMethodPayement}>
                  <img
                    src={PayPalCard}
                    alt="PayPal Payement"
                    width={widthImgPayement}
                    style={styleMarginImgPayement}
                  />
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="PayPal"
                      id="payPalCheckbox"
                    />
                    <label for="payPalCheckbox" />
                  </div>
                </div>
                <div className="method-payement" style={styleMethodPayement}>
                  <img
                    src={GooglePayCard}
                    alt="Google Payement"
                    width={widthImgPayement}
                    style={styleMarginImgPayement}
                  />
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="GooglePay"
                      id="googlePayCheckbox"
                    />
                    <label for="googlePayCheckbox" />
                  </div>
                </div>
                <div className="method-payement" style={styleMethodPayement}>
                  <img
                    src={ApplePayCard}
                    alt="Apple Payement"
                    width={widthImgPayement}
                    style={styleMarginImgPayement}
                  />
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="ApplePay"
                      id="applePayCheckbox"
                    />
                    <label for="applePayCheckbox" />
                  </div>
                </div>
              </div> */}

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
                  fontSize: "12px",
                  fontFamily: "Mova",
                  filter: "drop-shadow(8px 4px 10px)",
                  paddingX: "30px",
                  paddingY: "10px",
                  marginTop: "10vh"
                }}
              >
                Ajouter le Produit
              </Button>
              <Button
                type="button"
                variant="contained"
                size="small"
                href="/admin/datagrid-produit"
                className="btn-add-style"
                sx={{
                  color: "var(--var-brown)",
                  backgroundColor: "var(--var-cream)",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontFamily: "Mova",
                  filter: "drop-shadow(8px 4px 10px)",
                  paddingX: "30px",
                  paddingY: "10px",
                  marginX: "24px",
                  marginTop: "10vh"
                }}
              >
                Back To DataGrid
              </Button>
              <Button
                type="button"
                variant="contained"
                size="small"
                className="btn-add-style"
                sx={{
                  color: "var(--var-cream)",
                  backgroundColor: "var(--var-brown)",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontFamily: "Mova",
                  filter: "drop-shadow(8px 4px 10px)",
                  paddingX: "30px",
                  paddingY: "10px",
                  marginTop: "10vh"
                }}
                onClick={handleClear}
              >
                Clear
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
