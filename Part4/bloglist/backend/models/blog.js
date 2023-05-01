const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({  //Design the schema of the blog object
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set('toJSON', { // Format the returned object when fetching data from database
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema) //Create the blog object for the database mapping

module.exports = Blog

