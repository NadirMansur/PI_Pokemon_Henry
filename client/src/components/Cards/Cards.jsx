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
  const allPokes = useSelector((state) => state.allPoke);
  const filtrados = useSelector((state) => state.filtro);
  const ultimoFiltro = useSelector((state) => state.ultimoFiltro);
  const filtroTipo = useSelector((state) => state.filtroTipo);
  //////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////
  const [numeroPagina, setnumeroPagina] = useState(1);
  const [size, setsize] = useState(12);
  const [allPages, setallPages] = useState(paginado(filtrados, size));
  const [pokeName, setPokeName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  /////////////////////////////////////////////////////////////////////

  const inicio = async () => {
    await dispatch(cargarBDD());
    dispatch(allPoke());
  };
  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    inicio();
  }, []);

  useEffect(() => {
    dispatch(filterCards(ultimoFiltro));
  }, [allPokes]);

  useEffect(() => {
    setallPages(paginado(filtrados, size));
  }, [filtrados]);
  ////////////// LA IDEA ES QUE AL HAGA EL PAGINADO SOBRE OTRO FILTRO MAS ESPECIFICO)
  useEffect(() => {
    setallPages(paginado(filtroTipo, size));
  }, [filtroTipo]);
  //////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////////////////////
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
            // Actualizar el estado state.apiPoke agregando la data
            const paLaApi = () => {
              dispatch(agregarApi(data));
              dispatch(allPoke());
            };
            paLaApi();
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

      //si tiene propiedad type, debe actualizar el estado state => state.apiPoke
      //agregando la data, a state.apiPoke y actualizando el estado state => state.allPoke
    } catch (error) {
      console.log(error.message);
      window.alert(error.message);
    }
    //MODIFICAR ESTados globales
  }

  const handleNextpage = () => {
    setnumeroPagina(numeroPagina + 1);
  };
  const handleBackpage = () => {
    setnumeroPagina(numeroPagina - 1);
  };

  async function handleAddPokemon() {
    try {
      if (buscarEnAllPoke(pokeName, allPokes)) {
        window.alert("onSearch, !El pokemon ya se encuentra agregado¡");
      } else {
        const { data } = await axios(
          `http://localhost:3001/api/pokemons/?name=${pokeName}`
        );
        if (data.hasOwnProperty("type")) {
          // Actualizar el estado state.apiPoke agregando la data
          //probar si es necesario qye sea async
          const paLaApi = async () => {
            await dispatch(agregarApi(data));
            await dispatch(allPoke());
          };
          paLaApi();
        } //pero si tiene propiedad types
        else if (data[0].hasOwnProperty("types")) {
          window.alert(
            "handleAddPokemon, data[0].hasOwnProperty(types)'El pokemon ya se encuentra agregado."
          );

          //navegar al detail del pokemon
          //si no se encuentra en el estado BDD, lo agrega a BDD
          window.alert(
            "handleAddPokemon 'El pokemon ya se encuentra agregado."
          );
        }
      }
      setShowPopup(false);
    } catch (error) {
      console.log(error.message);
      window.alert(error.message);
    }
  }

  const handleBuscarOtro = () => {
    setShowPopup(false);
  };
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
          <div className="popup">
            <h2>¿Quisiste decir {pokeName}?</h2>
            <button
              onClick={() => {
                handleAddPokemon();
              }}
            >
              Sí, agregar
            </button>
            <button
              onClick={() => {
                handleBuscarOtro();
              }}
            >
              Buscar otro Pokémon
            </button>
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
      {/*<button onClick={borrarEstado}>BORRAR ESTADO</button>*/}
    </div>
  );
};

export default Cards;
