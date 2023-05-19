const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app) //wrapping the Express application from app.js creates a 'superagent' object

///
/// !!!!!!!!!!!!!!CHECK ALL TESTS AGAINST THE MODEL ANSWERS!!!!!!
///



//
// Summary: Initialize the database
beforeEach( async () => {
  // await Blog.deleteMany({}) //clear database
  // await Blog.insertMany(helper.initialBlogs) //insert seed data
  await helper.seedDatabase()
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
  test('Post succeeds with valid data', async () => {
    const token = await helper.getToken()

    const newBlog = {
      title: 'Test 1',
      author: 'Author test',
      url: 'test.com',
      likes: 15,
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
    const token = await helper.getToken()

    const newBlog = {
      title: 'testBlog2',
      author: 'testBlog2',
      url: 'testBlog2',
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('missing title results in 404', async () => {
    const token = await helper.getToken()

    const newBlog = {
      author: 'testBlog2',
      url: 'testBlog2',
      likes: 15
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })

  test('missing url results in 404', async () => {
    const token = await helper.getToken()

    const newBlog = {
      title: 'some title',
      author: 'testBlog2',
      likes: 15
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

  })

  test('Post fails without token being provided', async () => {
    // const token = await helper.getToken()

    const newBlog = {
      title: 'Test 1',
      author: 'Author test',
      url: 'test.com',
      likes: 15,
    }

    await api.post('/api/blogs')
      // .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(401) //unauthorized
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length) //check if blogs in system increased by one

  })
})


describe('PUT request tests', () => {
  test('put succeeds with valid data', async () => {
    const blog = {
      title: 'updated Blog',
      author: 'updated Blog',
      url: 'updated Blog',
      likes: 20
    }

    const blogsBeforeUpdate = await helper.blogsInDb()

    const response = await api.put(`/api/blogs/${blogsBeforeUpdate[0].id}`)
      .send(blog)
      .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()

    const updatedBlogFromDb = blogsAfterUpdate.find(b => b.id === response.body.id)
    expect(updatedBlogFromDb.title).toEqual(blog.title)
    expect(updatedBlogFromDb.author).toEqual(blog.author)
    expect(updatedBlogFromDb.url).toEqual(blog.url)
    expect(updatedBlogFromDb.likes).toBe(blog.likes)

    expect(blogsBeforeUpdate).toHaveLength(blogsAfterUpdate.length)
  })

})


describe('DELETE request tests', () => {
  test('delete succeeds with valid id and token', async () => {
    const token = await helper.getToken()
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('delete fails with 400 if invalid id', async () => {
    const token = await helper.getToken()
    const invalidId = '5a3d5da59070081a82a3445'

    await api.delete(`/api/blogs/${invalidId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
  })

  test('Delete fails when user who didnt create blog attempts to delete it', async () => {
    const invalidToken = await helper.getInvalidToken()
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length) //check if blogs in system increased by one

  })
})




//
// Summary: closes the database connection
afterAll(async () => {
  await mongoose.connection.close()
})