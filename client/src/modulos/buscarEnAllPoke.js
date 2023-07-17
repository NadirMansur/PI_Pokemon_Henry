function buscarEnAllPoke(name,allPokes) {
    for (let i = 0; i < allPokes.length; i++) {
      const poke = allPokes[i];
      if (poke.name === name) {
        return true;
      }
    }
    return false;
  }

export default buscarEnAllPoke;