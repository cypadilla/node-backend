const faker = require('faker');
const boom = require('@hapi/boom');
// const pool = require('./../libs/postgres.pool') ya no se usara la conexion por pool ya qe sequelize trae la conexion por pool
const sequelize = require('./../libs/sequelize');
class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
    // this.pool = pool;
    // this,pool.on('error',(err)=>{
    //   console.log(err)
    // })
  }

  generate(){
    const limit = 100;
    for(let index = 0; index< limit; index ++){
      this.products.push({
        id:faker.datatype.uuid(),
        name:faker.commerce.productName(),
        price:parseInt(faker.commerce.price(),10),
        image:faker.image.imageUrl(),
        isBlock:faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newProduct = {
      id:faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  async find(){
    // return  new Promise((resolve,reject)=>{
    //   if(this.products){
    //     setTimeout(()=>{
    //      resolve(this.products)
    //     },5000)
    //   }else{
    //     reject('f')
    //   }
    // })

    // consulta por pool
      // const query = 'SELECT * FROM tasks';
      // const rta = await this.pool.query(query);
      // return rta.rows;
    // consulta por sequelize tambien se pueden usar las consultas con sql
    const query = 'SELECT * FROM tasks';
    // const [data, metadata] = await sequelize.query(query); envia la data en un array
    const [data] = await sequelize.query(query);
    return {
      data
    }
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block')
    }
    return product;
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found')
    }
    const product = this.products[index];
    this.products[index] = { // se hace como un merge con el spread operator
      ...product,
      ...changes
    };
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1);
    return {message:true, id}
  }
}

module.exports = ProductsService;
