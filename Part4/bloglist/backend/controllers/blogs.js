const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

//
// Summary: GET - get all blog posts
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})

//
// Summary: POST - create new blog post
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes, //NEED TO CHANGE TO NUMBER????
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

//
// Summary: DELETE - remove single blog post
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

//
// Summary: PUT - update single blog post
blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  console.log(updatedBlog)

  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter