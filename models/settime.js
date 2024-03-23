'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class setTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      setTime.belongsTo(models.Band, {
        foreignKey: 'setTime_id',
        as: 'reference', // alias for the association
        constraints: true,
        onDelete: 'CASCADE', // or 'SET NULL' or 'RESTRICT' depending on your requirement
        onUpdate: 'CASCADE' // or 'SET NULL' or 'RESTRICT' depending on your requirement
      });
    }
  }
  setTime.init({
    setTime_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    time:{ 
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'setTime',
    timestamps: false
  });
  return setTime;
};