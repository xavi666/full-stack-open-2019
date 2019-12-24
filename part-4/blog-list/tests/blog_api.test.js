const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined();
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'ACB.com',
      author: 'Don Patricio',
      url: 'www.acb.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toContain('ACB.com')
  })

  test('a blog with missing likes property is defaulted to 0', async () => {
    const newBlog = {
      title: 'ACB.com',
      author: 'Don Patricio',
      url: 'www.acb.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBeDefined()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
  })

  test('a blog with missing title and url returns a 400 error', async () => {
    const newBlog = {
      author: 'Don Patricio',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
