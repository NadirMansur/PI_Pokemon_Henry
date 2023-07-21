import { Link } from "react-router-dom";
import style from "./Landing.module.css";

const Landing = () => {
  return (
    <div className={style.landing}>
      <div className={style.contenedor}>
        <Link to="/home">
          <button className={style.entrar}>¡¡Entremos!!</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
