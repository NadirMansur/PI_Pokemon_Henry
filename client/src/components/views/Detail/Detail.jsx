// Importar axios para realizar peticiones HTTP
import axios from "axios";
// Importar el hook useParams de "react-router-dom" para obtener los parámetros de la URL
import { useParams } from "react-router-dom";
// Importar el hook useState de "react" para manejar el estado
import { useState, useEffect } from "react";
// Importar el componente Link de "react-router-dom" para crear enlaces
import { Link } from "react-router-dom";
// Importar el estilo desde el archivo "./Detail.module.css"
import style from "./Detail.module.css";
 // Definir el componente Detail
export default function Detail() {
  // Obtener el parámetro "id" de la URL
  const { id } = useParams();
  // Definir el estado "pok" y la función "setPok" para manejar los datos del pokemon
  const [pok, setPok] = useState(null);
   // Función asincrónica para obtener los detalles del pokemon
  async function detail(id) {
    try {
      // Realizar una petición GET a la URL del servidor con el ID del pokemon
      const { data } = await axios(`http://localhost:3001/api/pokemons/${id}`);
      // Verificar si se obtuvo un pokemon con ese ID
      if (data.name) {
        // Actualizar el estado "pok" con los datos del pokemon
        setPok(data);
      } else {
        // Mostrar una alerta si no se encontró un pokemon con ese ID
        window.alert("No hay personajes con ese ID");
      }
    } catch (error) {
      // Mostrar el mensaje de error en la consola y en una alerta
      console.log(error.message);
      window.alert(error.message);
    }
  }
   // Ejecutar la función "detail" cuando el componente se monte
  useEffect(() => {
    detail(id);
  }, []);
   return (
    <div className={style.centro}>
      {/* Crear un enlace hacia la ruta "/home" */}
      <Link to={"/home"}>
        {/* Renderizar un botón para volver a la página de inicio */}
        <button>Volver a home</button>
      </Link>
      {/* Verificar si se ha obtenido el pokemon y si tiene un nombre */}
      {pok && pok.name && (
        <div className={style.detail}>
          <div className={style.cont}>
            {/* Renderizar la imagen del pokemon */}
            <img className={style.img} src={pok.imagen} alt="" />
          </div>
          <div className={style.card}>
            <h1>Detail:</h1>
            {/* Mostrar los detalles del pokemon */}
            <h3>ID: {pok.id}</h3>
            <h3>Nombre: {pok.name}</h3>
            <h3>Vida: {pok.Vida}</h3>
            <h3>Ataque: {pok.Ataque}</h3>
            <h3>Defensa: {pok.Defensa}</h3>
            <h3>Altura: {pok.Altura}</h3>
             <div className={style.types}>
              <h3>type:</h3>
              {/* Mostrar los tipos del pokemon */}
              {pok.types &&
                pok.types.map((element, index) => (
                  <h5 className={style.texto} key={index}>
                    {element.type}
                  </h5>
                ))}
              {/* Mostrar los tipos del pokemon */}
              {pok.type &&
                pok.type.map((element, index) => (
                  <h5 className={style.texto} key={index}>
                    {element.type.name}
                  </h5>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}