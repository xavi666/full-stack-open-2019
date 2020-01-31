import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const title = 'This is the title'
  const author = 'Juan Pamon'
  const likes = 23

  const blog = {
    title: title,
    author: author,
    likes: likes,
  }

  const component = render(
    <SimpleBlog
      blog={blog}
      onClick={() => {}}
    />
  )

  const titleContainer = component.container.querySelector('.title')
  expect(titleContainer).toHaveTextContent(title)

  const nameContainer = component.container.querySelector('.author')
  expect(nameContainer).toHaveTextContent(author)

  const likesContainer = component.container.querySelector('.likes')
  expect(likesContainer).toHaveTextContent(likes)
})


test('clicking twice the button calls event handler twice', () => {
  const blog = {
    title: 'This is the title',
    author: 'Juan Pamon',
    likes: 23
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog
      blog={blog}
      onClick={mockHandler}
    />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
