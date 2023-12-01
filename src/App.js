import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import API from "./actions/api";

// CSS
import "./App.css";

// Navigation
import Navigation from "./components/Navigation";

// Redux
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "./actions/auth.action";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchData = async () => {
      if (token) {
        try {
          const decodedRes = await API.post("/decodeToken", { token });
          // console.log("DECODEDRES : ", decodedRes.data);

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
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
          // Gérer les erreurs ici
        }
      }
    };

    fetchData();
  }, [dispatch]);

  let contentMinHeight = "auto";

  if (location.pathname !== "/") {
    contentMinHeight = "100vh"; // Ajustez cette valeur en fonction de vos besoins
  }

  return (
    <div
      className="linear-grad-back"
      style={{
        minHeight: contentMinHeight,
        backgroundImage:
          location.pathname === "/certification"
            ? "url('../../assets/Image/bg-certifications.png')"
            : "",
        backgroundSize: "cover",
      }}
    >
      <Navigation />
    </div>
  );
}

export default App;
