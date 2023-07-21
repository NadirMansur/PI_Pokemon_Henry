import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "../Form/Form.module.css";
import axios from "axios";
import { cargarBDD } from "../../redux/actions/actions.js";

//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
const Form = () => {
  ////////////////// crear un funcion de validation //////////////////////////
  const regexNombre = /^[a-z]{1,15}$/;
  const regexHpAtkDef = /^(?:1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d?)$/;
  const regexAlt = /^(?:[1-5]\d{2}|600|[1-9]\d?)$/;
  const regexLink = /^(ftp|http|https):\/\/[^ "]+$/;
  ////////////////////////////////////////////////////////////////
  const validate = (input) => {
    const error = {};
    if (!input.name) {
      error["name"] = "Name vacio";
    }
    if (!regexNombre.test(input.name)) {
      error["name"] =
        "Name deben ser caracteres minusculas y no contener numeros ni simbolos";
    } else {
      error["name"] = "";
    }
    if (!input.hp) {
      error["hp"] = "HP vacio";
    }
    if (!regexHpAtkDef.test(input.hp)) {
      error["hp"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      error["hp"] = "";
    }
    if (!input.attack) {
      error["attack"] = "Ataque vacio";
    }
    if (!regexHpAtkDef.test(input.attack)) {
      error["attack"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      error["attack"] = "";
    }
    if (!input.defense) {
      error["defense"] = "defensa vacio";
    }
    if (!regexHpAtkDef.test(input.defense)) {
      error["defense"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      error["defense"] = "";
    }
    if (!input.height) {
      error["height"] = "Altura vacio";
    }
    if (!regexAlt.test(input.height)) {
      error["height"] = "Debe ser un número esté en el rango de 1 a 600";
    } else {
      error["height"] = "";
    }
    if (!input.image) {
      error["image"] = error["image"] = "Imagen vacia";
    }
    if (!regexLink.test(input.image)) {
      error["image"] = "Debe se un link que dirija a la imagen";
    } else {
      error["image"] = "";
    }
    setErrors(error);
  };
  const validateTypes = (types) => {
    const error = {};
    if (types.length <= 0) {
      error["types"] = "Debe tener al menos un tipo de pokemon";
    } else {
      error["types"] = "";
    }
    setErrorTypes(error);
  };
  const dispatch = useDispatch();
  /////////////////// YO los types los tengo en ischecked //////////////////
  const [filterType, setFilterType] = useState([
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
  ]);
  const [types, setTypes] = useState([]);
  ////////
  //const state = useSelector((state) => state);
  //const types = state.types;
  ////////
  /////////////////// CREA UN ESTADO LOCAL DE INPUTS O CAMPOS //////////////////
  const [input, setInput] = useState({
    name: "", ////////////Debe ser in MINUSCULA, No tener mas de no tener mas 15 caractere, no contener numeros o simbolos,
    hp: "", ////////// debe ser un numero, entre     min: 1, max: 255
    attack: "",
    defense: "",
    height: "",
    image: "",
  });
  ////////////////    CREA UN ESTADO LOCAL DE ERRORES    //////////////////
  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    height: "",
    image: "",
  });
  const [errorTypes, setErrorTypes] = useState({});
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const aux = [...filterType].filter((tipo) => tipo.state === true);
    const aux2 = [];
    for (let i = 0; i < aux.length; i++) {
      aux2.push(aux[i].box);
    }
    setTypes(aux2);
  }, [filterType]);
  useEffect(() => {
    validateTypes(types);
  }, [types]);
  /////////////////////////////////Validacion de input/////////////////////////////////////////
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validate({ ...input, [e.target.name]: e.target.value }, types);
  };

  //////// hay q ue modificar el handleType para que agregue al array //////////////
  //////// de types el valor de e.target.value si cumple con las condiciones////////
  const handleOnChange = (event) => {
    const caso = event.target.value;
    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].box === caso) {
        const updatedFilterType = filterType.map((item, index) => {
          if (index === i) {
            return { ...item, state: !item.state };
          }
          return item;
        });
        setFilterType(updatedFilterType);
      }
    }
  };

  const postPokemon = async function (pokemon) {
    try {
      await axios.post("http://localhost:3001/api/pokemons", pokemon);
      window.alert("Pokemon registrado con exito");
      dispatch(cargarBDD());
    } catch (error) {
      window.alert(error);
    }
  };

  const borrarCheck = () => {
    filterType.forEach((item) => (item.state = false));
  };

  const submitHandler = (e) => {
    e.preventDefault(e);
    if (
      errors.name.length <= 0 &&
      errors.hp.length === 0 &&
      errors.attack.length === 0 &&
      errors.defense.length === 0 &&
      errors.height.length === 0 &&
      errors.image.length === 0 &&
      errorTypes.types.length === 0
    ) {
      postPokemon({
        Vida: Number(input.hp),
        Ataque: Number(input.attack),
        Defensa: Number(input.defense),
        Altura: Number(input.height),
        name: input.name,
        type: types,
        imagen: input.image,
      });
      setInput({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        height: "",
        image: "",
      });
      setTypes([]);
      borrarCheck();
    } else {
      window.alert("tienes un error en la carga del formulario");
    }
    // history.push("/home");
  };
  ////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={style.containerForm}>
      <Link to={"/home"}>
        <button className={style.homeButton}>Home</button>
      </Link>
      <div className={style.createPokemonContainer}>
        <form onSubmit={submitHandler}>
          <div className={style.inputs}>
            <div>
              <div>
                <label className={style.formLabel}>Name:</label>
                <input
                  autoComplete="off"
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.name && <span>{errors.name}</span>}
                </div>
              </div>

              <div>
                <label className={style.formLabel}>Hp:</label>
                <input
                  type="text"
                  value={input.hp}
                  name="hp"
                  placeholder="1-255"
                  required
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.hp && <span>{errors.hp}</span>}
                </div>
              </div>

              <div>
                <label className={style.formLabel}>Attack:</label>
                <input
                  type="text"
                  value={input.attack}
                  name="attack"
                  placeholder="1-255"
                  required
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.attack && <span>{errors.attack}</span>}
                </div>
              </div>

              <div>
                <label className={style.formLabel}>Defense:</label>
                <input
                  type="text"
                  value={input.defense}
                  name="defense"
                  placeholder="1-255"
                  required
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.defense && <span>{errors.defense}</span>}
                </div>
              </div>

              <div>
                <label className={style.formLabel}>Height:</label>
                <input
                  type="text"
                  value={input.height}
                  name="height"
                  placeholder="1-600"
                  required
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.height && <span>{errors.height}</span>}
                </div>
              </div>

              <div>
                <label className={style.formLabel}>Image:</label>
                <input
                  type="text"
                  value={input.image}
                  name="image"
                  placeholder="URL de la imagen"
                  onChange={handleChange}
                />
                <div className={style.error}>
                  {errors.image && <span>{errors.image}</span>}
                </div>
              </div>
            </div>
          </div>
          <div>
            <button type="submit">Crear Pokemón</button>
          </div>
          <div>
            <div className={style.checkBox}>
              {filterType.map((tipo, index) => (
                <div key={index} className={style.filtro}>
                  <label>
                    {`${tipo.box}`}
                    <input
                      type="checkbox"
                      value={filterType[index].box}
                      checked={filterType[index].state}
                      onChange={handleOnChange}
                    ></input>
                  </label>
                </div>
              ))}
            </div>
            <div className={style.error}>
              {errorTypes.types && <span>{errorTypes.types}</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
