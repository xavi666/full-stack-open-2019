import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input {...props.newTitle} />
      </div>
      <div>
        author:
        <input {...props.newAuthor} />
      </div>
      <div>
        url:
        <input {...props.newUrl} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.object.isRequired,
  newAuthor: PropTypes.object.isRequired,
  newUrl: PropTypes.object.isRequired,
}

export default BlogForm;
