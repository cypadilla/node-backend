// const getConnection=require('../libs/postgres');
const pool = require('./../libs/postgres.pool');
class UserService{
  constructor(){
    this.pool = pool;
    this,pool.on('error',(err)=>{
      console.log(err)
    })
  }
  async create(data){
    return data;
  }
  async find(){
    // const client=await getConnection();
    const rta=await pool.query('SELECT * FROM tasks');
    return rta.rows;
  }
  async findOne(id){``
    // const client = await getConnection();
    const rta = await pool.query(`SELECT * FROM tasks WHERE id = ${id}`)
    return rta.rows;
  }
  async update(id,changes){
    return{
      id
      ,changes,
    };
  }
  async delete(id){
    return{id};
  }

}
  module.exports=UserService;
