import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { createPokemon, getTypes, empty } from "../../Redux/Actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "../Form/Form.module.css";

////////////////// crear un funcion de validation //////////////////////////
const regexNombre = /^[a-z]{1,15}$/;
const regexHpAtkDef = /^(?:1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d?)$/;
const regexAlt = /^(?:[1-5]\d{2}|600|[1-9]\d?)$/;
const regexLink = /^(ftp|http|https):\/\/[^ "]+$/;
////////////////////////////////////////////////////////////////
const validate = (input, setErrors, errors, types) => {
  if (!input.name)
    setErrors({
      ...errors,
      name: "Name vacio",
    });
  else if (!regexNombre.test(input.name)) {
    setErrors({
      ...errors,
      name: "Name deben ser caracteres minusculas y no contener numeros ni simbolos",
    });
  } else {
    setErrors({
        ...errors,
        name:""
  })}
  if (!input.hp) {
    setErrors({
      ...errors,
      hp: "HP vacio",
    });
  } else if (!regexHpAtkDef.test(input.hp)) {
    setErrors({
      ...errors,
      hp: "Debe ser un número esté en el rango de 1 a 255",
    });
  } else {
    setErrors({
        ...errors,
        hp:""
  })}
  if (!input.attack) {
    setErrors({
      ...errors,
      attack: "Ataque vacio",
    });
  } else if (!regexHpAtkDef.test(input.attack)) {
    setErrors({
      ...errors,
      attack: "Debe ser un número esté en el rango de 1 a 255",
    });
  }else {
    setErrors({
        ...errors,
        attack:""
  })}
  if (!input.defense) {
    setErrors({
      ...errors,
      defense: "defensa vacio",
    });
  } else if (!regexHpAtkDef.test(input.defense)) {
    setErrors({
      ...errors,
      defense: "Debe ser un número esté en el rango de 1 a 255",
    });
  }else {
    setErrors({
        ...errors,
        defense:""
  })}
  if (!input.height) {
    setErrors({
      ...errors,
      height: "Altura vacio",
    });
  } else if (!regexAlt.test(input.height)) {
    setErrors({
      ...errors,
      height: "Debe ser un número esté en el rango de 1 a 600",
    });
  }else {
    setErrors({
        ...errors,
        heigth:""
  })}
  if (!input.image)
    setErrors({
      ...errors,
      image: "Imagen vacia",
    });
  else if (!regexLink.test(input.image)) {
    setErrors({ ...errors, image: "Debe se un link que dirija a la imagen" });
  }else {
    setErrors({
        ...errors,
        image:""
  })}
  if(input.types.length === 0){
    setErrors({
        ...errors,
        types: "types vacio",
      });
  }else if (input.types.every((element) => !types.includes(element))) {
    //contiene al menos un elemento diferente
    setErrors({
      ...errors,
      types:
        "Solo se permiten los siguientes tipos:\n normal,fighting,flying,poison,\nground,rock,bug,ghost,\nsteel,fire,water,grass,\nelectric,psychic,ice,dragon,\ndark,fairy,unknown,shadow",
    });
  }else {
    setErrors({
        ...errors,
        types:""
  })}
};
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
const Form = () => {
  const dispatch = useDispatch();
  /////////////////// TOMA DEL ESTADO GLOBAL LOS TYPES //////////////////
  /////////////////// YO los types los tengo en ischecked //////////////////
  const aux = useSelector((state) => state.isChecked);
  const getTypes = (aux) => {
    const types = [];
    aux.forEach((element) => {
      types.push(element.box);
    });
    return types;
  };
  const types = getTypes(aux); ////////types tiene todos los strings [] //////////////////
  ////////////////// TOMA ESTADO GLOBAL TODOS LOS POKEMONS //////////////////
  //
  ////////////////////// ESTE NO LO VOY A USAR////////////////
  const pokemon = useSelector((state) => state.allPokemon);
  ////////////////////// ESTE NO LO VOY A USAR////////////////
  //
  const history = useHistory(); ///////////////HISTORY para vovler a HOME

  /////////////////// CREA UN ESTADO LOCAL DE INPUTS O CAMPOS //////////////////
  const [input, setInput] = useState({
    name: "", ////////////Debe ser in MINUSCULA, No tener mas de no tener mas 15 caractere, no contener numeros o simbolos,
    hp: "", ////////// debe ser un numero, entre     min: 1, max: 255
    attack: "",
    defense: "",
    height: "",
    image: "",
    types: [], //////////// es un array de Strings //////////////////
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
    validate(
      { ...input, [e.target.name]: e.target.value },
      setErrors,
      errors,
      types
    );
  };

  //////// hay q ue modificar el handleType para que agregue al array //////////////
  //////// de types el valor de e.target.value si cumple con las condiciones////////
  const handleChangeType = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    validate(
      { ...input, types: [...input.types, e.target.value] },
      setErrors,
      errors,
      types
    );
  };

  const submitHandler = (e) => {
    // e.preventDefault(e);
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
    alert("Pokemon registrado con exito");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      height: "",
      image: "",
      types: [],
    });
    //dispatch(empty());
    history.push("/home");
  };
  ////////////////////////////////////////////////////////////////////////////////////
const prueba = "prueba";
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
            </div>

            <div>
              <label className={style.formLabel}>Type:</label>
              {/**input.types es una array */}
              <input
                type="text"
                name="types"
                placeholder="coloque un tipo de pokemon"
                onChange={handleChangeType}
              />
            </div>
          </div>
          <div className={style.error}>
            {errors.name && <span>{errors.name}</span>}
            {errors.hp && <span>{errors.hp}</span>}
            {errors.attack && <span>{errors.attack}</span>}
            {errors.defense && <span>{errors.defense}</span>}
            {errors.height && <span>{errors.height}</span>}
            {errors.image && <span>{errors.image}</span>}
            {errors.types && <span>{errors.types}</span>}
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
