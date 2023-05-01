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
  await Blog.insertMany(helper.initialBlogs) //insert seed data
})

describe('GET request tests', () => {
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
})


describe('POST request tests', () => {
  test('succeeds with valid data', async () => {
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

  test('missing likes defaults to 0', async () => {
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

  test('missing title results in 404', async () => {
    const newBlog = {
      author: 'testBlog2',
      url: 'testBlog2',
      likes: 15
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('missing url results in 404', async () => {
    const newBlog = {
      title: 'some title',
      author: 'testBlog2',
      likes: 15
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})


describe('DELETE request tests', () => {
  test('delete succeeds with valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('delete fails with 400 if invalid id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api.delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})




//
// Summary: closes the database connection
afterAll(async () => {
  await mongoose.connection.close()
})