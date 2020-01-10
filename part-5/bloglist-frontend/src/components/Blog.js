import React, { useState } from 'react';

const Blog = ({ blog }) => {

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
        onClick={() => setExpanded(true)}
        style={blogStyle}>
        {blog.title}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p onClick={() => setExpanded(false)}>{blog.title}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={()=>{}}>like</button></p>
      <p>added by {blog.author}</p>
    </div>
  )
}

export default Blog
