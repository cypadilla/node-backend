function logErrors (err,req,res,next){
  console.log('logErrors');
  console.error(err)
  next(err);
}

function errorHandler (err,req,res){
  console.log('errorHandler')
  res.status(500).json({
    message:err.message,
    stack:err.stack
  })
}
/**
 * If the error is a boom error, then send the status code and payload from the boom error. Otherwise,
 * pass the error to the next error handler.
 * @param err - The error object
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function is a function in the Express router which, when invoked, executes
 * the middleware succeeding the current middleware.
 */
function boomErrorHandler (err,req,res,next){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler};
