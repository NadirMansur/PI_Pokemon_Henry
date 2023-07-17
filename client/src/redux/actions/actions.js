import axios from "axios";
//import { useSelector, useDispatch } from "react-redux";
import {
  ADD_FAV,
  REMOVE_FAV,
  FILTER,
  LAST_FILTER,
  ALL_POKE,
  API_POKE,
  CARGA_BDD,
  FILTRO_TIPO,
  ACTUALIZAR_FILTRO_TIPO,
} from "./types";

///revisar operaciones asincronas

export const actualizarFiltroTipo = (filterType) => {
  return (dispatch) => {
    dispatch({
      type: ACTUALIZAR_FILTRO_TIPO,
      payload: filterType,
    });
  };
};

export const cargarBDD = () => {
  console.log("Actions.js Entre a cargarBDD");
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/api/pokemons");
      console.log("Actions.js data para cargarBDD", data);
      dispatch({
        type: CARGA_BDD,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const agregarBDD = () => {};

export const ultimoFiltro = (string) => {
  console.log("Actions.js entre a ultimoFiltro");
  console.log(
    `Actions.js dispatch({   type: LAST_FILTER,      payload: ${string},`
  );
  return (dispatch) => {
    dispatch({
      type: LAST_FILTER,
      payload: string,
    });
  };
};

export const filterCards = (origen) => {
  console.log("ACTIONS:JS entre a la funcion filterCards");
  return async (dispatch, getState) => {
    try {
      //////////comente este espacio de codigo a ver si funciona //////
      const state = await getState();
      ////////////////////////////////////////////////////////////////
      //const state = useSelector((state) => state);
      const bddData = state.BDD;
      const apiPokeData = state.apiPoke;
      const allData = [...bddData, ...apiPokeData];
      console.log(
        "filterCards: bddData, apiPokeData, y allData son:  ",
        bddData,
        apiPokeData,
        allData
      );
      console.log(
        "en actions.js filterCards, origin antes del switch es: ",
        origen
      );
      switch (origen) {
        case "todosLosPokes":
          console.log(
            "CASE selecionar por",
            origen,
            "se hace un dispatch de FILTER"
          );
          console.log(
            "////////////////////////////////////////////////////////////////////////////////////////////////"
          );
          return dispatch({
            type: FILTER,
            payload: allData,
          });
        case "laBDD":
          console.log("a CASE selecionar por", origen);
          console.log(
            "////////////////////////////////////////////////////////////////////////////////////////////////"
          );
          return dispatch({
            type: FILTER,
            payload: bddData,
          });
        case "porAPI":
          console.log("a CASE selecionar por", origen);
          console.log("ingrese a actions.js y ejectue caso API");
          console.log("voy a hacer el dispatch con apiPokeData", apiPokeData);
          console.log(
            "////////////////////////////////////////////////////////////////////////////////////////////////"
          );
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
    console.log("/////////////// filtroXtipo ////////////////");
    const filtrados = state.filtro;
    console.log("filtrados ", filtrados);
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
    console.log(
      "entre a la action filtroXtipo y payload es ",
      filtro_filtrado,
      "type: FILTRO_TIPO"
    );
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
      console.log("actions.js, orderCards, antes de switch order es: ", order);
      console.log("y filtrados es: ", filtrados);
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
  console.log("Actions.js entre a agregarApi");
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
  console.log("Actions.js entre a allPoke");
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
