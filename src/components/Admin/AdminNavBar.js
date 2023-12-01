import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Image
import Logo from "../../assets/Image/LogoWhite.png";

// Icon
import IconProduit from "../../assets/icon/icons8-boîte-64.png";
import IconCategorie from "../../assets/icon/icons8-dossier-ouvert-90.png";
import IconCommande from "../../assets/icon/icons8-caddie-48.png";
import IconUser from "../../assets/icon/user_admin.png";
import ArrowSubMenu from "../../assets/icon/Fichier 2.png";

export default function AdminNavBar() {
  const location = useLocation();

  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleSubMenuClick = (id) => {
    if (activeSubMenu === id) {
      setActiveSubMenu(null); 
    } else {
      setActiveSubMenu(id);
    }
  };

  const lienMenuAdmin = [
    {
      id: 1,
      nom: (
        <a href className={"a-admin"} title="Produits">
          <img
            src={IconProduit}
            alt="Icon boite en carton produit"
            width={50}
            height={50}
          />
          <p>Produit</p>
          <img
            className="icon-submenu"
            src={ArrowSubMenu}
            alt="Icon fleche sous-menu"
            width={20}
            height={11}
          />
        </a>
      ),
      sousMenus: [
        {
          id: 21,
          nom: "Grille de Produit",
          lienMenu: "/admin/datagrid-produit",
        },
        { id: 22, nom: "Ajouter un Produit", lienMenu: "/admin/add-produit" },
      ],
    },
    {
      id: 2,
      nom: (
        <a href className={"a-admin"} title="Categorie">
          <img
            src={IconCategorie}
            alt="Icon dossier catégorie"
            width={50}
            height={50}
          />
          <p>Catégorie</p>
          <img
            className="icon-submenu"
            style={{ left: "113px" }}
            src={ArrowSubMenu}
            alt="Icon fleche sous-menu"
            width={20}
            height={11}
          />
        </a>
      ),
      sousMenus: [
        {
          id: 21,
          nom: "Grille des Catégorie",
          lienMenu: "/admin/datagrid-categorie",
        },
        {
          id: 22,
          nom: "Ajouter une Catégorie",
          lienMenu: "/admin/add-categorie",
        },
      ],
    },
    {
      id: 3,
      nom: (
        <a href className={"a-admin"} title="Commande">
          <img
            src={IconCommande}
            alt="Icon caddie commande"
            width={50}
            height={50}
          />
          <p>Commande</p>
        </a>
      ),
      sousMenus: [],
      lien: "/admin/commande",
    },
    {
      id: 4,
      nom: (
        <a href className={"a-admin"} title="Utilisateur">
          <img src={IconUser} alt="Icon utilisateur" width={50} height={50} />
          <p>Utilisateur</p>
        </a>
      ),
      sousMenus: [],
      lien: "/admin/user-admin",
    },
  ];

  const mesLiensAdmin = lienMenuAdmin.map((lienAdmin, i) => (
    <Link key={i} to={lienAdmin.lien}>
      <li key={lienAdmin.id} className="li-admin">
        <div
          className={`menu-item ${
            activeSubMenu === lienAdmin.id ? "active" : ""
          }`}
          onClick={() => handleSubMenuClick(lienAdmin.id)}
        >
          {lienAdmin.nom}
        </div>
        {activeSubMenu === lienAdmin.id && (
          <ul className="sous-menu">
            {lienAdmin.sousMenus.map((sousMenu) => (
              <Link to={sousMenu.lienMenu}>
                <li key={sousMenu.id} className="sous-menu-item">
                  <a
                    href={sousMenu.lienMenu}
                    className={"a-admin"}
                    title={sousMenu.nom}
                  >
                    {sousMenu.nom}
                  </a>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </li>
    </Link>
  ));

  return (
    <nav
      className={"nav-admin"}
      style={
        location.pathname === "/admin" ||
        location.pathname === "/admin/add-categorie" ||
        location.pathname === "/admin/add-produit" ||
        location.pathname === "/admin/datagrid-produit" ||
        location.pathname === "/admin/datagrid-categorie" ||
        location.pathname === "/admin/commande" ||
        location.pathname === "/admin/user-admin"
          ? null
          : { display: "none" }
      }
    >
      <div className="div-logo-admin">
        <Link to={"/"}>
          <img src={Logo} alt="Logo Pizza YoYo" className="logo-admin" />
        </Link>
      </div>

      <ul className="ul-admin">
        <li className="li-admin">{mesLiensAdmin}</li>
      </ul>
    </nav>
  );
}
