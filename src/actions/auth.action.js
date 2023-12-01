import API from "./api";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_USER = "REGISTER_USER";

// export const loginUser = (credentials) => {
//   return (dispatch) => {
//     return API.post("/client/login", credentials)
//       .then((res) => {
//         const { user, token } = res.data; // Extrait l'utilisateur et le token de la réponse
//         localStorage.setItem("authToken", token);
//         // console.log(res.data);
//         dispatch({ type: LOGIN_USER, payload: { user, token } }); // Dispatche l'action avec l'utilisateur et le token
//         return res; // Renvoie la réponse complète (y compris le token)
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la connexion:", error);
//         dispatch({ type: LOGIN_USER_FAILURE, payload: error }); // Dispatche l'action d'échec avec l'erreur
//         throw error; // Renvoie l'erreur pour la gestion des erreurs dans le composant
//       });
//   };
// };
export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const res = await API.post("/client/login", credentials);
      const { token } = res.data;
      localStorage.setItem("authToken", token);

      // Appelez la fonction côté serveur pour décoder le token
      const decodedRes = await API.post("/decodeToken", { token });

      var { user } = decodedRes.data;
      // console.log("DECODED TOKEN : ", user);

      var nameUser = user.name;
      // console.log("NAME : ", name);

      var roleUser = user.role;
      // console.log("ROLE : ", roleUser);

      dispatch({
        type: LOGIN_USER,
        payload: { user, roleUser, token, nameUser },
      });
      // console.log("RES : ", res);

      return { res, user, roleUser, nameUser };
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      dispatch({ type: LOGIN_USER_FAILURE, payload: error });
      throw error;
    }
  };
};

export const registerUser = (data) => {
  return (dispatch) => {
    return API.post("/client/add", data).then((res) =>
      dispatch({ type: REGISTER_USER, payload: data })
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("authToken");
    dispatch({ type: LOGOUT_USER });
  };
};
