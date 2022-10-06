import React from "react";
import ReactDOM from "react-dom/client";
import Pokedex from "./components/Pokedex.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Pokedex />
  </React.StrictMode>
);
