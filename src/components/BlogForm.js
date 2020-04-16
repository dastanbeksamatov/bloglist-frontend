import React, { useState } from 'react'

const BlogForm = ({ addBlog, blogFormRef }) => {
  // important: make testMode false before running
  const [ newBlog, setNewBlog ] = useState( { title: '', author:'', url: '', likes:0 })
  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    await addBlog(newBlog)
    setNewBlog({})
  }
  const handleBlogChange = (event) => {
    event.preventDefault()
    // gets every input by its name and updates newBlog state with every change
    const target = event.target
    const value = target.value
    const name = target.name
    setNewBlog({
      ...newBlog, [name]: value
    })
  }
  return (
    <div>
      <form id='login-form' onSubmit={ handleSubmit } >
        <div>
          title
          <input
            id = 'title'
            value = { newBlog.title || '' }
            type='text'
            name='title'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          author:
          <input
            id = 'author'
            value = { newBlog.author || '' }
            type='text'
            name='author'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          url
          <input
            id = 'url'
            value = { newBlog.url || '' }
            type='text'
            name='url'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          likes
          <input
            id = 'likes'
            value = { newBlog.likes}
            type='number'
            name='likes'
            onChange={ handleBlogChange }>
          </input>
          <br/>
          <button id='submit-blog' type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm