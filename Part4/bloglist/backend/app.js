const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
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

app.use('/api/blogs', blogsRouter) //defines the route and Router

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app