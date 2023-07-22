const { Pokemon, Type } = require("../db");
const postPokemonByBody = async (req, res) => {
  try {
    const data = req.body;
    const pokemon = {
      Vida: data.Vida,
      Ataque: data.Ataque,
      Defensa: data.Defensa,
      Altura: data.Altura,
      name: data.name,
      type: data.type,
      imagen: data.imagen,
    };
    // Crear un nuevo registro de Pokemon en la base de datos
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
        type: pokemon.type,
      },
    });
    // Crear un array con los IDs de los tipos de Pokemon
    const typeIdsArray = typeIds.map((type) => type.id);
    // Asociar los tipos de Pokemon al Pokemon creado
    pokemonCreado.addType(typeIdsArray);
    // Enviar una respuesta JSON con el objeto Pokemon creado
    res.status(200).json(pokemon);
  } catch (error) {
    // Manejo de errores en la base de datos
    res.status(500).json({ message: error.message });
  }
};
module.exports = postPokemonByBody;
