import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
