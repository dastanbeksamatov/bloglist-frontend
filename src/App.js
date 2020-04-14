import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState({ body:'', type: true })

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      const user = window.localStorage.getItem('loggedInUser')
      setUser(JSON.parse(user))
      blogService.setToken(JSON.parse(user).token)

    }
  }, [])

  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addTestBlog = () => {
    console.log('For test purposes')
  }

  const listBlogs = () => {
    return(
      <div>
        <h2>blogs</h2>
        <p>{ user.name } is logged in </p>
        <button onClick={ handleClick }>log out </button>
        <h2>Create new</h2>
        <Togglable buttonLabel='new blog' ref={ blogFormRef }>
          <BlogForm setBlogs={ setBlogs } setMessage={ setMessage } blogFormRef = { blogFormRef }/>
        </Togglable>
        <Togglable buttonLabel='show all blogs'>
          { blogs.sort((a,b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} blog={blog} />
          ) }
        </Togglable>
      </div>
    )
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm setUser={ setUser }/>
        </Togglable>
      </div>
    )
  }
  if (user===null){
    return(
      <div>
        <Notification message= { message }/>
        { loginForm() }
      </div>
    )
  }
  return (
    <div>
      <Notification message={ message }/>
      { listBlogs() }
    </div>
  )
}

export default App