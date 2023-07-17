const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'type',
    {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
     },
    type: {
      type: DataTypes.STRING,
      unique: true,
      defaultValue: ["normal"]
    },
  },
    { timestamps: false });
};