import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigation = useNavigate();

  if (!isAuthenticated) {
    return children;
  } else {
    return navigation("/");
  }
};

export default PrivateRoute;
