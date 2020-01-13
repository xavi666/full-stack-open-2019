import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = (props) => {
  return (
    <form onSubmit={props.addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          value={props.newTitle}
          onChange={ props.handleTitleChange }
        />
      </div>
      <div>
        author:
        <input
          value={props.newAuthor}
          onChange={ props.handleAuthorChange }
        />
      </div>
      <div>
        url:
        <input
          value={props.newUrl}
          onChange={ props.handleUrlChange }
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newUrl: PropTypes.string.isRequired,
}

export default BlogForm;
