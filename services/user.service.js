// const getConnection=require('../libs/postgres');
const pool = require('./../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const  boom  = require('@hapi/boom');
class UserService{
  constructor(){
    this.pool = pool;
    this,pool.on('error',(err)=>{
      console.log(err)
    })
  }
  async create(data){
    const newUser = await models.User.create(data)
    return newUser;
  }
  async find(){
    // const client=await getConnection(); //conexion
    // const rta=await pool.query('SELECT * FROM tasks'); // con pool
    const rta = await models.User.findAll();
    return rta;
  }
  async findOne(id){``
    // const client = await getConnection();
    // const rta = await pool.query(`SELECT * FROM tasks WHERE id = ${id}`)

    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('User not found')
    }
    return user;
  }
  async update(id,changes){
    const user = await this.findOne(id)
    const rta = await user.update(changes);
    return rta;
  }
  async delete(id){
    const user = await this.findOne(id)
    const rta = await user.destroy();
    return {rta, id};
  }

}
  module.exports=UserService;
