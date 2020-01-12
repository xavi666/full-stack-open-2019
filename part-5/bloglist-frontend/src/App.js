import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
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
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogService.setToken(user.token)
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage({
        type: 'success',
        text: `successfully logged in`
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
      title: newTitle,
      author: newAuthor,
      url: newUrl
    };
    blogService
      .create(newBlog)
      .then(response => {
        setBlogs(blogs.concat(response));
        setNewTitle('');
        setNewAuthor('');
        setNewUrl('');
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
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
          newTitle={newTitle}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          newAuthor={newAuthor}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          newUrl={newUrl}
          handleUrlChange={({ target }) => setNewUrl(target.value)}
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
          />
        )}
      </div>
    </div>
  );
}

export default App;
