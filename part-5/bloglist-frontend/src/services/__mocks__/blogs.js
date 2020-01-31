const user = {
  _id: '5a437a9e514ab7f168ddf138',
  username: 'mluukkai',
  name: 'Matti Luukkainen'
}

const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'You are me',
    author: 'Mark Cucumber',
    likes: 3,
    user: user
  },
  {
    id: '5a43434343434343a31b5c8ce',
    title: 'This is me',
    author: 'Jason Mraz',
    likes: 5,
    user: user
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
