// Función para paginar los datos
function paginado(todosLosPoke, size) {
  const paginado = [];
  for (let i = 0; i <= todosLosPoke.length; i += size) {
    paginado.push(todosLosPoke.slice(i, i + size)); // Agregar una porción de datos a la paginación
  }
  return paginado; // Devolver la paginación de datos
}
 export default paginado; // Exportar la función de paginación