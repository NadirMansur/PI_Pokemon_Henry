import {
  ORDER,
  FILTRO_TIPO,
  FILTER,
  ACTUALIZAR_FILTRO_TIPO,
  LAST_FILTER,
  API_POKE,
  ALL_POKE,
  CARGA_BDD,
  ACTUALIZAR_TYPES,
} from "../actions/types";
 const initialState = {
  BDD: [], // Base de datos
  apiPoke: [], // Datos de la API de Pokemon
  allPoke: [], // Todos los Pokemon
  filtro: [], // Resultados filtrados
  filtroTipo: [], // Filtro por tipo
  ultimoFiltro: "todosLosPokes", // Último filtro aplicado
  types: [], // Tipos de Pokemon disponibles
  isChecked: [ // Estado de las casillas de verificación de tipo de Pokemon
    { box: "normal", state: false },
    { box: "fighting", state: false },
    { box: "flying", state: false },
    { box: "poison", state: false },
    { box: "ground", state: false },
    { box: "rock", state: false },
    { box: "bug", state: false },
    { box: "ghost", state: false },
    { box: "steel", state: false },
    { box: "fire", state: false },
    { box: "water", state: false },
    { box: "grass", state: false },
    { box: "electric", state: false },
    { box: "psychic", state: false },
    { box: "ice", state: false },
    { box: "dragon", state: false },
    { box: "dark", state: false },
    { box: "fairy", state: false },
    { box: "unknown", state: false },
    { box: "shadow", state: false },
  ],
};
 const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTUALIZAR_TYPES:
      return {
        ...state,
        types: payload,
      };
    case CARGA_BDD:
      return {
        ...state,
        BDD: payload,
      };
     case API_POKE:
      return {
        ...state,
        apiPoke: [...state.apiPoke, payload],
      };
     case ALL_POKE:
      return {
        ...state,
        allPoke: payload,
      };
     case FILTRO_TIPO:
      return {
        ...state,
        filtroTipo: payload,
      };
    case ACTUALIZAR_FILTRO_TIPO:
      return {
        ...state,
        isChecked: payload,
      };
    case FILTER:
      return {
        ...state,
        filtro: payload,
      };
     case LAST_FILTER:
      return {
        ...state,
        ultimoFiltro: payload,
      };
     case ORDER:
      return {
        ...state,
        filtro: payload,
      };
     default:
      return {
        ...state,
      };
  }
};
 export default rootReducer;