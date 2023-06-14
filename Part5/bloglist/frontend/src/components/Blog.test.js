import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

beforeEach(() => {

})

test('renders blog title and author by default', () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blog url',
    likes: 0,
    user: {
      name: 'name',
      username: 'username'
    }
  }

  const user = {
    name: 'name',
    username: 'username'
  }

  const mockDeleteHandler = jest.fn()
  const mockUpdateHandler = jest.fn()

  const container = render(<Blog blog={blog} user={user} deleteBlog={mockDeleteHandler} updateBlog={mockUpdateHandler}/>).container

  const divDefault = container.querySelector('.defaultContent')
  expect(divDefault).toHaveTextContent(blog.title)
  expect(divDefault).toHaveTextContent(blog.author)
  expect(divDefault).not.toHaveTextContent(blog.url)
  expect(divDefault).not.toHaveTextContent(blog.likes)
})