'use strict';

const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',{
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password:DataTypes.STRING,
    bio:DataTypes.STRING,
    isAdmin:DataTypes.BOOLEAN
  },{
    classMethods:{
      associate: function(models){ 
        models.User.hasMany(models.Message ,{ 
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          hooks: true});
        }
      }
    });
  return User;
};