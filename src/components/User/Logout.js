import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // Importez withCookies depuis react-cookie
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Image
import IconLogout from "../../assets/icon/logout.png";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/auth.action";

const LogoutButton = ({ cookies }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const [, , removeCookie] = useCookies();

  const handleLogout = () => {
    dispatch(logoutUser());

    console.log("deconnection");

    removeCookie("access_token"); // Supprimez le cookie "access_token"
    if (location.pathname !== "/") navigate("/");
    toast.success("Vous êtes Déconnecter");
  };

  if (!isAuthenticated) {
    return null; // Masquez le bouton si l'utilisateur n'est pas connecté
  }

  return (
    <section>
      <button
        onClick={handleLogout}
        style={{ background: "transparent", border: "none" }}
      >
        <img
          src={IconLogout}
          alt="Icon User Logout"
          style={{ width: "40px" }}
        />
      </button>
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
    </section>
  );
};

export default LogoutButton;
