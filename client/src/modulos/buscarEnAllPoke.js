// Función para buscar un Pokemon en un array de Pokemones
function buscarEnAllPoke(name, allPokes) {
  for (let i = 0; i < allPokes.length; i++) { // Recorrer el array de Pokemones
    const poke = allPokes[i]; // Obtener el Pokemon actual
    if (poke.name === name) { // Si el nombre del Pokemon actual coincide con el nombre buscado
      return true; // Devolver verdadero
    }
  }
  return false; // Si no se encuentra el Pokemon, devolver falso
}
 export default buscarEnAllPoke; // Exportar la función de búsqueda