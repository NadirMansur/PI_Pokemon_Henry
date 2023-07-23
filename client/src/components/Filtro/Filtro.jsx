import { useDispatch } from "react-redux";
import style from "./Filtro.module.css";
import FilterType from "../FilterType/FilterType";
import {
  filterCards,
  orderCards,
  ultimoFiltro,
} from "../../redux/actions/actions.js";

const Filtros = ({ setnumeroPagina }) => {
  const dispatch = useDispatch();

  ////////////////////////////////////////////////////////////////

  const handleFilter = (event) => {
    // Obtener el valor seleccionado del evento
    const origen = event.target.value;
     // Establecer el número de página en 1
    setnumeroPagina(1);
     // Despachar la acción para filtrar las tarjetas por origen
    dispatch(filterCards(origen));
     // Despachar la acción para guardar el último filtro aplicado
    dispatch(ultimoFiltro(origen));
  };
   const handleSort = (event) => {
    // Obtener el valor seleccionado del evento
    const order = event.target.value;
     // Despachar la acción para ordenar las tarjetas
    dispatch(orderCards(order));
     // Despachar la acción para guardar el último filtro aplicado
    dispatch(ultimoFiltro(order));
  };

  return (
    <div className={style.filtro}>
      <div>
        <label htmlFor="">Filter by</label>
        <select name="" id="" onChange={handleFilter}>
          <option value="todosLosPokes">allPokes</option>
          <option value="laBDD">BDD</option>
          <option value="porAPI">API</option>
        </select>
        <label htmlFor="">Sort by</label>
        <select name="" id="" onChange={handleSort}>
          <option value="AA">Ataque Acendente</option>
          <option value="AD">Ataque Descendente</option>
          <option value="NA">Nombre Acendente</option>
          <option value="ND">Nombre Descendente</option>
        </select>
      </div>
      <FilterType />
    </div>
  );
};
export default Filtros;
