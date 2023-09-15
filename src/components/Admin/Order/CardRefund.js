import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Image
import IconOrderRefund from "../../../assets/icon/remboursement.png";
import axios from "axios";

export default function CardRefund() {
  //! ----------------- DATA -----------------
  const [orderCountRefundData, setOrderCountRefundData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/order/count/refund")
      .then((res) => {
        setOrderCountRefundData(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [orderCountRefundData]);

  // console.log(orderCountCompletedData);

  return (
    <Card sx={{ minWidth: 220, backgroundColor: "var(--var-green)" }}>
      <CardContent>
        <div style={{ marginBottom: "20px" }}>
          <img
            src={IconOrderRefund}
            alt="Icon commande rembourser"
            width={60}
          />
        </div>
        <Typography variant="p" component="div" sx={{ marginBottom: "10px" }}>
          Orders Refund
        </Typography>
        <Typography variant="p" component="div">
          {orderCountRefundData?.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
