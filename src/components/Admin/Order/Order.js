import React from "react";

// CSS
import "../admin.css";
import "../Produit/datagridProduit.css";

// Components
import AdminNavBar from "../AdminNavBar.js";
import Search from "../Search.js";
import CardCompleted from "./CardCompleted.js";
import CardConfirmed from "./CardConfirmed.js";
import CardCancel from "./CardCancel.js";
import CardRefund from "./CardRefund.js";
import DatagridOrder from "./DatagridOrder.js";

export default function Order() {
  return (
    <div className="container">
      {/* NavBar Admin */}
      <AdminNavBar />

      {/* Contenue de la Page */}
      <div class="content">
        {/* Barre de recherche */}
        <section className="section-search">
          <Search />
        </section>

        {/* Card Order */}
        <section
          style={{ display: "flex", position: "relative", bottom: "10%" }}
        >
          {/* Completed */}
          <CardCompleted />

          {/* Confirmed */}
          <CardConfirmed />

          {/* Cancel */}
          <CardCancel />

          {/* Refund */}
          <CardRefund />
        </section>

        {/* DataGrid Categorie */}
        <DatagridOrder />
      </div>
    </div>
  );
}
