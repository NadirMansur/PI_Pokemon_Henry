import style from './SearchBar.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SearchBar({onSearch}) {
   const [poke,setPoke] = useState("");

   const handleChange = (e) => {
    setPoke(e.target.value);
   };   
   //console.log("location en searchBar es: ", location.pathname);
   return (
      <div className={style.search}>
         <input 
            type='search' 
            placeholder="Busqueda"
            onChange={handleChange}
            value = {poke}
         />
         <button className={style.boton} onClick={() => onSearch (poke)}>Agregar</button>
      </div>
   );
}
