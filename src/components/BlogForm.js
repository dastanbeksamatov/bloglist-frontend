import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogs, setMessage, blogFormRef }) => {
  const [ newBlog, setNewBlog ] = useState( { name: '', author:'', url: '', likes:0 })
  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    await blogService.add(newBlog)
    setNewBlog({})
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setMessage({ body:`${ newBlog.title } by ${ newBlog.author } is added`, type: true } )
    setTimeout(() => {
      setMessage({ body: '', type: true })
    }, 5000)
  }
  const handleBlogChange = (event) => {
    event.preventDefault()
    const target = event.target
    const value = target.value
    const name = target.name
    setNewBlog({
      ...newBlog, [name]: value
    })
  }
  return (
    <div>
      <form onSubmit={ addBlog } >
        <div>
          title
          <input
            value = { newBlog.title || '' }
            type='text'
            name='title'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          author:
          <input
            value = { newBlog.author || '' }
            type='text'
            name='author'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          url
          <input
            value = { newBlog.url || '' }
            type='text'
            name='url'
            onChange={ handleBlogChange }>
          </input>
        </div>
        <div>
          likes
          <input
            value = { newBlog.likes || 0}
            type='number'
            name='likes'
            onChange={ handleBlogChange }>
          </input>
          <br/>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm

BlogForm.PropTypes = {
  handleBlogChange: PropTypes.func.isRequired
}