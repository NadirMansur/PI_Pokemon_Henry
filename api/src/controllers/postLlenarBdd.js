const { Pokemon, Type } = require("../db");
// Importar el módulo axios para hacer peticiones HTTP
const axios = require("axios");
 const postLlenarBdd = async (req, res) => {
  try {
    // BUSCAR EN LA API DE DATOS LA INFO DE LOS Types Para pasar a LA BDD
    // Hacer una petición GET a la API para obtener la información de los tipos de Pokemon
    let { data } = await axios.get(`https://pokeapi.co/api/v2/type`);
    // Recorrer los resultados obtenidos de la API
    for (let i = 0; i < data.results.length; i++) {
      // Crear un nuevo registro de Type en la base de datos utilizando la información obtenida de la API
      await Type.create({
        type: data.results[i].name,
      });
    }
     //BUSCAR EN LA API DE DATOS LA INFO DE toDOS LOS POKEMONS Para pasar a LA BDD
    // Recorrer los primeros 50 Pokemon en la API
    for (let i = 1; i <= 50; i++) {
      // Hacer una petición GET a la API para obtener la información de un Pokemon específico
      let { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemon = {
        Vida: data.stats[0].base_stat,
        Ataque: data.stats[1].base_stat,
        Defensa: data.stats[2].base_stat,
        Altura: data.height,
        name: data.forms[0].name,
        type: data.types,
        imagen: data.sprites.other["official-artwork"].front_default,
      };
      const typeP = [];
      // Obtener los tipos de Pokemon del Pokemon actual
      pokemon.type.forEach((slot) => {
        typeP.push(slot.type.name);
      });
       // Crear un nuevo registro de Pokemon en la base de datos utilizando la información obtenida de la API
      const pokemonCreado = await Pokemon.create({
        Vida: pokemon.Vida,
        Ataque: pokemon.Ataque,
        Defensa: pokemon.Defensa,
        Altura: pokemon.Altura,
        name: pokemon.name,
        imagen: pokemon.imagen,
      });
       // Obtener los IDs de los tipos de Pokemon asociados al Pokemon creado
      const typeIds = await Type.findAll({
        attributes: ["id"],
        where: {
          type: typeP,
        },
      });
      // Crear un array con los IDs de los tipos de Pokemon
      const typeIdsArray = typeIds.map((type) => type.id);
      // Asociar los tipos de Pokemon al Pokemon creado
      pokemonCreado.addType(typeIdsArray);
    }
     // Enviar una respuesta JSON con un mensaje de éxito
    const success = {
      result: "success",
      prueba: "prueba crear pokemon",
    };
    res.status(200).json(success);
  } catch (error) {
    console.log("EL ERROR ES: \n", error);
    // Manejo de errores en la base de datos
    res.status(500).json({ message: error.message });
  }
};
 module.exports = postLlenarBdd;