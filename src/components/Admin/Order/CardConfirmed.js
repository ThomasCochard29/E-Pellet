import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import API from "../../../actions/api";

// Image
import IconOrderConfirmed from "../../../assets/icon/order-confirmed.png";

export default function CardConfirmed() {
  //! ----------------- DATA -----------------
  const [orderCountConfirmedData, setOrderCountConfirmedData] = useState(null);

  useEffect(() => {
    API.get("/order/count/confirmed")
      .then((res) => {
        setOrderCountConfirmedData(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [orderCountConfirmedData]);

  // console.log(orderCountCompletedData);

  return (
    <Card
      sx={{
        minWidth: 220,
        backgroundColor: "var(--var-green)",
        marginRight: "20px",
      }}
    >
      <CardContent>
        <div style={{ marginBottom: "20px" }}>
          <img
            src={IconOrderConfirmed}
            alt="Icon commande confirmer"
            width={60}
          />
        </div>
        <Typography variant="p" component="div" sx={{ marginBottom: "10px" }}>
          Orders Confirmed
        </Typography>
        <Typography variant="p" component="div">
          {orderCountConfirmedData?.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
