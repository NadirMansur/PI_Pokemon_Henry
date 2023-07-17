const getPokemons = require("../controllers/getPokemons");
const getPokemonIdByParams = require("../controllers/getPokemonIdByParams");
const getPokemonByQuery = require("../controllers/getPokemonByQuery");
const getTypes = require("../controllers/getTypes");
const postPokemonByBody = require("../controllers/postPokemonByBody");
const postLlenarBdd = require("../controllers/postLlenarBdd");

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getPokemons);
//router.get("/pokemons/", getPokemonByQuery);
router.get("/pokemons/:idPokemon", getPokemonIdByParams);
router.get("/types", getTypes);
router.post("/pokemons",postPokemonByBody);
router.post("/pokemons/Llenar_BDD",postLlenarBdd);

module.exports = router;
