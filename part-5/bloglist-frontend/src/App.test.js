import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'
import defineLocalStorage from './setupTests'

defineLocalStorage()

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in to application')
    )
  })

  test('if user is logged, list of blogs are rendered', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('blogs')
    )

    const summaryBlogs = component.container.querySelectorAll('.summary')
    expect(summaryBlogs.length).toBe(2)

    const detailBlogs = component.container.querySelectorAll('.detail')
    expect(detailBlogs.length).toBe(0)

    expect(component.container).toHaveTextContent(
      'You are me'
    )

    expect(component.container).toHaveTextContent(
      'Jason Mraz'
    )
  })
})
