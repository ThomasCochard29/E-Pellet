import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_USER = "REGISTER_USER";

export const loginUser = (credentials) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/client/login", credentials)
      .then((res) => {
        const { user, token } = res.data; // Extrait l'utilisateur et le token de la réponse
        // console.log(res.data);
        dispatch({ type: LOGIN_USER, payload: { user, token } }); // Dispatche l'action avec l'utilisateur et le token
        return res; // Renvoie la réponse complète (y compris le token)
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error);
        dispatch({ type: LOGIN_USER_FAILURE, payload: error }); // Dispatche l'action d'échec avec l'erreur
        throw error; // Renvoie l'erreur pour la gestion des erreurs dans le composant
      });
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/client/add", data)
      .then((res) => dispatch({ type: REGISTER_USER, payload: data }));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
  };
};
