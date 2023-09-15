import React from "react";
import { Routes, Route } from "react-router-dom";

// Component
import NavBar from "./Navbar/NavBar.js";
import HistoireEntreprise from "../components/HistoireEntreprise/HistoireEntreprise.js";
import ProcessFabrication from "../components/ProcessFabrication/ProcessFabrication.js";
import Produit from "../components/Produit/Produit";
import Certification from "../components/Certification/Certification";
import Contact from "../components/Contact/Contact";
import Footer from "./Footer/Footer.js";
//? Admin
import DatagridProduit from "./Admin/Produit/DatagridProduit.js";

// Page
import HomePage from "../pages/HomePage.js";
import Admin from "../pages/Admin.js";
import DatagridCategorie from "./Admin/Categorie/DatagridCategorie.js";
import AddCategorie from "./Admin/Categorie/AddCategorie.js";
import AddProduit from "./Admin/Produit/AddProduit.js";
import Login from "./User/Login.js";
import PrivateRoute from "./PrivateRoute.js";
import Order from "./Admin/Order/Order.js";
import UserAdmin from "./Admin/User/UserAdmin.js";
import SearchDetail from "./Admin/SearchDetail.js";
import ShoppingCart from "./ShoppingCart/ShoppingCart.js";

export default function Navigation() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route
          exact
          path="/histoire-entreprise"
          element={<HistoireEntreprise />}
        />
        <Route
          exact
          path="/processusfabrication"
          element={<ProcessFabrication />}
        />
        <Route exact path="/produit" element={<Produit />} />
        <Route exact path="/certification" element={<Certification />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          exact
          path="/login"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route exact path="/admin" element={<Admin />} />
        <Route
          exact
          path="/admin/datagrid-produit"
          element={<DatagridProduit />}
        />
        <Route exact path="/admin/add-produit" element={<AddProduit />} />
        <Route
          exact
          path="/admin/datagrid-categorie"
          element={<DatagridCategorie />}
        />
        <Route exact path="/admin/add-categorie" element={<AddCategorie />} />
        <Route exact path="/admin/commande" element={<Order />} />
        <Route exact path="/admin/user-admin" element={<UserAdmin />} />
        <Route exact path="/produit/:id_prod" element={<SearchDetail />} />
      </Routes>
      <Footer />
    </>
  );
}
