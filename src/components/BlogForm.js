import React from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    props.setBlog(props.blog)
    const credentials = { token: props.user.token, ...props.blog }
    props.setBlog({})
    await blogService.add(credentials)
    const blogs = await blogService.getAll()
    props.setBlogs(blogs)
  }

  return (
    <div>
      <form onSubmit={ addBlog } >
        <div>
          title
          <input
            value = { props.blog.title }
            type='text'
            name='title'
            onChange={ ({ target }) => { props.blog.title = target.value } }>
          </input>
        </div>
        <div>
          author:
          <input
            value = { props.blog.author }
            type='text'
            name='author'
            onChange={ ({ target }) => { props.blog.author = target.value } }>
          </input>
        </div>
        <div>
          url
          <input
            value = { props.blog.url }
            type='text'
            name='url'
            onChange={ ({ target }) => { props.blog.url = target.value } }>
          </input>
        </div>
        <div>
          likes
          <input
            value = { props.blog.likes }
            type='number'
            name='title'
            onChange={ ({ target }) => { props.blog.likes = target.value } }>
          </input>
          <br/>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm