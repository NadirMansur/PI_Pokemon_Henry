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
      type: ACTUALIZAR_TYPES, // Tipo de acción para actualizar los tipos
      payload: aux, // Datos auxiliares para actualizar los tipos
    });
  };
};

export const actualizarFiltroTipo = (filterType) => {
  return (dispatch) => {
    dispatch({
      type: ACTUALIZAR_FILTRO_TIPO, // Tipo de acción para actualizar el filtro por tipo
      payload: filterType, // Tipo de filtro a actualizar
    });
  };
};

export const cargarBDD = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/api/pokemons"); // Hacer una petición GET a la API para obtener los datos de los pokémon
      dispatch({
        type: CARGA_BDD, // Tipo de acción para cargar la base de datos
        payload: data, // Datos de los pokémon obtenidos de la API
      });
    } catch (err) {
      console.log(err); // Mostrar el error en la consola en caso de que ocurra
    }
  };
};

export const ultimoFiltro = (string) => {
  return (dispatch) => {
    dispatch({
      type: LAST_FILTER, // Tipo de acción para el último filtro
      payload: string, // Cadena de texto para el último filtro
    });
  };
};

 export const filterCards = (origen) => {
  return async (dispatch, getState) => {
    try {
      //////////comente este espacio de codigo a ver si funciona //////
      const state = await getState(); // Obtener el estado actual de la aplicación
      ////////////////////////////////////////////////////////////////
      const bddData = state.BDD; // Datos de la base de datos
      const apiPokeData = state.apiPoke; // Datos de la API de pokémon
      const allData = [...bddData, ...apiPokeData]; // Combinar los datos de la base de datos y de la API
      switch (origen) {
        case "todosLosPokes":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar los pokémon
            payload: allData, // Datos de todos los pokémon
          });
        case "laBDD":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar los pokémon
            payload: bddData, // Datos de la base de datos
          });
        case "porAPI":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar los pokémon
            payload: apiPokeData, // Datos de la API de pokémon
          });
        default:
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar los pokémon
            payload: allData, // Datos de todos los pokémon
          });
      }
    } catch (err) {
      console.log(err); // Mostrar el error en la consola en caso de que ocurra
    }
  };
};
//////////// ahora recive por parametro un copia del extado filterType Actualizado
export const filtroXtipo = (filtros) => {
  /////// FILTRE POR TIPO ////////
  return (dispatch, getState) => {
    const state = getState(); // Obtener el estado actual de la aplicación
    const filtrados = state.filtro; // Obtener los datos filtrados
    const filtro_filtrado = [...filtrados].filter((pokemon) => {
      for (let filtro of filtros) {
        for (let propiedad in pokemon) {
          if (Array.isArray(pokemon[propiedad])) {
            for (let element of pokemon[propiedad]) {
              if (typeof element.type === "string") {
                if (element.type === filtro) {
                  return true; // Si el tipo coincide con el filtro, devolver verdadero
                }
              } else {
                if (element.type.name === filtro) {
                  return true; // Si el nombre del tipo coincide con el filtro, devolver verdadero
                }
              }
            }
          }
        }
      }
      return false; // Si no se encuentra ningún tipo que coincida con el filtro, devolver falso
    });
    dispatch({
      type: FILTRO_TIPO, // Tipo de acción para filtrar por tipo
      payload: filtro_filtrado, // Datos filtrados por tipo
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
            type: FILTER, // Tipo de acción para filtrar
            payload: [...filtrados].sort((a, b) => a.Ataque - b.Ataque), // Ordenar filtrados por ataque ascendente
          });
        case "AD":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar
            payload: [...filtrados].sort((a, b) => b.Ataque - a.Ataque), // Ordenar filtrados por ataque descendente
          });
        case "NA":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar
            payload: [...filtrados].sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
            }), // Ordenar filtrados por nombre ascendente
          });
        case "ND":
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar
            payload: [...filtrados].sort((a, b) => {
              if (b.name < a.name) {
                return -1;
              }
            }), // Ordenar filtrados por nombre descendente
          });
        default:
          return dispatch({
            type: FILTER, // Tipo de acción para filtrar
            payload: filtrados, // Mantener los datos filtrados sin ordenar
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
        type: API_POKE, // Tipo de acción para agregar datos de la API
        payload: poke, // Datos de la API a agregar
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
      const bddData = state.BDD; // Datos de la base de datos
      const apiPokeData = state.apiPoke; // Datos de la API
      const allData = [...bddData, ...apiPokeData]; // Concatenar datos de la base de datos y de la API
      return dispatch({
        type: ALL_POKE, // Tipo de acción para obtener todos los datos
        payload: allData, // Todos los datos concatenados
      });
    } catch (err) {
      console.log(err);
    }
  };
};