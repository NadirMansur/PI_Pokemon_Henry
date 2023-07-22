// Importar el componente SearchBar desde la ruta "../../SearchBar/SearchBar"
import SearchBar from "../../SearchBar/SearchBar";
// Importar la librería React
import React from "react";
// Importar el componente Link desde la librería "react-router-dom"
import { Link } from "react-router-dom";
 // Definir el componente Nav
const Nav = ({ onSearch }) => {
  return (
    <div>
      {/* Crear un enlace hacia la ruta "/form" */}
      <Link to="/form">
        <button>¡Crear Pokemon!</button>
      </Link>
      {/* Renderizar el componente SearchBar y pasarle la función onSearch como prop */}
      <SearchBar onSearch={onSearch} />
    </div>
  );
};
 // Exportar el componente Nav como el valor por defecto
export default Nav;