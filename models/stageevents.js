'use strict';
const {
  Model, Deferrable
} = require('sequelize');

const Band = require('./band')

module.exports = (sequelize, DataTypes) => {
  class stageevents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stageevents.belongsTo(models.Band, {
        foreignKey: 'event_id',
        as: 'reference', // alias for the association
        constraints: true,
        onDelete: 'CASCADE', // or 'SET NULL' or 'RESTRICT' depending on your requirement
        onUpdate: 'CASCADE' // or 'SET NULL' or 'RESTRICT' depending on your requirement
      });
    }
  }
  stageevents.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bands: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_num_bands: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'stageevents',
    timestamps: false,
  });
  return stageevents;
};