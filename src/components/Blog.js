import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(true)
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
    blog.likes += 1
    await blogService.update(blog)
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${ blog.title }?`)){
      const id = blog.id
      await blogService.remove(id)
      console.log('removed ', id)
    }
  }

  return(
    <div className='blog'>
      <div style={ showWhenVisible }>
        { blog.title } by {blog.author}
        <button onClick={ toggleVisibility }>view</button>
      </div>
      <div style={ hideWhenVisible }  className='toggledContent'>
        { blog.title } by { blog.author } <br/>
        { blog.url } <br/>
        likes { blog.likes }
        <button onClick={ handleLike }> like</button>
        <br/>
        <button onClick={ handleDelete }>delete</button> <br/>
        <button onClick= { toggleVisibility }>hide</button>
      </div>
    </div>
  )
}

export default Blog
