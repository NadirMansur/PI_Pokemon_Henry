const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "type", // Nombre del modelo
    {
      id: {
        type: DataTypes.INTEGER, // Tipo de dato para la columna 'id'
        autoIncrement: true, // Autoincrementar el valor de 'id'
        primaryKey: true, // Establecer 'id' como clave primaria
        allowNull: false, // No permitir valores nulos para 'id'
      },
      type: {
        type: DataTypes.STRING, // Tipo de dato para la columna 'type'
        unique: true, // Establecer 'type' como valor único
        defaultValue: ["normal"], // Valor por defecto para 'type'
      },
    },
    { timestamps: false } // Desactivar el registro de timestamps (createdAt, updatedAt)
  );
};
