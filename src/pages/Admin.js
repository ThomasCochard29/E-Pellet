import React from "react";

// CSS
import "../components/Admin/admin.css";

// Components
import AdminPanel from "../components/Admin/AdminPanel.js";
import AdminNavBar from "../components/Admin/AdminNavBar";

export default function Admin() {
  return (
    <div className="container">
      <AdminNavBar />
      <div class="content">
        <AdminPanel />
      </div>
    </div>
  );
}
