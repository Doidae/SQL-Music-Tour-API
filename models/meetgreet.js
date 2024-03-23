'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meetGreet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      meetGreet.belongsTo(models.Band, {
        foreignKey: 'meetgreet_id',
        as: 'reference', // alias for the association
        constraints: true,
        onDelete: 'CASCADE', // or 'SET NULL' or 'RESTRICT' depending on your requirement
        onUpdate: 'CASCADE' // or 'SET NULL' or 'RESTRICT' depending on your requirement
      });
    }
  }
  meetGreet.init({
    meetgreet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    band: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'meetGreet',
    timestamps: false
  });
  return meetGreet;
};