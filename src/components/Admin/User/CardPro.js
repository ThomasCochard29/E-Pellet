import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../../actions/api";

// Image
import IconProfessional from "../../../assets/icon/professional.png";

export default function CardPro() {
  const [userDataPro, setUserDataPro] = useState(null);

  useEffect(() => {
    API.get("/client/professionnel")
      .then((res) => {
        setUserDataPro(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    // Professionnel
    <Card className="card-body">
      <CardContent>
        <div className="card-div-icon">
          <img
            src={IconProfessional}
            alt="Icon commande réussie"
            width={60}
            className="card-icon"
          />
        </div>
        {userDataPro && (
          <Typography className="card-typo-number" variant="p" component="div">
            {userDataPro.data}
          </Typography>
        )}
        <Typography variant="p" component="div">
          Professionnel
        </Typography>
      </CardContent>
    </Card>
  );
}
