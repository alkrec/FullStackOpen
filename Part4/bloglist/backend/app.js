const config = require('./utils/config')
const express = require('express')
require('express-async-errors') //eliminates the need to explicitly write try/catch for controller methods
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false) //allows querying of undefined fields.  If set to true, undefined fields would throw error

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message)
  })


app.use(cors()) //allows requests from any origin
app.use(express.static('build')) //serves static files from 'build' directory
app.use(express.json()) //parses incoming JSON data in request body and makes it available in request.body
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter) //defines the route and Router associated with blogs
app.use('/api/users', usersRouter) //defines the route and Router associated with users
app.use('/api/login', loginRouter) //defines the route and Router associated with login

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
