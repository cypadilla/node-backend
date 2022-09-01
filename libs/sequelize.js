const {Sequelize} = require('sequelize');

const {config} = require('./../config/config');
const setupModels  = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI,{
  dialect:'postgres',
  logging:true
});

setupModels(sequelize); // Creamos los modelos con sequalize y enviamos la configuracion.

sequelize.sync(); // Sincronizamos con la estructura

module.exports = sequelize;
