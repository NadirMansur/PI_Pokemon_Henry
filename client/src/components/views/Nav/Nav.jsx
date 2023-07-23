// Importar el componente SearchBar desde la ruta "../../SearchBar/SearchBar"
import SearchBar from "../../SearchBar/SearchBar";
// Importar la librería React
import React from "react";
// Importar el componente Link desde la librería "react-router-dom"
import { Link } from "react-router-dom";
import style from "./Nav.module.css";
// Definir el componente Nav
const Nav = ({ onSearch }) => {
  return (
    <div className={style.nav}>
      {/* Crear un enlace hacia la ruta "/form" */}
      <div>
        <Link to="/form">
          <button className={style.createButton}>¡Crear Pokemon!</button>
        </Link>
      </div>
      {/* Renderizar el componente SearchBar y pasarle la función onSearch como prop */}
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};
// Exportar el componente Nav como el valor por defecto
export default Nav;
