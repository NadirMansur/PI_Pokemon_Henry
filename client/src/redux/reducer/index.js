import {
  ADD_FAV,
  REMOVE_FAV,
  ORDER,
  FILTRO_TIPO,
  FILTER,
  ACTUALIZAR_FILTRO_TIPO,
  LAST_FILTER,
  API_POKE,
  ALL_POKE,
  CARGA_BDD,
} from "../actions/types";

const initialState = {
  BDD: [],
  apiPoke: [],
  allPoke: [],
  filtro: [],
  filtroTipo: [],
  ultimoFiltro: "todosLosPokes",
  isChecked: [
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
    //     case ADD_FAV:
    //         return {myFavorites: payload, allCharacters: payload };

    //     case REMOVE_FAV:
    //         return {
    //             ...state,
    //             myFavorites: state.allCharacters.filter((char)=> char.id != payload),
    //             allCharacters: state.allCharacters.filter((char)=> char.id != payload)
    //         }

    //     case REMOVE_FAV:

    //         return {myFavorites: payload, allCharacters: payload }
    //     ;
    //         case FILTER:
    //             return {
    //                 ...state,
    //                 myFavorites : state.allCharacters.filter((char)=> char.gender === payload)
    //             }
    //             ;
    //         case ORDER:
    //             return {
    //                 ...state,
    //                 myFavorites : state.allCharacters.sort((a,b)=> {
    //                     if(a.id > b.id){
    //                         return payload === "A" ? 1: -1;
    //                     }
    //                     if(a.id < b.id){
    //                         return payload === "A" ? -1: 1;
    //                     }
    //                     return 0;
    //                 })
    //             }
    //             ;
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
