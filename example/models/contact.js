"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("contact", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    }
  }, {
    getterMethods   : {
      display_name: function()  { return this.first_name + ' ' + this.last_name }
    },
  });
}