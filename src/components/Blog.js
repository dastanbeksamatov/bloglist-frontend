import React, { useState } from 'react'
const Blog = ({ blog, addLike, removeBlog }) => {
  const [ displayBlog, setDisplayBlog ] = useState(blog)

  // const hideWhenVisible = {
  //   display: visible ? 'none': '',
  //   borderRadius: 2,
  //   borderStyle: 'solid',
  //   color: 'black',
  //   margin: 2
  // }
  // const showWhenVisible = {
  //   display: visible ? '': 'none',
  //   borderRadius: 4,
  //   borderWidth: 1,
  //   borderStyle: 'solid',
  //   color: 'black',
  //   margin: 2
  // }

  const handleLike = async () => {
    const likes = displayBlog.likes + 1
    console.log(likes)
    const newBlog = {
      ...displayBlog,
      likes
    }
    setDisplayBlog(newBlog)
    await addLike(newBlog)
  }

  const handleDelete = async () => {
    if(window.confirm(`Do you want to delete ${ displayBlog.title }?`)){
      await removeBlog(displayBlog)
      setDisplayBlog({})
    }
  }
  if(!displayBlog){
    return null
  }
  return(
    <div id='blog.id' className='blog'>
      <p>{ displayBlog.title } by { displayBlog.author } </p>
      <p><a href={ displayBlog.url }> {displayBlog.url} </a></p>
      <p>likes { displayBlog.likes }</p>
      <button id='like-blog' onClick={ handleLike }> like </button>
      <br/>
      <button id='delete-blog' onClick={ handleDelete }> delete </button> <br/>
    </div>
  )
}

export default Blog
