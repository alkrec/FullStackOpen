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


  //
  // Summary: Retrieve all blogs from the database
  useEffect(() => {
    blogService.getAll().then(blogs => // get blogs from db
      setBlogs(blogs) //set blogs
    )
  }, [])


  //
  // Summary: Persist login after page refresh
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')  // retrieve logged in user details from local storage
    if (loggedUserJSON) { //if logged in user exists
      const user = JSON.parse(loggedUserJSON) // converts JSON into javascript object
      setUser(user) //set user
      blogService.setToken(user.token) //set user token for axios authorization
    }
  }, [])


  //
  // Summary: Event handler for login
  const handleLogin = async (event) => {
    event.preventDefault() //stop page refresh

    try {
      const user = await loginService.login({ //send user credentials for login verification
        username, password
      })

      window.localStorage.setItem( // save user details to local storage
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token) // set token for axios authentification
      setUser(user) // set user
      setUsername('') // clean form
      setPassword('') // clean form
    } catch (exception) { // display error message
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  //
  // Summary: Log out user
  const handleLogout = () => {
    setUser(null); // empty user variable
    window.localStorage.removeItem('loggedInUser') // empty user from local storage
  }


  //
  // Summary: Submit new blog
  const handleSubmit = async (event) => {
    event.preventDefault() // stop page refresh

    const newBlog = { //Create new blog object, from form inputs.  note: unnecessary to write for example, title: title in ES6
      title,
      author,
      url
    }

    const createdBlog = await blogService.create(newBlog) //Post request with new blog object
    setBlogs(blogs.concat(createdBlog)) //add new blog to blogs array
    setTitle('') //clean form
    setAuthor('') //clean form
    setUrl('') //clean form
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