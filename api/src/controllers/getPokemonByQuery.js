const axios = require('axios');
const {Pokemon, Type} = require("../db")
const { Op } = require("sequelize");

const getPokemonByQuery = async(req, res)=>{
    try{
      const {name} = req.query;
      // BUSCAR EN LA DE BASE DE DATOS LA INFO PASADA POR QUERY 
      const pokemon = await Pokemon.findAll({
        where: {
          name: {
            [Op.iLike]: `${name}`,
          },
        },
        include: Type,
      });
      if(pokemon/*.length*/ === /*0*/ null){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
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
    }catch (error){
      const prueba={
        catch : "entro al catch",
        error: error
      }
      res.status(500).send("Error en el servidor");
      //res.status(500).json(prueba);
    }
  }

  module.exports = getPokemonByQuery;