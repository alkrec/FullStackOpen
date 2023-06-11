import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogFom'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationInfo, setNotificationInfo] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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
      setNotificationInfo({ message: 'Login Successful' })
      setTimeout(() => {
        setNotificationInfo(null)
      }, 5000)
    } catch (exception) { // display error message
      setNotificationInfo({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotificationInfo(null)
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
  // Summary: Sends HTTP POST request for new Blog
  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog) //Post request with new blog object
      setBlogs(blogs.concat(createdBlog)) //add new blog to blogs array

      setNotificationInfo({ message: 'New Blog Added' })
      setTimeout(() => {
        setNotificationInfo(null)
      }, 5000)
    } catch (error) {
      setNotificationInfo({ message: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotificationInfo(null)
      }, 5000)
    }

  }


  //
  // Summary: Sends HTTP PUT request for updated Blog
  const updateBlog = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog) //Post request with new blog object
      const updatedBlogs = blogs.reduce((newArray, item) => { ///????? IS THIS THE PROPER WAY TO UPDATE THE BLOGS ARRAY?????
        if (item.id === id) {
          return newArray.concat(updatedBlog)
        }
        return newArray.concat(item)
      },[])

      setBlogs(updatedBlogs) //blogs array with updated blog
    } catch (error) {
      setNotificationInfo({ message: `${error.response.data.error}`, type: 'error' })
      setTimeout(() => {
        setNotificationInfo(null)
      }, 5000)
      console.log(error)
    }
  }


  //
  // Summary: Handles delete request
  const deleteBlog = async (id) => {
    try {
      // console.log(id)
      await blogService.remove(id)
      const updatedBlogs = blogs.filter((blog) => blog.id !== id)
      setBlogs(updatedBlogs)
    } catch (error) {
      
    }
  }

  const sortedBlogs = blogs.sort((x,y) => {  //???? IS THIS CORRECT FOR EXERCISE 5.10????
    if (x.likes < y.likes) {
      return 1;
    }
    if (x.likes > y.likes) {
      return -1;
    }
    return 0;
  })


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={notificationInfo} />
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
      <h2>blogs</h2>
      <Notification info={notificationInfo} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel="create new">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog 
          key={blog.id} 
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  )

}

export default App