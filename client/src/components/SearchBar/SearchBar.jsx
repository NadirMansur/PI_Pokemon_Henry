import style from "./SearchBar.module.css";
import { useState } from "react";
 export default function SearchBar({ onSearch }) {
  const [poke, setPoke] = useState(""); // Estado para almacenar el valor del input
   const handleChange = (e) => {
    setPoke(e.target.value); // Actualiza el estado con el valor del input
  };
  return (
    <div className={style.search}>
      <input
        type="search"
        placeholder="Busqueda"
        onChange={handleChange} // Llama a la función handleChange cuando se cambia el valor del input
        value={poke} // Establece el valor del input como el estado poke
      />
      <button className={style.boton} onClick={() => onSearch(poke)}>
        Agregar
      </button>
    </div>
  );
}
