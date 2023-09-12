const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
        type: DataTypes.STRING,

    },
    plataformas: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Define el tipo de dato para los elementos del arreglo
    allowNull: true, // Opcional, dependiendo de tus requisitos
  },
    imagen: {
      type: DataTypes.STRING,
      validate:{
        isURL: true
      }
    },
    fechaDeLanzamiento: {
      type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.STRING,
        validate: {
          min:0,
         max:10
        }
    }    
  });
};
