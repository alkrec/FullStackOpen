const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

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
// Summary: Middleware function to isolate the jwt token from the header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization') //retrieve entire authorization header

  if(authorization && authorization.startsWith('Bearer ')) { //parase the authorization to isolate jwt token
    request.token = authorization.replace('Bearer ', '')
    // console.log(request.token)
  }

  next()
}


//
// Summary: Middleware function to isolate the jwt token from the header
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) { //if the token doesn't contain the user's info, return 'unauthorized' status and failure message
    return response.status(401).json({ error: 'token invalid' })
  }

  request.user = await User.findById(decodedToken.id)

  next()
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
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400)
      .json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401)
      .json({ error: 'token expired' })
  }

  next(error) //if error doesn't belong to above types, then pass the error to the default error handler middleware
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}