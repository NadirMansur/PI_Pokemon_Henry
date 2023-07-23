import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  cargarBDD,
  allPoke,
  filterCards,
  agregarApi,
} from "../../redux/actions/actions.js";
import axios from "axios";
import Card from "../Card/Card";
import Nav from "../views/Nav/Nav";
import Filtro from "../Filtro/Filtro";
import { NavLink } from "react-router-dom";

import buscarEnAllPoke from "../../modulos/buscarEnAllPoke.js";
import paginado from "../../modulos/paginado.js";

const Cards = (props) => {
  const dispatch = useDispatch();
  //////////////////////////////////////////////////////////////////////////////////
  // Obtener los datos del estado utilizando el hook useSelector
  const allPokes = useSelector((state) => state.allPoke);
  const filtrados = useSelector((state) => state.filtro);
  const ultimoFiltro = useSelector((state) => state.ultimoFiltro);
  const filtroTipo = useSelector((state) => state.filtroTipo);
  //////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  // Declarar y establecer los estados iniciales
  const [numeroPagina, setnumeroPagina] = useState(1); // Estado para el número de página
  const [size, setsize] = useState(12); // Estado para el tamaño de página
  const [allPages, setallPages] = useState(paginado(filtrados, size)); // Estado para todas las páginas
  const [pokeName, setPokeName] = useState(""); // Estado para el nombre del Pokémon
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar o no el popup
  /////////////////////////////////////////////////////////////////////////

  //////////////////////////////// FUNCNIONES SECUNDARIAS ///////////////////////////////////////
  const inicio = async () => {
    // Cargar la base de datos
    await dispatch(cargarBDD());
    // Obtener todos los Pokémon
    dispatch(allPoke());
  };
  // Actualizar el estado state.apiPoke agregando la data
  const paLaApi = (data) => {
    dispatch(agregarApi(data));
    dispatch(allPoke());
  };
  const handleNextpage = () => {
    setnumeroPagina(numeroPagina + 1);
  };
  const handleBackpage = () => {
    setnumeroPagina(numeroPagina - 1);
  };
  const handleBuscarOtro = () => {
    setShowPopup(false);
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////// useEffects /////////////////////////////////////
  // Ejecutar la función de inicio al cargar el componente
  useEffect(() => {
    inicio();
  }, []);
  // Actualizar las tarjetas filtradas cuando cambian los Pokémon
  useEffect(() => {
    dispatch(filterCards(ultimoFiltro));
  }, [allPokes]);
  // Actualizar las páginas cuando cambian las tarjetas filtradas
  useEffect(() => {
    setallPages(paginado(filtrados, size));
  }, [filtrados]);
  // Actualizar las páginas cuando cambia el filtro de tipo
  useEffect(() => {
    setallPages(paginado(filtroTipo, size));
  }, [filtroTipo]);
  //////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////FUNCIONES PRINCIPALES ///////////////////////////////////////////
  async function onSearch(name) {
    try {
      ////////////si es true, ya esta en el paginado /////////////
      if (buscarEnAllPoke(name, allPokes)) {
        window.alert("onSearch, !El pokemon ya se encuentra agregado¡");
      } else {
        const { data } = await axios(
          `http://localhost:3001/api/pokemons/?name=${name}`
        );
        if (data.hasOwnProperty("type")) {
          if (data.name !== name) {
            setPokeName(data.name);
            setShowPopup(true);
          } else {
            paLaApi(data);
            window.alert("El pokemon fue agregado");
          }
        }
        //pero si tiene propiedad types
        else if (data[0].hasOwnProperty("types")) {
          if (data.name !== name) {
            setPokeName(data[0].name);
            setShowPopup(true);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      window.alert(error.message);
    }
    //MODIFICAR ESTados globales
  }
  async function handleAddPokemon() {
    try {
      if (buscarEnAllPoke(pokeName, allPokes)) {
        window.alert("!El pokemon ya se encuentra agregado¡");
      } else {
        const { data } = await axios(
          `http://localhost:3001/api/pokemons/?name=${pokeName}`
        );
        if (data.hasOwnProperty("type")) {
          // Actualizar el estado state.apiPoke agregando la data
          paLaApi(data);
          window.alert("El pokemon fue agregado");
        }
      }
      setShowPopup(false);
    } catch (error) {
      console.log(error.message);
      window.alert(error.message);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={style.background}>
      <div className={style.cards}>
        <Nav onSearch={onSearch} />

        <Filtro
          setnumeroPagina={() => {
            setnumeroPagina(1);
          }}
        />

        {showPopup && (
          <div className={style.popup}>
            <div>
              <h2>¿Quisiste decir {pokeName}?</h2>
            </div>
            <div className={style.popupButtons}>
              <button
                className={style.popupButton}
                onClick={() => {
                  handleAddPokemon();
                }}
              >
                Sí, agregar
              </button>
              <button
                className={style.popupButton}
                onClick={() => {
                  handleBuscarOtro();
                }}
              >
                Buscar otro Pokémon
              </button>
            </div>
          </div>
        )}

        <div className={style.galeria}>
          <button
            className={style.entrar}
            onClick={() => {
              handleBackpage();
            }}
          >
            Pagina anterior
          </button>
          <div className={style.cartas}>
            {numeroPagina - 1 < 0 || numeroPagina > allPages.length ? (
              <div>{window.alert("No hay nada por aqui, volve!")}</div>
            ) : (
              allPages[numeroPagina - 1].map((pokemon) => (
                <div key={pokemon.id}>
                  <NavLink
                    to={`/detail/${pokemon.id}`}
                    activeClassName={style.active}
                    className={style.link}
                  >
                    <Card
                      key={pokemon.id}
                      id={pokemon.id}
                      name={pokemon.name}
                      imagen={pokemon.imagen}
                      tipos={pokemon.types ? pokemon.types : pokemon.type}
                    />
                  </NavLink>
                </div>
              ))
            )}
          </div>
          <button
            className={style.entrar}
            onClick={() => {
              handleNextpage();
            }}
          >
            Siguiente pagina
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
