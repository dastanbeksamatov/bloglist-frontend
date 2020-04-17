import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, addLike, removeBlog }) => {
  const [ visible, setVisible ] = useState(true)
  const [ newBlog, setNewBlog ] = useState(blog)

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
    newBlog.likes += 1
    await addLike(newBlog)
    setNewBlog({
      id: newBlog.id,
      ...newBlog
    })
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${ blog.title }?`)){
      await removeBlog(newBlog)
    }
  }

  return(
    <li id='newBlog.id' className='blog'>
      <span>
        <div id='div-blog-1' style={ showWhenVisible } className='default'>
          { newBlog.title } by {newBlog.author}
          <button id='view-blog' onClick={ toggleVisibility }>view</button>
        </div>
        <div id='div-blog-2' style={ hideWhenVisible }  className='toggledContent'>
          <p>{ newBlog.title } by { newBlog.author } </p>
          <p>{ newBlog.url }</p>
          <p>likes { newBlog.likes }</p>
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
