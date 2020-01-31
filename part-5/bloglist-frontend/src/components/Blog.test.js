import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const userId = 1
const title = 'This is the title'
const author = 'Juan Pamon'
const likes = 23

const user ={
  username: 'Xavi',
}

const blog = {
  id: userId,
  title: title,
  author: author,
  likes: likes,
  user: user
}

const component = render(
  <Blog
    key={blog.id}
    blog={blog}
    likeBlog={() => {}}
    removeBlog={() => {}}
    showRemoveButton={user.username === blog.user.username}
  />
)

test('renders correct content on initialization', () => {

  const component = render(
    <Blog
      key={blog.id}
      blog={blog}
      likeBlog={() => {}}
      removeBlog={() => {}}
      showRemoveButton={user.username === blog.user.username}
    />
  )

  const summary = component.container.querySelector('.summary')
  expect(summary).toHaveTextContent(title)
  expect(summary).toHaveTextContent(author)
  expect(summary).not.toHaveTextContent(likes)
  expect(summary).not.toHaveTextContent(user.username)
})

test('renders correct content when expanding', () => {

  const component = render(
    <Blog
      key={blog.id}
      blog={blog}
      likeBlog={() => {}}
      removeBlog={() => {}}
      showRemoveButton={user.username === blog.user.username}
    />
  )

  const summary = component.container.querySelector('.summary')
  fireEvent.click(summary)

  const detail = component.container.querySelector('.detail')
  expect(detail).toHaveTextContent(title)
  expect(detail).toHaveTextContent(author)
  expect(detail).toHaveTextContent(likes)
  expect(detail).toHaveTextContent(user.username)
})
