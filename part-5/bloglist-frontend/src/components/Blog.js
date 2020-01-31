import React, { useState } from 'react';

const Blog = ({ blog, likeBlog, removeBlog, showRemoveButton }) => {

  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!expanded) {
    return (
      <div
        className='summary'
        onClick={() => setExpanded(true)}
        style={blogStyle}>
        {blog.title} {blog.author}
      </div>
    )
  }

  return (
    <div
      className='detail'
      style={blogStyle}>
      <p onClick={() => setExpanded(false)}>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={() => likeBlog(blog)}>like</button></p>
      <p>added by {blog.user.username}</p>
      { showRemoveButton && (<button onClick={() => removeBlog(blog)}>remove</button>)}
    </div>
  )
}

export default Blog
