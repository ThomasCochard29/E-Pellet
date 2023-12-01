// api.js
import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Autorise l'envoi de cookies avec les requêtes.
API.defaults.withCredentials = true;

export default API;