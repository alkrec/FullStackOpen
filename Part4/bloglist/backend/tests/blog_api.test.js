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

  console.log('database setup complete')
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('check identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined() //checks if 'id' returns a value
})


test('check post request', async () => {
  const newBlog = {
    title: 'Test 1',
    author: 'Author test',
    url: 'test.com',
    likes: 15,
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1) //check if blogs in system increased by one

  const blogContents = blogsAtEnd.find(b => b.id === response.body.id)

  //check if data is saved correctly
  expect(blogContents.title).toEqual(newBlog.title)
  expect(blogContents.author).toEqual(newBlog.author)
  expect(blogContents.url).toEqual(newBlog.url)
  expect(blogContents.likes).toBe(newBlog.likes)
})

test('POST request - check if missing likes defaults to 0', async () => {
  const newBlog = {
    title: 'testBlog2',
    author: 'testBlog2',
    url: 'testBlog2',
  }

  const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)

  expect(response.body.likes).toBe(0)
})

test('POST request - missing title', async () => {
  const newBlog = {
    author: 'testBlog2',
    url: 'testBlog2',
    likes: 15
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('POST request - missing url', async () => {
  const newBlog = {
    title: 'some title',
    author: 'testBlog2',
    likes: 15
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

//
// Summary: closes the database connection
afterAll(async () => {
  await mongoose.connection.close()
})