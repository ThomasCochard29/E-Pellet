import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteNoAuthentificated = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  const navigation = useNavigate();

  if (!isAuthenticated) {
    navigation("/");
    return null;
  } else {
    return children;
  }
};

export default PrivateRouteNoAuthentificated;
