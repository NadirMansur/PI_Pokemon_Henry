const axios = require('axios');
const {Pokemon, Type} = require("../db")

const getPokemonIdByParams = async(req, res)=>{
  const id = req.params.idPokemon;
    try{
      const pokemon = await Pokemon.findByPk(id,{
        include: Type
      });
      if(pokemon === null){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = {
          id: data.id,
          Vida: data.stats[0].base_stat,
          Ataque: data.stats[1].base_stat,
          Defensa: data.stats[2].base_stat,
          Altura: data.height,
          name:data.forms[0].name,
          type: data.types,
          imagen: data.sprites.other["official-artwork"].front_default
        }
        res.status(200).json(pokemon);
      }else{
      res.status(200).json(pokemon);
    }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  module.exports = getPokemonIdByParams;