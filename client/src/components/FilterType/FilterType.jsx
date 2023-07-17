import style from "./FilterType.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actualizarFiltroTipo } from "../../redux/actions/actions";
import { filtroXtipo } from "../../redux/actions/actions.js";
import React, { useEffect } from "react";

const FilterType = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  let filterType = state.isChecked;

  const handleOnChange = (event) => {
    event.preventDefault();
    const caso = event.target.value;
    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].box === caso) {
        filterType[i].state = !filterType[i].state;
      }
    }
    dispatch(actualizarFiltroTipo(filterType));
    ////////////////////// A ESTE PUNTO EL ESTADO GLOBAL DE LOS CHECKSBOX ESTA ACTUAIADO
  };

  const filtrarPorTipo = () => {
    console.log(
      "Filtertype.jsx entre a hacer filtrarPorTipo     dispatch(filtroXtipo(filterType));"
    );
    dispatch(filtroXtipo(filterType));
  };

  // useEffect(() => {
  //   filterType = state.isChecked;
  // }, [state.isChecked]);

//////////////////////////// posibilidad ReALIZAR VALIDACION EN EL MAP /////////////

  return (
    <div className={style.checkBox}>
      {filterType.map((tipo, index) => (
        <div key={index}>
          <label>
            {`${tipo.box}`}
            <input
              type="checkbox"
              value={`${tipo.box}`}
              checked={tipo.state}
              onChange={handleOnChange}
            ></input>
          </label>
        </div>
      ))}
      <button onChange={filtrarPorTipo}>Filtrar</button>
    </div>
  );
};

export default FilterType;
