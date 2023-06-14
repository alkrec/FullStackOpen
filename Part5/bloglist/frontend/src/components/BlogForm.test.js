import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogFom'

test('kati', async () => {
  const mockCreateBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={mockCreateBlog} />)

  const inputTitle = screen.getByPlaceholderText('enter title')
  const inputAuthor = screen.getByPlaceholderText('enter author')
  const inputUrl = screen.getByPlaceholderText('enter url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'example title')
  await user.type(inputAuthor, 'example author')
  await user.type(inputUrl, 'example url')
  await user.click(sendButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('example title')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('example author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('example url')

})