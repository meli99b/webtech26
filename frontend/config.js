
const RENDER_BACKEND_URL = "https://taskwise-app.onrender.com";

const API_BASE =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:8080"
    : RENDER_BACKEND_URL.replace(/\/$/, "");
