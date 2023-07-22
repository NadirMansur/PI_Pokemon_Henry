const getPokemons = require("../controllers/getPokemons");
const getPokemonIdByParams = require("../controllers/GetPokemonIdByParams");
const getTypes = require("../controllers/getTypes");
const postPokemonByBody = require("../controllers/postPokemonByBody");
const postLlenarBdd = require("../controllers/postLlenarBdd");

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers

// Ruta para obtener todos los pokemons
router.get("/pokemons", getPokemons);

// Ruta para obtener un pokemon por su ID
router.get("/pokemons/:idPokemon", getPokemonIdByParams);

// Ruta para obtener todos los tipos de pokemons
router.get("/types", getTypes);

// Ruta para crear un nuevo pokemon
router.post("/pokemons", postPokemonByBody);

// Ruta para llenar la base de datos con pokemons
router.post("/pokemons/Llenar_BDD", postLlenarBdd);

module.exports = router;
