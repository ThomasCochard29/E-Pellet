import React, { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import API from "../../../actions/api";

// CSS
import "../admin.css";

// Component
import AdminNavBar from "../AdminNavBar";
import Search from "../Search";
import CardPro from "./CardPro";
import CardPar from "./CardPar";
import CardAllClient from "./CardAllClient";

export default function UserAdmin() {
  //! ----------------- DATA -----------------
  const [userDataPro, setUserDataPro] = useState(null);
  const [userDataPar, setUserDataPar] = useState(null);

  useEffect(() => {
    API.get("/client/professionnel")
      .then((res) => {
        setUserDataPro(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });

    API.get("/client/particulier")
      .then((res) => {
        setUserDataPar(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  const dataPro = userDataPro ? userDataPro.data : 0;
  const dataPar = userDataPar ? userDataPar.data : 0;

  return (
    <div className="container">
      {/* NavBar Admin */}
      <AdminNavBar />

      {/* Contenue de la Page */}
      <div className="content">
        {/* Barre de recherche */}
        <section className="section-search">
          <Search />
        </section>

        {/* Card Customer */}
        <section
          className="section-card-user"
        >
          {/* All Customers */}
          <CardAllClient />

          {/* Professionnel */}
          <CardPro />

          {/* Particulier */}
          <CardPar />
        </section>

        <section className="diagramme-user">
          {userDataPro !== null && userDataPar !== null ? (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: dataPro, label: "Professionnel" },
                    { id: 1, value: dataPar, label: "Particulier" },
                  ],
                  outerRadius: 160,
                  endAngle: 360,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: { innerRadius: 30, additionalRadius: -30 },
                  arcLabel: "value",
                },
              ]}
              width={520}
              height={340}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                },
              }}
            />
          ) : (
            <p>Chargement en cours...</p>
          )}
        </section>
      </div>
    </div>
  );
}
