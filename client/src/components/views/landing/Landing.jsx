// Importar el componente Link desde la librería "react-router-dom"
import { Link } from "react-router-dom";
// Importar el estilo desde el archivo "./Landing.module.css"
import style from "./Landing.module.css";
 // Definir el componente Landing
const Landing = () => {
  return (
    <div className={style.landing}>
      <div className={style.contenedor}>
        {/* Crear un enlace hacia la ruta "/home" */}
        <Link to="/home">
          {/* Renderizar un botón con la clase "entrar" */}
          <button className={style.entrar}>¡¡Entremos!!</button>
        </Link>
      </div>
    </div>
  );
};
 // Exportar el componente Landing como el valor por defecto
export default Landing;