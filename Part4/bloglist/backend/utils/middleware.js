const logger = require('./logger')

//
// Summary: Prints info for http requests
const requestLogger = (request, response, next) => {
  logger.info('Method ', request.method) //Prints HTTP request type: GET, POST, PUT, DELETE
  logger.info('Path: ', request.path) //Prints URI
  logger.info('Body: ', request.body) //Prints body of request
  logger.info('---')
  next() // move to next middleware
}

//
// Summary: Handles unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404) //SC 404 - Not Found
    .send({ error: 'unknown endpoint' })
}

//
// Summary: Custom error handler
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError') {//CastError is caused by an invalid object given as a parameter
    return response.status(400) //SC 400 - Bad Request
      .send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') { //Validation Error based on Schema requirements
    return response.status(400)//SC 400 - Bad Request
      .json({ error: error.message })
  }

  next(error) //if error doesn't belong to above types, then pass the error to the default error handler middleware
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}