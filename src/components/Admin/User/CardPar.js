import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

// Image
import IconCustomer from "../../../assets/icon/customer.png";

export default function CardPar() {
  const [userDataPar, setUserDataPar] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/client/particulier")
      .then((res) => {
        setUserDataPar(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    // Particulier
    <Card className="card-body">
      <CardContent>
        <div className="card-div-icon">
          <img
            src={IconCustomer}
            alt="Icon commande réussie"
            width={60}
            className="card-icon"
          />
        </div>
        {userDataPar && (
          <Typography className="card-typo-number" variant="p" component="div">
            {/* {userCountPar !== undefined ? userCountPar.data : 0} */}
            {userDataPar.data}
          </Typography>
        )}
        <Typography variant="p" component="div">
          Particulier
        </Typography>
      </CardContent>
    </Card>
  );
}
