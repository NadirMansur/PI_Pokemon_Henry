const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");
 const getPokemons = async (req, res) => {
  // Si la solicitud tiene una query, buscar por el nombre especificado en la query
  if (Object.keys(req.query).length > 0) {
    try {
      const { name } = req.query;
      // Buscar en la base de datos la información del pokemon con el nombre especificado en la query
      const pokemon = await Pokemon.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        include: Type,
      });
      // Si el pokemon no está en la base de datos, buscar en la API
      if (pokemon.length === 0) {
        const nameLow = name.toLowerCase();
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${nameLow}`
        );
        // Crear un objeto con la información del pokemon obtenida de la API
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
        // Enviar una respuesta JSON con la información del pokemon
        res.status(200).json(pokemon);
      } else {
        // Enviar una respuesta JSON con la información del pokemon encontrado en la base de datos
        res.status(200).json(pokemon);
      }
    } catch (error) {
      // En caso de error, enviar una respuesta con el código de estado 500
      res.status(500).send("Error en el servidor");
    }
  } else {
    // Si la solicitud no tiene una query, buscar la información de todos los pokemons en la base de datos
    try {
      const pokemons = await Pokemon.findAll({
        order: [["id", "ASC"]],
        include: Type,
      });
      // Enviar una respuesta JSON con la información de los pokemons
      res.status(200).json(pokemons);
    } catch (error) {
      // En caso de error, enviar una respuesta con el código de estado 500
      res.status(500).send(error);
    }
  }
};
 module.exports = getPokemons;