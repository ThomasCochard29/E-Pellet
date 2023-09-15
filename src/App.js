import { useLocation } from "react-router-dom";

// CSS
import "./App.css";

// Navigation
import Navigation from "./components/Navigation";

function App() {
  const location = useLocation();

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
