const { DataTypes } = require("sequelize");
// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Definimos el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.INTEGER, // Tipo de dato para la columna 'id'
      allowNull: false, // No permitir valores nulos para 'id'
      autoIncrement: true, // Autoincrementar el valor de 'id'
      primaryKey: true, // Establecer 'id' como clave primaria
    },
    Vida: {
      type: DataTypes.INTEGER, // Tipo de dato para la columna 'Vida'
      allowNull: false, // No permitir valores nulos para 'Vida'
      validate: {
        min: 1, // Establecer el valor mínimo para 'Vida'
        max: 255, // Establecer el valor máximo para 'Vida'
      },
    },
    Ataque: {
      type: DataTypes.INTEGER, // Tipo de dato para la columna 'Ataque'
      allowNull: false, // No permitir valores nulos para 'Ataque'
      validate: {
        min: 1, // Establecer el valor mínimo para 'Ataque'
        max: 255, // Establecer el valor máximo para 'Ataque'
      },
    },
    Defensa: {
      type: DataTypes.INTEGER, // Tipo de dato para la columna 'Defensa'
      allowNull: false, // No permitir valores nulos para 'Defensa'
      validate: {
        min: 1, // Establecer el valor mínimo para 'Defensa'
        max: 255, // Establecer el valor máximo para 'Defensa'
      },
    },
    Altura: {
      type: DataTypes.INTEGER, // Tipo de dato para la columna 'Altura'
      allowNull: false, // No permitir valores nulos para 'Altura'
      validate: {
        min: 1, // Establecer el valor mínimo para 'Altura'
        max: 600, // Establecer el valor máximo para 'Altura'
      },
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato para la columna 'name'
      allowNull: false, // No permitir valores nulos para 'name'
    },
    imagen: {
      type: DataTypes.STRING, // Tipo de dato para la columna 'imagen'
      allowNull: false, // No permitir valores nulos para 'imagen'
    },
  });
};