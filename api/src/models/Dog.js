const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height_min:{
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    height_max:{
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    weight_min:{
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    weight_max:{
      type: DataTypes.BIGINT,
      allowNull:false,
    },
    life_span:{
      type: DataTypes.STRING,
    },
    
  },{timestamps: false,});
  sequelize.define('temperament', {
    name: {
      type: DataTypes.STRING,
      allowNull:true,
    },
  }, {timestamps: false,})

};
