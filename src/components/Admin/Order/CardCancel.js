import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

// Image
import IconOrderCanceled from "../../../assets/icon/cancel-order.png";

export default function CardCancel() {
  //! ----------------- DATA -----------------
  const [orderCountCancelData, setOrderCountCancelData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/order/count/cancel")
      .then((res) => {
        setOrderCountCancelData(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [orderCountCancelData]);

  // console.log(orderCountCancelData);

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
          <img src={IconOrderCanceled} alt="Icon commande annulé" width={60} />
        </div>
        <Typography variant="p" component="div" sx={{ marginBottom: "10px" }}>
          Orders Canceled
        </Typography>
        <Typography variant="p" component="div">
          {orderCountCancelData?.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
