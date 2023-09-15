import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./admin.css";

export default function AdminPanel() {
  const lienMenuAdmin = [
    {
      id: 1,
      nom: (
        <a href className={"a-admin-panel"} title="Produits">
          <p>Produit</p>
        </a>
      ),
      sousMenus: [
        {
          id: 21,
          nom: "Grille de Produit",
          lienMenu: "/admin/datagrid-produit",
        },
        {
          id: 22,
          nom: "Ajouter un Produit",
          lienMenu: "/admin/add-produit",
        },
      ],
    },
    {
      id: 2,
      nom: (
        <a href className={"a-admin-panel"} title="Categorie">
          <p>Catégorie</p>
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
        <a href className={"a-admin-panel"} title="Produits">
          <p>Commande</p>
        </a>
      ),
      sousMenus: [],
      lien: "/admin/commande",
    },
    {
      id: 4,
      nom: (
        <a href className={"a-admin-panel"} title="Produits">
          <p>Utilisateur</p>
        </a>
      ),
      sousMenus: [],
      lien: "/admin/datagrid-user",
    },
  ];

  const mesLiens = lienMenuAdmin.map((lienAdmin) => (
    <div style={{display: "flex", flexDirection: "row"}}>
      <li key={lienAdmin.id}>
        <a href={lienAdmin.lien} title={lienAdmin.nom}>
          <p className="sous-menu-li-admin">{lienAdmin.nom}</p>
        </a>
        {lienAdmin.sousMenus.length > 0 && (
          <ul>
            {lienAdmin.sousMenus.map((sousMenu) => (
              <li key={sousMenu.id}>
                <Link to={sousMenu.lienMenu} className="sous-menu-link-admin">
                  {sousMenu.nom}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  ));

  return (
    <div>
      <ul>
        <li className="nav-item d-flex">{mesLiens}</li>
      </ul>
    </div>
  );
}
