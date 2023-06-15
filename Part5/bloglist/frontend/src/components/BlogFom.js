import { useState } from 'react'

const BlogForm = (props) => {
  const { createBlog } = props

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  //
  // Summary: Handles form submit
  const handleSubmit = async (event) => {
    event.preventDefault() // stop page refresh

    const newBlog = { //Create new blog object, from form inputs.  note: unnecessary to write for example, title: title in ES6
      title,
      author,
      url
    }

    /// ?????DOES THIS HAVE TO BE AWAIT???????
    await createBlog(newBlog) //calls the createBlog function which is passed as a prop

    setTitle('') //clean form
    setAuthor('') //clean form
    setUrl('') //clean form
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>title:
        <input
          id="title-input"
          type="text"
          value={title}
          name="Title"
          placeholder="enter title"
          onChange={(event) => { setTitle(event.target.value) }} />
      </p>
      <p>author:
        <input
          id="author-input"
          type="text"
          value={author}
          name="Author"
          placeholder="enter author"
          onChange={(event) => { setAuthor(event.target.value) }} />
      </p>
      <p>
        url:
        <input
          id="url-input"
          type="text"
          value={url}
          name="Url"
          placeholder="enter url"
          onChange={(event) => { setUrl(event.target.value) }} />
      </p>
      <button id="submit-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm