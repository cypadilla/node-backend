const express = require('express');
// const faker = require('faker');

const UsersService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema, updateUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();


router.get('/',async (req, res)=>{
  const users = await service.find();
  // const {size} = req.query;
  res.json(users);
})


router.get('/filter',(req,res)=>{
  res.write('filter')
  res.send()
});

/* A route that is going to get a user by id. */
router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req,res,next)=>{
    try {
      const {id} = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error)
    }
});


router.post('/',
 validatorHandler(createUserSchema,'body')
,async (req,res)=>{
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
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

router.patch('/:id',
validatorHandler(getUserSchema,'params'),
validatorHandler(updateUserSchema,'body')
,async (req,res,next)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const user = await service.update(id,body);
    res.json(user)
  } catch (error) {
    next(error)
  }
})

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

