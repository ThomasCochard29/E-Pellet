import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { isEmpty } from "../../Utils.js";
import { CircularProgress } from "@mui/material";
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getOrder } from "../../../actions/order.action.js";

export default function DatagridOrder() {
  //! ----------------- DATA -----------------
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

console.log(orderData);

  //! ----------------- FONCTION --------------
  function getStatusText(statusId) {
    switch (statusId) {
      case 1:
        return "Completer";
      case 2:
        return "Confirmer";
      case 3:
        return "Annuler";
      case 4:
        return "Rembourser";
      default:
        return "Inconnu";
    }
  }

  //! ----------------- MUI DATAGRID -----------------
  // Variable pour la Création des colonnes et lignes pour la DataGrid
  const columns = [
    { field: "id_order", headerName: "# Order", width: 114 },
    { field: "price_order", headerName: "Price", width: 130 },
    {
      field: "status_id",
      headerName: "Status",
      width: 130,
      renderCell: (params) => <span>{getStatusText(params.value)}</span>,
    },
  ];

  return (
    <div
      style={{
        height: "auto",
        width: "auto",
      }}
    >
      {!isEmpty(orderData) ? (
        // Affichage de la DataGrid
        // Si on récupere les commandes de la base de données
        <DataGrid
          style={{
            alignItems: "center",
            border: "none",
            backgroundColor: "var(--var-green)",
            boxShadow: "27px 27px 54px var(--var-brown)",
          }}
          rows={orderData} // Utilisez le tableau commande comme source de données
          columns={columns}
          loading={orderData.length === 0}
          disableRowSelectionOnClick
          disableCellSelectionOnClick
          getRowId={(row) => row.id_order}
          pageSize={10} // Utilisez pageSize au lieu de pagination
          pageSizeOptions={[5, 10, 25, 100]}
        />
      ) : (
        // Affichage de la DataGrid
        // Si on ne récupere aucune commande
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "var(--var-green)" }} size={100} />
          <p
            style={{
              color: "var(--var-brown)",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            Récupération des Commandes en Attente
          </p>
        </div>
      )}
    </div>
  );
}
