import axios from "axios";
import {
  FILTER,
  LAST_FILTER,
  ALL_POKE,
  API_POKE,
  CARGA_BDD,
  FILTRO_TIPO,
  ACTUALIZAR_FILTRO_TIPO,
  ACTUALIZAR_TYPES,
} from "./types";

///revisar operaciones asincronas

export const actualizarTypes = (aux) => {
  return (dispatch) => {
    dispatch({
      type: ACTUALIZAR_TYPES,
      payload: aux,
    });
  };
};

export const actualizarFiltroTipo = (filterType) => {
  return (dispatch) => {
    dispatch({
      type: ACTUALIZAR_FILTRO_TIPO,
      payload: filterType,
    });
  };
};

export const cargarBDD = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/api/pokemons");
      dispatch({
        type: CARGA_BDD,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const ultimoFiltro = (string) => {
  return (dispatch) => {
    dispatch({
      type: LAST_FILTER,
      payload: string,
    });
  };
};

export const filterCards = (origen) => {
  return async (dispatch, getState) => {
    try {
      //////////comente este espacio de codigo a ver si funciona //////
      const state = await getState();
      ////////////////////////////////////////////////////////////////
      //const state = useSelector((state) => state);
      const bddData = state.BDD;
      const apiPokeData = state.apiPoke;
      const allData = [...bddData, ...apiPokeData];
      switch (origen) {
        case "todosLosPokes":
          return dispatch({
            type: FILTER,
            payload: allData,
          });
        case "laBDD":
          return dispatch({
            type: FILTER,
            payload: bddData,
          });
        case "porAPI":
          return dispatch({
            type: FILTER,
            payload: apiPokeData,
          });
        default:
          return dispatch({
            type: FILTER,
            payload: allData,
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
//////////// ahora recive por parametro un copia del extado filterType Actualizado
export const filtroXtipo = (filtros) => {
  ///////////la idea es que sobre el filtro ORIGEN,
  /////// FILTRE POR TIPO ////////
  return (dispatch, getState) => {
    const state = getState();
    const filtrados = state.filtro;
    const filtro_filtrado = [...filtrados].filter((pokemon) => {
      for (let filtro of filtros) {
        for (let propiedad in pokemon) {
          if (Array.isArray(pokemon[propiedad])) {
            for (let element of pokemon[propiedad]) {
              if (typeof element.type === "string") {
                if (element.type === filtro) {
                  return true;
                }
              } else {
                if (element.type.name === filtro) {
                  return true;
                }
              }
            }
          }
        }
      }
      return false;
    });
    dispatch({
      type: FILTRO_TIPO,
      payload: filtro_filtrado,
    });
  };
};

export const orderCards = (order) => {
  return async (dispatch, getState) => {
    try {
      const state = await getState(); // Obtener el estado actual
      const filtrados = state.filtro;
      switch (order) {
        case "AA":
          return dispatch({
            type: FILTER,
            payload: [...filtrados].sort((a, b) => a.Ataque - b.Ataque),
          });
        case "AD":
          return dispatch({
            type: FILTER,
            payload: [...filtrados].sort((a, b) => b.Ataque - a.Ataque),
          });
        case "NA":
          return dispatch({
            type: FILTER,
            payload: [...filtrados].sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
            }),
          });
        case "ND":
          return dispatch({
            type: FILTER,
            payload: [...filtrados].sort((a, b) => {
              if (b.name < a.name) {
                return -1;
              }
            }),
          });
        default:
          return dispatch({
            type: FILTER,
            payload: filtrados,
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const agregarApi = (poke) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: API_POKE,
        payload: poke,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const allPoke = () => {
  return async (dispatch, getState) => {
    try {
      const state = await getState(); // Obtener el estado actual
      const bddData = state.BDD;
      const apiPokeData = state.apiPoke;
      const allData = [...bddData, ...apiPokeData]; // concatenación
      return dispatch({
        type: ALL_POKE,
        payload: allData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
