const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Miquel Marti i Pol',
    url: 'http://htmliseasy.com',
    likes: 3
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Lluis Companys',
    url: 'http://browserCanExecuteOnlyJavascript.com',
    likes: 2
  },
]

const initialUsers = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb
}
