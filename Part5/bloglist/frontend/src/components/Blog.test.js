import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
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

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} deleteBlog={mockDeleteHandler} updateBlog={mockUpdateHandler}/>).container
  })

  test('renders blog title and author by default', () => {
    const divDefault = container.querySelector('.defaultContent')
    expect(divDefault).toHaveTextContent(blog.title)
    expect(divDefault).toHaveTextContent(blog.author)
    expect(divDefault).not.toHaveTextContent(blog.url)
    expect(divDefault).not.toHaveTextContent(blog.likes)
  })


  test('url and likes shown when show button clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)
    screen.debug(container)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
})
