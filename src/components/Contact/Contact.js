import React from "react";

// CSS
import "./contact.css";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();

  const pFont = {fontSize: location.pathname === "/contact" ? "30px" : ""}

  return (
    <div
      className="contact-center-container"
      style={{
        margin: location.pathname === "/contact" ? "0" : "",
        height: location.pathname === "/" ? "" : "70vh",
      }}
    >
      <div
        class="contact-container"
        style={{
          background: location.pathname === "/contact" ? "none" : "",
          alignSelf: "center",
        }}
      >
        <div class="contact-box contact-box-info">
          <h2 className="contact-title" style={{ alignContent: "center" }}>
            Ou Nous Trouver ?
          </h2>
          <section className="contact-info" style={{width: "300px"}}>
            <p className="contact-text" style={pFont}>Nom de L'entreprise</p>
            <p className="contact-text" style={pFont}>Adresse Siege</p>
            <p className="contact-text" style={pFont}>Code Postal - Pays</p>
            <p className="contact-text" style={pFont}>Numéro de Telephone</p>
            <p className="contact-text" style={pFont}>Email</p>
          </section>
        </div>
        <div class="contact-box">
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
  );
}
