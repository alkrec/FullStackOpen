import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const { blog, updateBlog, user, deleteBlog } = props
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const hideWhenVisible = { display: visible ? 'none' : '' } // when visible is true then display: 'none'. When visible false display then display: ''
  const showWhenVisible = { display: visible ? '' : 'none' } // when visible is true then display: ''. When visible false display then display: 'none'


  const handleLikeEvent = () => {
    const { id, ...updatedBlog } = { ...blog, likes: likes + 1, user: blog.user.id } //create a copy of blog, with the updated value for likes. Then destructure the updated copy of the object, into id, and the rest of the key/values
    updateBlog(id, updatedBlog)

    setLikes(likes + 1)
  }

  const handleDelete = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className="defaultContent">
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>view</button>
        </p>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes:{likes}
          <button className="like-button" onClick={handleLikeEvent}>like</button>
        </p>
        <p>{blog.user.name} </p>
        {
          blog.user.username === user.username && <button className="remove-button" onClick={handleDelete}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog