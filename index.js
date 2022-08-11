const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

/* A whitelist of allowed origins. */
const whiteList = ['http://localhost:8080','http://localhost:3000','http://127.0.0.1:5501'];
const options = {
  origin:(origin, callback)=>{
    if(whiteList.includes(origin)|| !origin){
      callback(null,true);
    }else{
      callback(new Error ('No permitido'))
    }
  }
}
app.use(cors(options))
app.use(express.json());

app.get('/',(req, res)=>{
  res.send('Hola mi server en express');
})
app.get('/nueva-ruta',(req, res)=>{
  res.send('Hola soy una nueva ruta');
})

routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port,()=>{
  console.log(`Escuchando a por el puerto ${port}`)
})

