const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app) //wrapping the Express application from app.js creates a 'superagent' object

const Blog = require('../models/blog')

//
// Summary: Initialize the database
beforeEach( async () => {
  await Blog.deleteMany({}) //clear database
  console.log('cleared')

  const blogObjects = helper.initialBlogs // create an array of mongoose blog objects
    .map(blog => Blog(blog))

  const promiseArray = blogObjects.map(note => note.save())
  await Promise.all(promiseArray)

  // The Promise.all method can be used for transforming an array of promises into a single promise,
  //that will be fulfilled once every promise in the array passed to it as a parameter is resolved.
  //The last line of code await Promise.all(promiseArray) waits until every promise for saving a note is finished,
  //meaning that the database has been initialized.

  console.log('done')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)

})


//
// Summary: closes the database connection
afterAll(async () => {
  await mongoose.connection.close()
})