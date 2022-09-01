const { Model, DataTypes, Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id:{
    allowNull:false,
    autoIncrement:true,
    primaryKey:true,
    type:DataTypes.INTEGER
  },
  email:{
    allowNull:false,
    type:DataTypes.STRING,
    unique:true,
  },
  password:{
    allowNull:false,
    type:DataTypes.STRING
  },
  createdAt:{
    allowNull:false,
    type:DataTypes.DATE,
    field:'create_at',
    defaultValue:Sequelize.NOW
  },
  firstName:{
    allowNull:false,
    type:DataTypes.STRING,
    field:'first_name',
    // defaultValue:''
  },
  lastName:{
    allowNull:true,
    type:DataTypes.STRING,
    field:'last_name',
    // defaultValue:''
  }
}

class User extends Model {
  static associate() {
    //models
  }

  static config(sequelize){
    return {
      sequelize,
      tableName:USER_TABLE,
      modelName:'User', //Nombre que vamos a usar en el servicio
      timestamps:false
    }
  }
}

module.exports = { USER_TABLE, UserSchema , User}
