const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");
//const getPokemonByQuery = require("./getPokemonByQuery")

const getPokemons = async (req, res) => {
  /////////////// SI TIENE QUERY BUSCA POR QUERY /////////////////
  if (Object.keys(req.query).length > 0) {
    try {
      const { name } = req.query;
      // BUSCAR EN LA DE BASE DE DATOS LA INFO PASADA POR QUERY
      const pokemon = await Pokemon.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        include: Type,
      });
      //si no esta en la BDD, busco en la API
      if (pokemon.length === 0) {
        const nameLow = name.toLowerCase();
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nameLow}`
        );
        const pokemon = {
          id: data.id,
          Vida: data.stats[0].base_stat,
          Ataque: data.stats[1].base_stat,
          Defensa: data.stats[2].base_stat,
          Altura: data.height,
          name: data.forms[0].name,
          type: data.types,
          imagen: data.sprites.other["official-artwork"].front_default,
        };
        res.status(200).json(pokemon);
      } else {
        res.status(200).json(pokemon);
      }
    } catch (error) {
      const prueba = {
        catch: "entro al catch",
        error: error,
      };
      res.status(500).send("Error en el servidor");
      //res.status(500).json(prueba);
    }
  } else {
    //////////////// SI  NO TIENE QUERY ////////////////
    try {
      // BUSCAR EN LA DE BASE DE DATOS LA INFO DE toDOS LOS POKEMONS DE LA BDD
      const pokemons = await Pokemon.findAll({
        order: [["id", "ASC"]],
        include: Type,
      });
      res.status(200).json(pokemons);
    } catch (error) {
      //MANEJO DE ERRORES EN LA BASE DE DATOS
      //if(error.code === 500){
      res.status(500).send(error);
      //}
      // res.status(404).send(error)
    }
  }
};

module.exports = getPokemons;
