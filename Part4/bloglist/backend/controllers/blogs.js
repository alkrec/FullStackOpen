const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//
// Summary: GET - get all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//
// Summary: POST - create new blog post
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes //NEED TO CHANGE TO NUMBER????
  })

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

//
// Summary: DELETE - remove single blog post
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter