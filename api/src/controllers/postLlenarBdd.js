const {Pokemon,Type} = require("../db")

const axios = require('axios');

const postLlenarBdd = async(req, res)=>{
    try{
        // BUSCAR EN LA API DE DATOS LA INFO DE LOS Types Para pasar a LA BDD
            let {data} = await axios.get(`https://pokeapi.co/api/v2/type`)
                const types = [];
                for(let i=0; i<data.results.length; i++) {    
                    await Type.create({
                        type: data.results[i].name
                    })
                }
        //BUSCAR EN LA API DE DATOS LA INFO DE toDOS LOS POKEMONS Para pasar a LA BDD
    const arregloDePokemons = [];
    for(let i=1; i <= 50; i++){    
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemon = {
            Vida: data.stats[0].base_stat,
            Ataque: data.stats[1].base_stat,
            Defensa: data.stats[2].base_stat,
            Altura: data.height,
            name:data.forms[0].name,
            type: data.types,
            imagen: data.sprites.other["official-artwork"].front_default
        }
        const typeP = [];
        pokemon.type.forEach(slot => {
            typeP.push(slot.type.name)
        });

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
              type: typeP
            }
          });
        const typeIdsArray = typeIds.map(type => type.id);
        pokemonCreado.addType(typeIdsArray);
    }

    const success ={
        result: "success",
        //data: data,
        prueba: "prueba crear pokemon"
    }
    res.status(200).json(success) 
    }catch (error){
        console.log ("EL ERROR ES: \n", error)
        res.status(500).json({message: error.message})
    }
}

  module.exports = postLlenarBdd;