import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Modal, TextField } from "@mui/material";
import API from "../../actions/api";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
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
    borderRadius: "8px",
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer);
  const userId = user?.user?.userId;
  // console.log(userId);

  const [userData, setUserData] = useState();
  const [orderUser, setOrderUser] = useState();
  const [selectedStatus, setSelectedStatus] = useState("Tous"); // État pour stocker le statut sélectionné

  const dataClient = () => {
    API.get(`/client/${userId}`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données : ", error);
      });

    API.get(`/order/${userId}`)
      .then((res) => {
        setOrderUser(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données : ", err);
      });
  };

  useEffect(() => {
    dataClient();
  }, [user]);

  // Filtrer les commandes en fonction du statut sélectionné
  const filteredOrders =
    selectedStatus === "Tous"
      ? orderUser
      : orderUser.filter((order) => order.status_order === selectedStatus);

  console.log("Order USER : ", orderUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAdresseOpen, setIsModalAdresseOpen] = useState(false);
  const [isModalDesac, setIsModalDesac] = useState(false);
  const [telephoneRegister, setTelephoneRegister] = useState({
    numero_tel: "",
  });
  const [adressRegister, setAdressRegister] = useState({
    numero_rue: "",
    ville: "",
    code_postal: "",
    region: "",
    pays: "",
    rue: "",
  });
  const [updateProfil, setUpdatedProfil] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    adresse: adressRegister,
    telephones: telephoneRegister,
  });

  useEffect(() => {
    setUpdatedProfil((prevClient) => ({
      ...prevClient,
      adresse: adressRegister,
      telephones: telephoneRegister,
    }));
  }, [adressRegister, telephoneRegister]);
  // console.log(updateProfil);

  // Si l'utilisateur n'est pas connecté, redirigez-le
  if (!user.isAuthenticated) {
    navigate("/");
    console.log("login");
    return null; // Rendu vide pour empêcher le rendu du formulaire de connexion
  }

  // console.log(userData);

  const handleUpdateClick = (userData) => {
    // console.log(userData);
    setTelephoneRegister({
      numero_tel: userData.numero_tel,
    });
    setAdressRegister({
      numero_rue: userData.numero_rue,
      ville: userData.ville,
      code_postal: userData.code_postal,
      region: userData.region,
      pays: userData.pays,
      rue: userData.rue,
    });
    setUpdatedProfil({
      nom_client: userData.nom_client,
      prenom_client: userData.prenom_client,
      email_client: userData.email_client,
      adresse: adressRegister,
      telephones: telephoneRegister,
    });
    // console.log(selectedCateg);
    // console.log(updatedCateg);
    setIsModalOpen(true);
  };

  const handleUpdateAdressClick = (userData) => {
    // console.log(userData);
    setTelephoneRegister({
      numero_tel: userData.numero_tel,
    });
    setAdressRegister({
      numero_rue: userData.numero_rue,
      ville: userData.ville,
      code_postal: userData.code_postal,
      region: userData.region,
      pays: userData.pays,
      rue: userData.rue,
    });
    setUpdatedProfil({
      nom_client: userData.nom_client,
      prenom_client: userData.prenom_client,
      email_client: userData.email_client,
      adresse: adressRegister,
      telephones: telephoneRegister,
    });
    // console.log(selectedCateg);
    // console.log(updatedCateg);
    setIsModalAdresseOpen(true);
  };

  const handleUpdate = async () => {
    await API.put(`/client/update/${user?.user?.userId}`, updateProfil)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));

    handleModalClose();

    window.location.reload();
  };

  // Fonction pour la Fermeture du Modal / PopUp
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // Fonction pour la Fermeture du Modal / PopUp
  const handleModalAdresseClose = () => {
    setIsModalOpen(false);
  };

  const popUpDesacProfile = () => {
    setIsModalDesac(true);
  };

  const handleModalDesacClose = () => {
    toast(
      <div>
        <p>Votre compte n'a pas été supprimer</p>
      </div>
    );
    setIsModalDesac(false);
  };

  const handleDesactiverCompte = async () => {
    const id_client = user?.user?.userId;
    await API.put(`/client/delete/${id_client}`, id_client)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));

    toast(
      <div>
        <p>Votre compte a été supprimer</p>
      </div>
    );

    localStorage.removeItem("authToken");
    setIsModalDesac(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="div-body-profile">
        <div>
          <h2 className="titre-moncompte">Mon Compte</h2>
        </div>
        <div className="shopping-cart-body">
          <section className="shopping-cart-section">
            {/* Order User Content */}
            <div className="cart-div">
              <h1>Mes Commandes</h1>
              <div>
                {/* Sélecteur pour filtrer par statut */}
                <div className="select">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="Tous">Tous</option>
                    <option value="Confirmer">Confirmer</option>
                    <option value="Compléter">Compléter</option>
                    <option value="Rembourser">Rembourser</option>
                    <option value="Annuler">Annuler</option>
                    {/* Ajoutez d'autres options de statut au besoin */}
                  </select>
                </div>
                <div
                  className={`order-container ${
                    filteredOrders?.length > 3 ? "scrollable" : ""
                  }`}
                >
                  {filteredOrders?.length === 0 ? (
                    <p className="cart-length-null">
                      Vous n'avez fait aucune commande !
                    </p>
                  ) : (
                    filteredOrders
                      ?.slice()
                      .reverse()
                      .map((order, index) => (
                        <>
                          <div key={index} className="card-order">
                            <div className="order-text-content">
                              <div className="order-text order-text-number">
                                <p>Numéro de Commande</p>
                                <p className="text-order">
                                  {order.order_number}
                                </p>
                              </div>
                              <div className="order-text order-text-price">
                                <p>Prix de la Commande</p>
                                <p className="text-order">
                                  {order.price_order} €
                                </p>
                              </div>
                              <div className="order-text order-text-status">
                                <p>Status de la Commande</p>
                                <p className="text-order">
                                  {order.status_order}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                  )}
                </div>
              </div>
            </div>
            {/* Récapitulatif User */}
            <div style={{ padding: "10px", width: "40%" }}>
              <h1>
                {userData?.nom_client} {userData?.prenom_client}
              </h1>
              <section style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "2px 0px",
                  }}
                >
                  <p>{userData?.email_client}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>{userData?.telephones[0]?.numero_tel}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    placeContent: "center",
                  }}
                >
                  <button
                    className="button-profile button-profile-update"
                    onClick={() => handleUpdateClick(userData)}
                  >
                    Mettre à jour votre profil
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <p>
                    {userData?.adresse?.numero_rue} {userData?.adresse?.rue},{" "}
                    {userData?.adresse?.code_postal}, {userData?.adresse?.ville}
                    , {userData?.adresse?.region}, {userData?.adresse?.pays}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    placeContent: "center",
                  }}
                >
                  <button
                    className="button-profile button-profile-update"
                    onClick={() => handleUpdateAdressClick(userData)}
                  >
                    Mettre à jour votre adresse
                  </button>
                  <button
                    className="button-profile button-profile-desac"
                    onClick={() => popUpDesacProfile()}
                  >
                    Désactiver le compte
                  </button>
                </div>
              </section>
            </div>
          </section>
          {/* Modal / PopUp pour l'Update */}
          <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            size={50}
            style={styleModal}
          >
            <div className="modal-content">
              <h2>Update Profile</h2>
              <form
                onSubmit={(e) => handleUpdate(e)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                  marginLeft: "25%",
                }}
              >
                <TextField
                  className={"textfield"}
                  label="Email"
                  variant="standard"
                  value={updateProfil?.email_client || userData?.email_client}
                  onChange={(e) =>
                    setUpdatedProfil((prevClient) => ({
                      ...prevClient,
                      email_client: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="textfield"
                  label="Nom"
                  variant="standard"
                  value={updateProfil?.nom_client || userData?.nom_client}
                  onChange={(e) =>
                    setUpdatedProfil((prevClient) => ({
                      ...prevClient,
                      nom_client: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="textfield"
                  label="Prenom"
                  variant="standard"
                  value={updateProfil?.prenom_client || userData?.prenom_client}
                  onChange={(e) =>
                    setUpdatedProfil((prevClient) => ({
                      ...prevClient,
                      prenom_client: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="textfield"
                  label="Numero de Telephone"
                  variant="standard"
                  value={
                    updateProfil?.telephones.numero_tel ||
                    userData?.telephones[0]?.numero_tel
                  }
                  onChange={(e) =>
                    setTelephoneRegister((prevTel) => ({
                      ...prevTel,
                      numero_tel: e.target.value,
                    }))
                  }
                />
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

          <Modal
            open={isModalAdresseOpen}
            onClose={handleModalAdresseClose}
            size={50}
            className="modal"
          >
            <div className="modal-content">
              <h2>Adresse Client</h2>
              <form className="form-adress">
                <section className="section-rue-ville section-register">
                  <div>
                    <p className="label-register">Numero de Rue</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Numero de Rue"
                      className="input-register input-register-numero-rue"
                      value={
                        updateProfil?.adresse.numero_tel ||
                        userData?.adresse?.numero_tel
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          numero_rue: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="div-register-right">
                    <p className="label-register">Nom de la Rue</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Nom de Rue"
                      className="input-register"
                      value={
                        updateProfil?.adresse.rue || userData?.adresse?.rue
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          rue: e.target.value,
                        }))
                      }
                    />
                  </div>
                </section>
                <section className="section-postal-region section-register">
                  <div>
                    <p className="label-register">Code Postal</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Code Postal"
                      className="input-register"
                      value={
                        updateProfil?.adresse.code_postal ||
                        userData?.adresse?.code_postal
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          code_postal: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="div-register-right">
                    <p className="label-register">Region</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Region"
                      className="input-register"
                      value={
                        updateProfil?.adresse.region ||
                        userData?.adresse?.region
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          region: e.target.value,
                        }))
                      }
                    />
                  </div>
                </section>
                <section className="section-pays-rue section-register">
                  <div>
                    <p className="label-register">Pays</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Pays"
                      className="input-register"
                      value={
                        updateProfil?.adresse.pays || userData?.adresse?.pays
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          pays: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="div-register-right">
                    <p className="label-register">Ville</p>
                    <input
                      type="text"
                      placeholder="Entrer Votre Ville"
                      className="input-register"
                      value={
                        updateProfil?.adresse.ville || userData?.adresse?.ville
                      }
                      onChange={(e) =>
                        setAdressRegister((prevAdress) => ({
                          ...prevAdress,
                          ville: e.target.value,
                        }))
                      }
                    />
                  </div>
                </section>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={(e) => handleUpdate(e)}
                >
                  Update
                </Button>
                <Button
                  className="btn-style btn-adress-style"
                  onClick={() => setIsModalAdresseOpen(false)}
                >
                  Close
                </Button>
              </form>
            </div>
          </Modal>

          <Modal
            open={isModalDesac}
            onClose={handleModalDesacClose}
            size={50}
            className="modal"
          >
            <div className="modal-content">
              <h2>Désactiver le Compte</h2>
              <p>Êtes-vous sûr de vouloir désactiver votre compte ?</p>
              <Button
                variant="contained"
                color="error"
                style={{ marginRight: "10px" }}
                onClick={handleDesactiverCompte}
              >
                Oui, désactiver
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleModalDesacClose}
              >
                Annuler
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
    </>
  );
}
