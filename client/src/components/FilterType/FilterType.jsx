import style from "./FilterType.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actualizarFiltroTipo } from "../../redux/actions/actions";
import { filtroXtipo, filterCards } from "../../redux/actions/actions.js";
import React, { useEffect } from "react";

const FilterType = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  let filterType = state.isChecked;
  const ultimoFiltro = state.ultimoFiltro;
  const allPokemon = state.allPoke;

  const handleOnChange = (event) => {
    const caso = event.target.value;
    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].box === caso) {
        filterType[i].state = !filterType[i].state;
      }
    }
    console.log("filterType Antes del dispatch es ", filterType);
    dispatch(actualizarFiltroTipo(filterType));
    ////////////////////// A ESTE PUNTO EL ESTADO GLOBAL DE LOS CHECKSBOX ESTA ACTUAIADO
  };

  const filtrarPorTipo = () => {
    console.log("filtrarPorTipo");
    const arrayDeTipos = [];

    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].state === true) {
        arrayDeTipos.push(filterType[i].box);
      }
    }
    console.log("arrayDeTipos Antes del IF es ", arrayDeTipos);
    if (arrayDeTipos.length === 0) {
      console.log("arrayDeTipos esta vacio");
      const origen = "todosLosPokes";
      dispatch(filterCards(origen));
    } else {
      console.log("arrayDeTipos Antes del dispatch es ", arrayDeTipos);
      dispatch(filtroXtipo(arrayDeTipos));
    }
  };

  return (
    <div className={style.checkBox}>
      {filterType.map((tipo, index) => (
        <div key={index} className={style.filtro}>
          <label>
            {`${tipo.box}`}
            <input
              type="checkbox"
              value={tipo.box}
              checked={tipo.state}
              onChange={handleOnChange}
            ></input>
          </label>
        </div>
      ))}
      <button onClick={filtrarPorTipo}>Filtrar</button>
    </div>
  );
};

export default FilterType;
