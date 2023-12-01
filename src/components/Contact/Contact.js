import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./contact.css";

// Image
import IconSend from "../../assets/icon/paper-plane.gif";

export default function Contact() {
  const location = useLocation();
  const form = useRef();

  // État local pour suivre les valeurs des champs du formulaire
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    number_tel: "",
    message: "",
    name_entreprise: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    if (
      formData.email === "" ||
      formData.name === "" ||
      formData.number_tel === "" ||
      formData.message === ""
    ) {
      toast.error(
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Email Vide</p>
        </div>
      );
    } else {
      emailjs
        .sendForm(
          "service_dxoxyjd",
          "template_bl6la9h",
          form.current,
          "gqLHtQDft_38QX8kY"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast(
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={IconSend}
                  alt="Icon de l'ajout' du produit"
                  width={50}
                  style={{ marginRight: "10px" }}
                />
                <p>Email Envoyé !</p>
              </div>
            );
            setFormData({
              email: "",
              name: "",
              number_tel: "",
              message: "",
              name_entreprise: "",
            });
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  // Gérer les modifications des champs du formulaire et mettre à jour l'état local
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {location.pathname === "/" ? (
        <div
          className="contact-center-container"
          style={{
            margin: location.pathname === "/contact" ? "0" : "",
            height: location.pathname === "/" ? "" : "70vh",
          }}
        >
          <div
            className="contact-container"
            style={{
              background: location.pathname === "/contact" ? "none" : "",
            }}
          >
            <div className="contact-box contact-box-info">
              <h2 className="contact-title">
                Ou Nous Trouver ?
              </h2>
              <section className="contact-info">
                <p className="contact-text">
                  Nom de L'entreprise
                </p>
                <p className="contact-text">
                  Adresse Siege
                </p>
                <p className="contact-text">
                  Code Postal - Pays
                </p>
                <p className="contact-text">
                  Numéro de Telephone
                </p>
                <p className="contact-text">
                  Email
                </p>
              </section>
            </div>
            <div className="contact-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.712161404163!2d5.795283476861443!3d49.54658445203036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47eab7d873d3eddb%3A0xa46786a1b484a6d6!2s14%20Rue%20des%20Violettes%2C%2054350%20Mont-Saint-Martin!5e0!3m2!1sfr!2sfr!4v1691414661813!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title={"maps"}
              />
            </div>
          </div>
        </div>
      ) : (
        <section className="section-contact-email">
          <div className="div-primary-contact-email">
            <h2 className="titre-contact-email">Contact</h2>
            <div>
              <form
                ref={form}
                onSubmit={sendEmail}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  type="email"
                  className="input-contact-email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="input-contact-email"
                  placeholder="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="input-contact-email"
                  placeholder="Numero de Telephone"
                  name="number_tel"
                  value={formData.number_tel}
                  onChange={handleInputChange}
                />
                <textarea
                  type="text"
                  className="input-contact-email"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="input-contact-email"
                  placeholder="Nom Entreprise (Optionnel)"
                  name="name_entreprise"
                  value={formData.name_entreprise}
                  onChange={handleInputChange}
                />
                <div className="div-btn-contact-email">
                  <Button
                    type="submit"
                    size="small"
                    className="btn-contact-email"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
      <ToastContainer
        position="top-right"
        newestOnTop
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        bodyClassName="toastify-content"
        autoClose={5000}
      />
    </>
  );
}
