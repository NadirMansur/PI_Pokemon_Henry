function paginado(todosLosPoke, size) {
    const paginado = [];
    for (let i = 0; i <= todosLosPoke.length; i+= size) 
      paginado.push(todosLosPoke.slice(i, i + size));
    return paginado;
  }

  export default paginado;