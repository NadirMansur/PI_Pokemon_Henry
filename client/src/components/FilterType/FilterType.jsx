import style from "./FilterType.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actualizarFiltroTipo } from "../../redux/actions/actions";
import { filtroXtipo, filterCards } from "../../redux/actions/actions.js";
import { React } from "react";

const FilterType = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  let filterType = state.isChecked;

  const handleOnChange = (event) => {
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
    const arrayDeTipos = [];

    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].state === true) {
        arrayDeTipos.push(filterType[i].box);
      }
    }
    if (arrayDeTipos.length === 0) {
      const origen = "todosLosPokes";
      dispatch(filterCards(origen));
    } else {
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
