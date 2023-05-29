import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' } // when visible is true then display: 'none'. When visible false display then display: ''
  const showWhenVisible = { display: visible ? '' : 'none' } // when visible is true then display: ''. When visible false display then display: 'none'
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>view</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(!visible)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes:{blog.likes}
          <button>like</button>
        </p>
        <p>{blog.user.name} </p>
      </div>
    </div>
  )
}

export default Blog