const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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
  const user = request.user //get user info from middleware

  if(!user) { //error handles if no token if provided
    return response.status(401).send({ error: 'Unauthorized.  Token not provided.' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes, //NEED TO CHANGE TO NUMBER????
    user: user.id
  })

  const savedBlog = await blog.save()
  const savedBlogWithUserInfo = await Blog.findById(savedBlog._id).populate('user') //????? IS THIS CORRECT? FROM EXERCISE 5.8
  console.log(savedBlogWithUserInfo)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlogWithUserInfo)
})

//
// Summary: DELETE - remove single blog post
blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user //get user info from middleware

  if(!user) { //error handles if no token if provided
    return response.status(401).send({ error: 'Unauthorized.  Token not provided.' }) 
  }

  const blog = await Blog
    .findById(request.params.id)
    .populate('user')

  if(!(user.id === blog.user.id)) { // only users who wrote the blog are able to delete it
    return response.status(401).send('You are not authorized to delete the resource') //authorized
  }

  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end() //no content
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