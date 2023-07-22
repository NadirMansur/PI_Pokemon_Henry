const { Type } = require("../db");
 const getTypes = async (req, res) => {
  try {
    // Obtener todos los tipos de Pokemon de la base de datos
    const tipos = await Type.findAll({
      order: [["id", "ASC"]],
    });
    const types = [];
    // Recorrer los resultados obtenidos de la base de datos
    tipos.forEach((element) => {
      // Agregar cada tipo a un array
      types.push(element.type);
    });
    // Enviar una respuesta JSON con los tipos de Pokemon
    res.status(200).json(types);
  } catch (error) {
    // Manejo de errores en la base de datos
    res.status(500).send(error);
  }
};
 module.exports = getTypes;