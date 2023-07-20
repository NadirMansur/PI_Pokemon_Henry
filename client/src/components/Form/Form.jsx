import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { createPokemon, getTypes, empty } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form/Form.module.css";
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
    console.log("input", input);
    const error = {};
    if (!input.name) {
      console.log("Name vacio");
      error["name"] = "Name vacio";
    }
    if (!regexNombre.test(input.name)) {
      console.log("Name deben ser caracteres minusculas y no conte");
      error["name"] =
        "Name deben ser caracteres minusculas y no contener numeros ni simbolos";
    } else {
      console.log("se seteo en 0 los errores");
      error["name"] = "";
    }
    if (!input.hp) {
      console.log("HP vacio");
      error["hp"] = "HP vacio";
    }
    if (!regexHpAtkDef.test(input.hp)) {
      console.log("Debe ser un número esté en el rango ");
      error["hp"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      console.log("se seteo en 0 los errores");
      error["hp"] = "";
    }
    if (!input.attack) {
      console.log("Ataque vacio");
      error["attack"] = "Ataque vacio";
    }
    if (!regexHpAtkDef.test(input.attack)) {
      console.log("Debe ser un número esté en el rango de 1 a 255");
      error["attack"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      console.log("se seteo en 0 los errores");
      error["attack"] = "";
    }
    if (!input.defense) {
      console.log("defensa vacio");
      error["defense"] = "defensa vacio";
    }
    if (!regexHpAtkDef.test(input.defense)) {
      console.log("Debe ser un número esté en el rango de 1 a 255");
      error["defense"] = "Debe ser un número esté en el rango de 1 a 255";
    } else {
      console.log("se seteo en 0 los errores");
      error["defense"] = "";
    }
    if (!input.height) {
      console.log("Altura vacio");
      error["height"] = "Altura vacio";
    }
    if (!regexAlt.test(input.height)) {
      console.log("Debe ser un número esté en el rango de 1 a 600");
      error["height"] = "Debe ser un número esté en el rango de 1 a 600";
    } else {
      console.log("se seteo en 0 los errores");
      error["height"] = "";
    }
    if (!input.image) {
      console.log("Imagen vacia");
      error["image"] = error["image"] = "Imagen vacia";
    }
    if (!regexLink.test(input.image)) {
      console.log("Debe se un link que dirija a la imagen");
      error["image"] = "Debe se un link que dirija a la imagen";
    } else {
      console.log("se seteo en 0 los errores");
      error["image"] = "";
    }
    setErrors(error);
  };

  const dispatch = useDispatch();
  /////////////////// TOMA DEL ESTADO GLOBAL LOS TYPES //////////////////
  /////////////////// YO los types los tengo en ischecked //////////////////
  const aux = useSelector((state) => state.isChecked);
  const filterType = [
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
  ];

  const history = useHistory(); ///////////////HISTORY para vovler a HOME

  /////////////////// CREA UN ESTADO LOCAL DE INPUTS O CAMPOS //////////////////
  const [input, setInput] = useState({
    name: "", ////////////Debe ser in MINUSCULA, No tener mas de no tener mas 15 caractere, no contener numeros o simbolos,
    hp: "", ////////// debe ser un numero, entre     min: 1, max: 255
    attack: "",
    defense: "",
    height: "",
    image: "",
    types:[],
  });
  ////////////////    CREA UN ESTADO LOCAL DE ERRORES    //////////////////
  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    height: "",
    image: "",
    types: "", /////// error decada string, hay que ahcer un boton por types //////////////////
  });
  /////////////////////////////////Validacion de input/////////////////////////////////////////
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    validate({ ...input, [e.target.name]: e.target.value });
  };

  //////// hay q ue modificar el handleType para que agregue al array //////////////
  //////// de types el valor de e.target.value si cumple con las condiciones////////
  const handleOnChange = (event) => {
    event.preventDefault();
    const caso = event.target.value;
    for (let i = 0; i < filterType.length; i++) {
      if (filterType[i].box === caso) {
        filterType[i].state = !filterType[i].state;
        console.log(`filterType[${i}].state`, filterType[i].state);
      }
    }
    console.log("filterType", filterType);
    const aux3 = filterType;
    const aux = aux3.filter((tipo) => tipo.state === true);
    const aux2 = [];
    console.log("aux", aux);
    for (let i = 0; i < aux.length; i++) {
      console.log("aux[i].box", aux[i].box);
      aux2.push(aux[i].box);
    }
    console.log("aux2", aux2);
    global = aux2;
  };
  let global = [];
  const submitHandler = (e) => {
    console.log("global",global)
    // e.preventDefglobalault(e);
    // dispatch(
    //   createPokemon({
    //     name: input.name,
    //     hp: Number(input.hp),
    //     attack: Number(input.attack),
    //     defense: Number(input.defense),
    //     speed: Number(input.speed),
    //     height: Number(input.height),
    //     weight: Number(input.weight),
    //     image: input.image,
    //     types: input.types.map((type) => {
    //       for (let i = 0; i < types.length; i++) {
    //         if (types[i].name === type) return types[i].id;
    //       }
    //     }),
    //   })
    // );
    //alert("Pokemon registrado con exito");
    // setInput({
    //   name: "",
    //   hp: "",
    //   attack: "",
    //   defense: "",
    //   height: "",
    //   image: "",
    //   types: [],
    // });
    // //dispatch(empty());
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
                {errors.types && <span>{errors.types}</span>}
              </div>
            </div>
          </div>
          <div>
            <button type="submit">Crear Pokemón</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
