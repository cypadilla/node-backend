const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema , updateProductSchema, getProductSchema} = require('../schemas/product.schemas');

const router = express.Router();
const service = new ProductsService();

router.get('/',async (req, res)=>{
  const products = await service.find();
  // const {size} = req.query;
  res.json(products);
})


router.get('/filter',(req,res)=>{
  res.write('filter')
  res.send()
});

/* A route that is going to find a product by id. */
router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error)
    }
});

/* Creating a new product. */
router.post('/',
 validatorHandler(createProductSchema,'body')
,async (req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
})
router.put('/:id',async (req,res)=>{
  const {id} = req.params;
  const body = req.body;
  res.json({
    message:'updated put',
    data:body,
    id
  })
})
/* Updating a product by id. */
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body')
,async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product)
  } catch (error) {
    next(error)
  }
})
/* Deleting a product by id. */
router.delete('/:id',async (req,res,next)=>{
  try {
    const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta)
  } catch (error) {
    next(error)
  }

})

module.exports = router;
