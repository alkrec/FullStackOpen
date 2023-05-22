import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInUser')
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = { //unnecessary to write for example, title: title in ES6
      title,
      author,
      url
    }

    const createdBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    console.log(createdBlog)
  }



  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} //An object is given to them as a parameter, and they destructure the field target from the object and save its value to the state.
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={(({ target }) => setPassword(target.value))}  //An object is given to them as a parameter, and they destructure the field target from the object and save its value to the state.
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>

      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <p>title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(event) => {setTitle(event.target.value) }} />
        </p>
        <p>author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(event) => {setAuthor(event.target.value) }} />
        </p>
        <p>
          url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={(event) => {setUrl(event.target.value) }} />
        </p>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default App