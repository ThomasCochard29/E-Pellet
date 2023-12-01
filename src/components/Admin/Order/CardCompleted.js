import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import API from "../../../actions/api";

// Image
import IconOrderComplete from "../../../assets/icon/order-completed.png";


export default function CardCompleted() {
  //! ----------------- DATA -----------------
  const [orderCountCompletedData, setOrderCountCompletedData] = useState(null);

  useEffect(() => {
    API.get("/order/count/completed")
      .then((res) => {
        setOrderCountCompletedData(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [orderCountCompletedData]);

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
          <img src={IconOrderComplete} alt="Icon commande réussie" width={60} />
        </div>
        <Typography variant="p" component="div" sx={{ marginBottom: "10px" }}>
          Orders Completed
        </Typography>
        <Typography variant="p" component="div">
          {orderCountCompletedData?.data}
        </Typography>
      </CardContent>
    </Card>
  );
}
