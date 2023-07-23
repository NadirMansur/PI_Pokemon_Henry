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
  // Obtener el valor seleccionado del evento
  const caso = event.target.value;
   // Actualizar el estado de los checkbox según el caso seleccionado
  for (let i = 0; i < filterType.length; i++) {
    if (filterType[i].box === caso) {
      filterType[i].state = !filterType[i].state;
    }
  }
   // Despachar la acción para actualizar el filtro de tipo
  dispatch(actualizarFiltroTipo(filterType));
   ////////////////////// A ESTE PUNTO EL ESTADO GLOBAL DE LOS CHECKSBOX ESTA ACTUALIZADO
};
 const filtrarPorTipo = () => {
  const arrayDeTipos = [];
   // Crear un array con los tipos seleccionados
  for (let i = 0; i < filterType.length; i++) {
    if (filterType[i].state === true) {
      arrayDeTipos.push(filterType[i].box);
    }
  }
   // Comprobar si se han seleccionado tipos
  if (arrayDeTipos.length === 0) {
    const origen = "todosLosPokes";
    // Despachar la acción para filtrar las tarjetas por origen
    dispatch(filterCards(origen));
  } else {
    // Despachar la acción para filtrar las tarjetas por tipo
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
