import React, { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { withCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";

// CSS
import "./user.css";

// Image
import EyeOpen from "../../assets/icon/eye.png";
import EyeSlash from "../../assets/icon/eye-slash.png";
import IconClear from "../../assets/icon/eraser.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../actions/auth.action";

const schemaRegister = yup.object().shape({
  nom_client: yup.string().required("Le nom est requis"),
  prenom_client: yup.string().required("Le prénom est requis"),
  email_client: yup
    .string()
    .email("Entrez une adresse e-mail valide")
    .required("L'e-mail est requis"),
  password_client: yup.string().required("Le mot de passe est requis"),
  // numero_rue: yup.string().required("Le numéro de rue est requis"),
  // ville: yup.string().required("La ville est requise"),
  // code_postal: yup.string().required("Le code postal est requis"),
  // region: yup.string().required("La région est requise"),
  // pays: yup.string().required("Le pays est requis"),
  // rue: yup.string().required("Le nom de la rue est requis"),
  // numero_tel: yup.string().required("Le numéro de téléphone est requis"),
});

const schemaLogin = yup.object().shape({
  emailLogin: yup
    .string()
    .email("Entrez une adresse e-mail valide")
    .required("L'e-mail est requis"),
  passwordLogin: yup.string().required("Le mot de passe est requis"),
});

const Login = ({ cookies }) => {
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
  // console.log(adressRegister);
  const [telephoneRegister, setTelephoneRegister] = useState({
    numero_tel: "",
  });
  const [clientRegister, setClientRegister] = useState({
    nom_client: "",
    prenom_client: "",
    email_client: "",
    password_client: "",
    is_professionnel: 0,
    adresse: adressRegister,
    telephones: telephoneRegister,
  });

  // Vérification du password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Vérifier si les mots de passe correspondent à chaque changement
    const match = event.target.value === confirmPassword;
    setPasswordsMatch(match);

    // Mettre à jour le mot de passe du clientRegister si les mots de passe
    // correspondent
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

    // Mettre à jour le mot de passe du clientRegister si les mots de passe
    // correspondent
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

  // Fonction du Modal pour l'Adresse ? Fonction pour la Fermeture du Modal /
  // PopUp
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Utilisez useEffect pour surveiller les changements de infoRegister
  useEffect(() => {
    setClientRegister((prevClient) => ({
      ...prevClient,
      adresse: adressRegister,
      telephones: telephoneRegister,
    }));
  }, [adressRegister, telephoneRegister]);

  // console.log("passsword :" + password); console.log("confirmPassword :" +
  // confirmPassword); console.log("passwordMatch :" + passwordsMatch);
  // console.log("passwordClient :" + clientRegister.password_client);
  // console.log(clientRegister); console.log(infoRegister);
  // console.log(adressRegister);

  const handleClear = () => {
    setClientRegister({
      nom_client: "",
      prenom_client: "",
      email_client: "",
      password_client: "",
      is_professionnel: false,
      adresse: adressRegister,
      telephones: telephoneRegister,
    });
    setTelephoneRegister({ numero_tel: "" });
    setAdressRegister({
      numero_rue: "",
      ville: "",
      code_postal: "",
      region: "",
      pays: "",
      rue: "",
    });
    setConfirmPassword("");
    setPassword("");
    setPasswordsMatch(false);

    toast(
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={IconClear}
          alt="Icon d'effacement des champs"
          width={40}
          style={{
            paddingRight: "4px",
          }}
        />
        <p
          style={{
            fontSize: "15px",
          }}
        >
          Tous les champs on était effacé!
        </p>
      </div>
    );
  };

  const [validationErrors, setValidationErrors] = useState({});

  // Fonction Submit pour le Register
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    try {
      await schemaRegister.validate(clientRegister, { abortEarly: false });
      console.log(clientRegister);

      dispatch(registerUser(clientRegister));

      console.log("Inscription Réussie");
      toast.success("Inscription Réussie ! Vous pouvez aller vous connecter");
      handleClear();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors); // Mettre à jour les erreurs de validation
        console.log("Erreurs de validation:", errors);
      } else {
        console.error("Erreur lors de l'inscription:", error);
      }
    }
  };

  //! ----------------- LOGIN -----------------
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientLogin, setClientLogin] = useState({
    emailLogin: emailLogin,
    passwordLogin: passwordLogin,
  });
  const [capVal, setCapVal] = useState();

  useEffect(() => {
    setClientLogin({
      emailLogin: emailLogin,
      passwordLogin: passwordLogin,
    });
  }, [emailLogin, passwordLogin]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  ); // Assurez-vous que vous avez un state auth avec le statut d'authentification

  // Fonction Submit pour le Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schemaLogin.validate(clientLogin, {
        abortEarly: false,
      });
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

      navigate("/");
      toast.success("Vous êtes Connecté");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {};
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors); // Mettre à jour les erreurs de validation
        setCapVal();
      } else {
        toast.error("Email ou mot de passe incorrect");
        console.error("Erreur lors de la connexion:", error);
        setCapVal();
      }
    }
    setCapVal();
  };

  // ? Cookie const [cookie] = useCookies(["access_token"]); console.log("Contenu
  // du cookie access_token:", cookie["access_token"]);

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
          style={
            validationErrors.nom_client
              ? {
                  marginBottom: "-10%",
                }
              : null
          }
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
                {validationErrors.nom_client && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.nom_client}
                  </p>
                )}
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
                {validationErrors.prenom_client && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.prenom_client}
                  </p>
                )}
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
                {validationErrors.email_client && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.email_client}
                  </p>
                )}
              </div>
              <div
                className="div-register-right"
                style={
                  validationErrors.numero_rue ||
                  validationErrors.ville ||
                  validationErrors.code_postal ||
                  validationErrors.region ||
                  validationErrors.pays ||
                  validationErrors.rue
                    ? {
                        marginRight: "-100%",
                      }
                    : null
                }
              >
                <p
                  className="label-register"
                  style={
                    validationErrors.numero_rue ||
                    validationErrors.ville ||
                    validationErrors.code_postal ||
                    validationErrors.region ||
                    validationErrors.pays ||
                    validationErrors.rue
                      ? {
                          marginLeft: "-20%",
                        }
                      : null
                  }
                >
                  Adresse
                </p>
                <Button
                  className="btn-style btn-modal-adress-style"
                  onClick={() => setIsModalOpen(true)}
                  style={
                    validationErrors.numero_rue ||
                    validationErrors.ville ||
                    validationErrors.code_postal ||
                    validationErrors.region ||
                    validationErrors.pays ||
                    validationErrors.rue
                      ? {
                          marginLeft: "-20%",
                        }
                      : null
                  }
                >
                  Open Modal Adresse
                </Button>
                {validationErrors.numero_rue ||
                validationErrors.ville ||
                validationErrors.code_postal ||
                validationErrors.region ||
                validationErrors.pays ||
                validationErrors.rue ? (
                  <p
                    style={{
                      color: "white",
                      width: "80%",
                    }}
                  >
                    Une information manque dans l'adresse
                  </p>
                ) : null}
                {adressRegister && (
                  <p>
                    {adressRegister.numero_rue}{" "}
                    {adressRegister.rue}
                    <br /> {adressRegister.ville}{" "}
                    {adressRegister.code_postal} {adressRegister.region}
                    {adressRegister.pays}
                  </p>
                )}
              </div>
            </section>
            <section className="section-tel-pro-par section-register">
              <div
                style={{
                  marginRight: "10px",
                }}
              >
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
                {validationErrors.numero_tel && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.numero_tel}
                  </p>
                )}
              </div>
              <div className="checkbox-radio-pro-par div-register-right">
                <div className="div-checkbox-register">
                  <p className="label-register">Professionnel</p>
                  <div className="round">
                    <input
                      type="checkbox"
                      className="checkboxProPar"
                      name="ProParCheckbox"
                      id="proCheckbox"
                      checked={clientRegister.is_professionnel ? true : false}
                      value={clientRegister.is_professionnel}
                      onChange={() =>
                        setClientRegister((prevClient) => ({
                          ...prevClient,
                          is_professionnel: !prevClient.is_professionnel,
                        }))
                      }
                    />
                    <label
                      for="proCheckbox"
                      className="proCheckbox"
                      style={{
                        backgroundColor: clientRegister.is_professionnel
                          ? "var(--var-green)"
                          : "",
                        borderColor: clientRegister.is_professionnel
                          ? "var(--var-green)"
                          : "",
                      }}
                    />
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
            </section>
            {!passwordsMatch && (
              <p
                style={{
                  color: "white",
                }}
              >
                Le mot de passe ne sont pas identique
              </p>
            )}
            {validationErrors.password_client && (
              <p
                style={{
                  color: "white",
                }}
              >
                {validationErrors.password_client}
              </p>
            )}
            <ReCAPTCHA
              sitekey="6Lc_qgMpAAAAAE7MCszPR2OYGtXjBQRqYZSFK1c7"
              onChange={(val) => setCapVal(val)}
              style={{ position: "relative", left: "5vw", top: "1vh" }}
            />
            <Button disabled={!capVal} type="submit" className="btn-style btn-register-style">
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
              {validationErrors.emailLogin && (
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {validationErrors.emailLogin}
                </p>
              )}
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
              {validationErrors.passwordLogin && (
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {validationErrors.passwordLogin}
                </p>
              )}
            </div>
            <ReCAPTCHA
              sitekey="6Lc_qgMpAAAAAE7MCszPR2OYGtXjBQRqYZSFK1c7"
              onChange={(val) => setCapVal(val)}
              style={{ position: "relative", left: "3vw", top: "1vh" }}
            />
            <Button disabled={!capVal} type="submit" className="btn-style btn-login-style">
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
                  value={adressRegister.numero_rue}
                  onChange={(e) =>
                    setAdressRegister((prevAdress) => ({
                      ...prevAdress,
                      numero_rue: e.target.value,
                    }))
                  }
                />
                {validationErrors.numero_rue && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.numero_rue}
                  </p>
                )}
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
                {validationErrors.rue && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.rue}
                  </p>
                )}
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
                {validationErrors.code_postal && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.code_postal}
                  </p>
                )}
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
                {validationErrors.region && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.region}
                  </p>
                )}
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
                {validationErrors.pays && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.pays}
                  </p>
                )}
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
                {validationErrors.ville && (
                  <p
                    style={{
                      color: "white",
                    }}
                  >
                    {validationErrors.ville}
                  </p>
                )}
              </div>
            </section>
            <Button
              className="btn-style btn-adress-style"
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
