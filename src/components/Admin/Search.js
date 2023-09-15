import React, { useEffect, useRef, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";

// Image
import SearchImg from "../../assets/icon/icons8-search-32.png";

// Redux
import { useDispatch } from "react-redux";
import {
  searchAction,
} from "../../actions/search.action";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // État pour afficher/cacher les résultats
  const dispatch = useDispatch();
  const searchBarRef = useRef(null); // Référence au champ de recherche

  // Gestionnaire d'événements pour gérer les clics en dehors de la barre de recherche
  const handleOutsideClick = (e) => {
    if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
      // Cliquez en dehors de la barre de recherche, masquez les résultats
      setShowResults(false);
    }
  };

  // Écoutez les clics en dehors de la barre de recherche
  useEffect(() => {
    if (showResults) {
      // Uniquement lorsque showResults est vrai
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showResults]); // Ajoutez showResults en tant que dépendance pour écouter les changements

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Affichez les résultats lors de la saisie
    setShowResults(true);

    dispatch(searchAction(newSearchTerm))
      .then((results) => {
        setSearchResults(results);
      })
      .catch((error) => {
        console.error(error);
      });

    // dispatch(searchActionCategorie(newSearchTerm))
    //   .then((results) => {
    //     setSearchResults(results);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  // console.log(searchResults);

  return (
    <div
      ref={searchBarRef}
      style={{ width: "100%", marginLeft: "20px", marginRight: "-20px" }}
    >
      <TextField
        className="search-input"
        placeholder="Search for..."
        variant="standard"
        sx={{ underline: "none", width: "96%" }}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* <button
                onClick={handleSearchChange}
                style={{ backgroundColor: "transparent", border: "none" }}
              > */}
              <img src={SearchImg} alt="" width={20} />
              {/* </button> */}
            </InputAdornment>
          ),
        }}
      />
      {/* Affichez les résultats si showResults est vrai */}
      {showResults && (
        <ul
          style={{
            backgroundColor: "var(--var-brown)",
            position: "absolute",
            width: "92.2%",
            zIndex: "10",
            color: "var(--var-cream)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {searchResults.map((result, index) => (
            <>
              <li
                key={index}
                style={{
                  margin: "6px 0px 0px 0px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/produit/${result.id_prod}`}
                  style={{
                    color: "white",
                  }}
                >
                  {result.nom_prod} | {result.prix_prod} € |
                  {result.descrip_prod} |
                  <img
                    src={`http://localhost:5000/assets/${result.img_prod}`}
                    width={"60px"}
                  />
                </Link>
              </li>
              <hr
                style={{
                  border: "1px solid var(--var-green)",
                  width: "100%",
                  marginLeft: "-10px",
                }}
              />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}
