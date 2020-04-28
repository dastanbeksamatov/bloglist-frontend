import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog }) => {
  const [ visible, setVisible ] = useState(true)

  const hideWhenVisible = {
    display: visible ? 'none': '',
    borderRadius: 2,
    borderStyle: 'solid',
    color: 'black',
    margin: 2
  }
  const showWhenVisible = {
    display: visible ? '': 'none',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'black',
    margin: 2
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const newBlog = {
      likes: blog.likes + 1,
      ...blog
    }
    await addLike(newBlog)
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${ blog.title }?`)){
      await removeBlog(blog)
    }
  }

  return(
    <li id='blog.id' className='blog'>
      <span>
        <div id='div-blog-1' style={ showWhenVisible } className='default'>
          { blog.title } by {blog.author}
          <button id='view-blog' onClick={ toggleVisibility }>view</button>
        </div>
        <div id='div-blog-2' style={ hideWhenVisible }  className='toggledContent'>
          <p>{ blog.title } by { blog.author } </p>
          <p>{ blog.url }</p>
          <p>likes { blog.likes }</p>
          <button id='like-blog' onClick={ handleLike }> like </button>
          <br/>
          <button id='delete-blog' onClick={ handleDelete }> delete </button> <br/>
          <button id='hide-blog' onClick= { toggleVisibility }> hide </button>
        </div>
      </span>
    </li>
  )
}

export default Blog
