const axios = require('axios');
const {Pokemon,Type} = require("../db")

const postPokemonByBody = async(req, res)=>{
    try{
      const data = req.body;
      const pokemon = {
        Vida: data.Vida,
        Ataque: data.Ataque,
        Defensa: data.Defensa,
        Altura: data.Altura,
        name:data.name,
        type: data.type,
        imagen: data.imagen
    }

    const  pokemonCreado = await Pokemon.create({
      Vida: pokemon.Vida,
      Ataque: pokemon.Ataque,
      Defensa: pokemon.Defensa,
      Altura:  pokemon.Altura,
      name: pokemon.name,
      imagen: pokemon.imagen
  })
  const typeIds = await Type.findAll({
      attributes: ['id'],
      where: {
        type: pokemon.type
      }
    });
  const typeIdsArray = typeIds.map(type => type.id);
  pokemonCreado.addType(typeIdsArray);
    //enviar Json con el objeto Pokemon
    res.status(200).json(pokemon)
   //res.status(200).json(data)
    //res.status(200).send("data")
    
    }catch (error){
        //MANEJO DE ERRORES EN LA BASE DE DATOS 
       res.status(500).json({message: error.message})
    }
  }

  module.exports = postPokemonByBody;