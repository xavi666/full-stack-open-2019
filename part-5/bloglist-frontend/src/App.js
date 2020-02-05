import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import  { useField } from './hooks';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text', 'Username')
  const password = useField('password', 'Password')
  const [user, setUser] = useState(null);
  const newTitle = useField('text', 'Title')
  const newAuthor = useField('text', 'Author')
  const newUrl = useField('text', 'Url')
  const [message, setMessage] = useState({});

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token)
      setUser(user);
      setMessage({
        type: 'success',
        text: 'successfully logged in'
      });
      setTimeout(() => {
        setMessage({});
      }, 2500);
    } catch (exception) {
      setMessage({
        type: 'error',
        text: 'wrong username or password'
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  }

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
    };
    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response));
        newTitle.reset();
        newAuthor.reset();
        newUrl.reset();
        setMessage({
          type: 'success',
          text: `a new blog ${response.title} by ${response.author} added`
        });
        setTimeout(() => {
          setMessage({});
        }, 2500);
      })
      .catch(error => {
        setMessage({
          type: 'error',
          text: `error while creating blog ${error}`
        });
        setTimeout(() => {
          setMessage({});
        }, 5000);
      });
  };

  const likeBlog = (blog) => {
    const updatedBlog = {...blog, likes: blog.likes + 1 };
    blogService
      .update(updatedBlog.id, updatedBlog)
      .then(response=> {
        setBlogs(blogs.map(b => b.id !== updatedBlog.id ? b : response.data))
      })
  };

  const sortByLikes = () => {
    setBlogs(
      [].concat(blogs.sort((a, b)=> {
        return b.likes - a.likes;
      })
      ));
  }

  const removeBlog = (blog) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id));
        })
        .catch(error => {
          setMessage({
            type: 'error',
            text: `error while deleting blog: ${error.response.data.error}`
          });
          setTimeout(() => {
            setMessage({});
          }, 5000);
        });
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username.inputProps()} />
          </div>
          <div>
            password
            <input {...password.inputProps()} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {`${user.username} logged in`}
        <button onClick={() => handleLogout()}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel='new blog'>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle.inputProps()}
          newAuthor={newAuthor.inputProps()}
          newUrl={newUrl.inputProps()}
        />
      </Togglable>
      <button onClick={() => sortByLikes()}>
        Sort by Likes
      </button>
      <div>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            showRemoveButton={user.username === blog.user.username}
          />
        )}
      </div>
    </div>
  );
}

export default App;
