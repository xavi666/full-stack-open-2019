import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <p className='title'>{blog.title}</p>
      <p className='author'>{blog.author}</p>
    </div>
    <div>
      <p className='likes'>blog has {blog.likes} likes</p>
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
