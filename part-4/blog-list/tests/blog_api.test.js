const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const sinon = require('sinon');
const jwt = require('jsonwebtoken')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    let userObject = new User(user)
    await userObject.save()
  }

  const users = await User.find({ username: helper.initialUsers[0].username })
  sinon.stub(jwt,'verify').returns({
    username: users[0].username,
    id: users[0]._id
  })

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = users[0]
    await blogObject.save()
  }
})

afterEach(async () => {
  sinon.restore();
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

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'ACB.com',
        author: 'Don Patricio',
        url: 'www.acb.com',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer 123456789`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).toContain('ACB.com')
    })

    test('when missing likes property is defaulted to 0', async () => {
      const newBlog = {
        title: 'ACB.com',
        author: 'Don Patricio',
        url: 'www.acb.com'
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer 123456789`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBeDefined()
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
    })

    test('when missing title and url returns a 400 error', async () => {
      const newBlog = {
        author: 'Don Patricio',
        likes: 4
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer 123456789`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer 123456789`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      blogToUpdate.title = 'Updated Title'
      blogToUpdate.url = 'www.updated-url.com'
      blogToUpdate.author = 'Updated Author'
      blogToUpdate.likes = 5

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(blogsAtStart.length)
      expect(blogsAtStart[0].title).toBe('Updated Title')
      expect(blogsAtStart[0].url).toBe('www.updated-url.com')
      expect(blogsAtStart[0].author).toBe('Updated Author')
      expect(blogsAtStart[0].likes).toBe(5)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
