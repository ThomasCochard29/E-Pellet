import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { withCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./user.css";

// Image
import EyeOpen from "../../assets/icon/eye.png";
import EyeSlash from "../../assets/icon/eye-slash.png";
import IconClear from "../../assets/icon/eraser.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../actions/auth.action";

const Login = ({ cookies }) => {
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    textAlign: "center",
    backgroundColor: "var(--var-cream)",
    height: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  //! ----------------- REGISTER -----------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adressRegister, setAdressRegister] = useState({
    numero_rue: "",
    ville: "",
    code_postal: "",
    region: "",
    pays: "",
    rue: "",
  });
  const [infoRegister, setInfoRegister] = useState({
    professionnel_info: false,
    particulier_info: false,
  });
  const [telephoneRegister, setTelephoneRegister] = useState({
    numero_tel: "",
  });
  const [clientRegister, setClientRegister] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    password_client: "",
    adresse: adressRegister,
    telephones: "",
    informations: infoRegister,
  });

  // Fonction pour le choix Professionnel / Particulier
  const handleRadioChange = (fieldName) => {
    setInfoRegister((prevInfo) => ({
      ...prevInfo,
      professionnel_info: fieldName === "professionnel",
      particulier_info: fieldName === "particulier",
    }));
  };

  // Vérification du password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Vérifier si les mots de passe correspondent à chaque changement
    const match = event.target.value === confirmPassword;
    setPasswordsMatch(match);

    // Mettre à jour le mot de passe du clientRegister si les mots de passe correspondent
    if (match) {
      setClientRegister((prevClient) => ({
        ...prevClient,
        password_client: event.target.value,
      }));
    } else {
      setClientRegister((prevClient) => ({
        ...prevClient,
        password_client: "",
      }));
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    // Vérifier si les mots de passe correspondent à chaque changement
    const match = event.target.value === password;
    setPasswordsMatch(match);

    // Mettre à jour le mot de passe du clientRegister si les mots de passe correspondent
    if (match) {
      setClientRegister((prevClient) => ({
        ...prevClient,
        password_client: event.target.value,
      }));
    } else {
      setClientRegister((prevClient) => ({
        ...prevClient,
        password_client: "",
      }));
    }
  };

  // Fonction du Modal pour l'Adresse
  //? Fonction pour la Fermeture du Modal / PopUp
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Utilisez useEffect pour surveiller les changements de infoRegister
  useEffect(() => {
    setClientRegister((prevClient) => ({
      ...prevClient,
      adresse: adressRegister,
      informations: infoRegister,
      telephones: telephoneRegister,
    }));
  }, [adressRegister, infoRegister, telephoneRegister]);

  // console.log("passsword :" + password);
  // console.log("confirmPassword :" + confirmPassword);
  // console.log("passwordMatch :" + passwordsMatch);
  // console.log("passwordClient :" + clientRegister.password_client);
  // console.log(clientRegister);
  // console.log(infoRegister);
  // console.log(adressRegister);

  const handleClear = () => {
    setClientRegister({
      nom_client: "",
      prenom_client: "",
      email_client: "",
      password_client: "",
      adresse: adressRegister,
      telephones: telephoneRegister,
      informations: infoRegister,
    });
    setTelephoneRegister({
      numero_tel: "",
    });
    setAdressRegister({
      numero_rue: "",
      ville: "",
      code_postal: "",
      region: "",
      pays: "",
      rue: "",
    });
    setInfoRegister({
      professionnel_info: false,
      particulier_info: false,
    });
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

  // Fonction Submit pour le Register
  const handleSubmitRegister = (e) => {
    e.preventDefault();

    dispatch(registerUser(clientRegister));

    console.log("Inscription Réussie");
    toast.success("Inscription Réussie ! Vous pouvez allez vous connecter");
    handleClear();
  };

  //! ----------------- LOGIN -----------------
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  ); // Assurez-vous que vous avez un state auth avec le statut d'authentification

  // Fonction Submit pour le Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        loginUser({ email_client: emailLogin, password_client: passwordLogin })
      );

      if (response && response.data && response.data.token) {
        const token = response.data.token;

        // Stockage du token dans les cookies
        cookies.set("access_token", token, { path: "/" });

        // console.log("Token JWT:", token);
      }

      console.log("Connecté");

      toast.success("Vous êtes Connecté");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Gérez les erreurs d'authentification ici
    }
  };

  //? Cookie
  // const [cookie] = useCookies(["access_token"]);
  // console.log("Contenu du cookie access_token:", cookie["access_token"]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Si l'utilisateur est déjà connecté, redirigez-le
  if (isAuthenticated) {
    navigate("/");
    return null; // Rendu vide pour empêcher le rendu du formulaire de connexion
  }

  return (
    <div className="div-body">
      <section className="section-primary-register-login">
        {/* Register */}
        <div
          className="div-primary-register-login"
          onSubmit={handleSubmitRegister}
        >
          <h2>Register</h2>
          <form className="form-register-login">
            <section className="section-nom-prenom section-register">
              <div>
                <p className="label-register">Nom</p>
                <input
                  type="text"
                  placeholder="Entrer Votre Nom"
                  className="input-register"
                  value={clientRegister.nom_client}
                  onChange={(e) =>
                    setClientRegister((prevClient) => ({
                      ...prevClient,
                      nom_client: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="div-register-right">
                <p className="label-register">Prenom</p>
                <input
                  type="text"
                  placeholder="Entrer Votre Prenom"
                  className="input-register"
                  value={clientRegister.prenom_client}
                  onChange={(e) =>
                    setClientRegister((prevClient) => ({
                      ...prevClient,
                      prenom_client: e.target.value,
                    }))
                  }
                />
              </div>
            </section>
            <section className="section-email-adresse section-register">
              <div>
                <p className="label-register">Email</p>
                <input
                  type="email"
                  placeholder="Entrer Votre Email"
                  className="input-register"
                  value={clientRegister.email_client}
                  onChange={(e) =>
                    setClientRegister((prevClient) => ({
                      ...prevClient,
                      email_client: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="div-register-right">
                <p className="label-register">Adresse</p>
                <Button
                  className="btn-style btn-modal-adress-style"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Modal Adresse
                </Button>
                {adressRegister && (
                  <p>
                    {adressRegister.numero_rue} {adressRegister.rue} <br />
                    {adressRegister.ville} {adressRegister.code_postal}{" "}
                    {adressRegister.region} {adressRegister.pays}
                  </p>
                )}
              </div>
            </section>
            <section className="section-tel-pro-par section-register">
              <div style={{ marginRight: "10px" }}>
                <p className="label-register">Telephone</p>
                <input
                  type="text"
                  placeholder="Entrer Votre Numero de Telephone"
                  className="input-register"
                  value={telephoneRegister.numero_tel}
                  onChange={(e) =>
                    setTelephoneRegister((prevTel) => ({
                      ...prevTel,
                      numero_tel: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="checkbox-radio-pro-par div-register-right">
                <div className="div-checkbox-register">
                  <p className="label-register">Professionnel</p>
                  <div className="round">
                    <input
                      type="radio"
                      className="checkboxProPar"
                      name="ProParCheckbox"
                      id="proCheckbox"
                      checked={infoRegister.professionnel_info ? true : false}
                      value={infoRegister.professionnel_info}
                      onChange={() => handleRadioChange("professionnel")}
                    />
                    <label for="proCheckbox" className="proCheckbox" />
                  </div>
                </div>
                <div className="div-checkbox-register">
                  <p className="label-register" style={{ marginLeft: "10px" }}>
                    Particulier
                  </p>
                  <div className="round">
                    <input
                      type="radio"
                      className="checkboxProPar"
                      name="ProParCheckbox"
                      id="parCheckbox"
                      checked={infoRegister.particulier_info ? true : false}
                      value={infoRegister.particulier_info}
                      onChange={() => handleRadioChange("particulier")}
                    />
                    <label for="parCheckbox" className="parCheckbox" />
                  </div>
                </div>
              </div>
            </section>
            <section className="section-password section-register">
              <div>
                <p className="label-register">Password</p>
                <input
                  type="password"
                  placeholder="Entrer Votre Password"
                  className="input-register"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {!passwordsMatch && (
                  <p style={{ color: "red" }}>Passwords do not match</p>
                )}
              </div>
              <div className="div-register-right">
                <p className="label-register">Confirmation Password</p>
                <input
                  type="password"
                  placeholder="Confirmer Votre Password"
                  className="input-register"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {/* Afficher un message si les mots de passe ne correspondent pas */}
            </section>
            <Button type="submit" className="btn-style btn-register-style">
              Inscription
            </Button>
          </form>
        </div>

        {/* Login */}
        <div className="div-primary-register-login">
          <h2>Login</h2>
          <form className="form-register-login" onSubmit={handleSubmit}>
            <div>
              <p className="label-login">Email</p>
              <input
                type="email"
                placeholder="Entrer Votre Email"
                className="input-login"
                value={emailLogin}
                onChange={(e) => setEmailLogin(e.target.value)}
              />
            </div>
            <div>
              <p className="label-login">Password</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrer Votre Password"
                className="input-login"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
              <div
                className="div-show-hide-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img
                    className="img-eye-password"
                    src={EyeSlash}
                    alt="Hide Password"
                  />
                ) : (
                  <img
                    className="img-eye-password"
                    src={EyeOpen}
                    alt="Show Password"
                    height={32}
                  />
                )}
              </div>
            </div>
            <Button type="submit" className="btn-style btn-login-style">
              Connexion
            </Button>
          </form>
        </div>
      </section>

      {/* Modal Pour L'Adresse */}
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        size={50}
        style={styleModal}
      >
        <div className="modal-content">
          <h2>Adresse Client</h2>
          <form
            // onSubmit={(e) => handleFormSubmit(e)}
            className="form-register-login"
          >
            <section className="section-rue-ville section-register">
              <div>
                <p className="label-register">Numero de Rue</p>
                <input
                  type="text"
                  placeholder="Entrer Votre Numero de Rue"
                  className="input-register input-register-numero-rue"
                  value={adressRegister.numero_rue}
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
                  value={adressRegister.rue}
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
                  value={adressRegister.code_postal}
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
                  value={adressRegister.region}
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
                  value={adressRegister.pays}
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
                  value={adressRegister.ville}
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
              className="btn-style btn-login-style"
              onClick={() => handleModalClose()}
            >
              Close
            </Button>
          </form>
        </div>
      </Modal>

      <ToastContainer
        position="top-right"
        newestOnTop
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        bodyClassName="toastify-content"
        autoClose={2000}
      />
    </div>
  );
};

export default withCookies(Login);
