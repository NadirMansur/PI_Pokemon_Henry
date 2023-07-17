import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  cargarBDD,
  borrarState,
  allPoke,
  filterCards,
  agregarApi,
} from "../../../redux/actions/actions";

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
