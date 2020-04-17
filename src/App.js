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
    const getAll = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAll()
  }, [])
  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      const user = window.localStorage.getItem('loggedInUser')
      console.log(JSON.parse(user))
      setUser(JSON.parse(user))
      const setToken = async (user) => {
        await blogService.setToken(JSON.parse(user).token)
      }
      setToken(user)
    }
  }, [])

  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addLike = async (newBlog) => {
    await blogService.update(newBlog)
  }

  const addBlog = async (newBlog) => {
    await blogService.add(newBlog)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
    setMessage({ body:`${ newBlog.title } by ${ newBlog.author } is added`, type: true } )
    setTimeout(() => {
      setMessage({ body: '', type: true })
    }, 5000)
  }

  const removeBlog = async (blog) => {
    await blogService.remove(blog.id)
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
    setMessage({ body: `${ blog.title } by ${ blog.author } was removed`, type: false })
    setTimeout(() => {
      setMessage({ body: '', type: true })
    }, 5000)
  }

  const listBlogs = () => {
    return(
      <div>
        <h2>blogs</h2>
        <p>{ user.name } is logged in </p>
        <button id='logout' onClick={ handleClick }>log out </button>
        <h2>Create new</h2>
        <Togglable buttonLabel='new blog' ref={ blogFormRef }>
          <BlogForm addBlog={ addBlog } blogFormRef = { blogFormRef }/>
        </Togglable>
        <Togglable buttonLabel='show all blogs'>
          <ul id='list-blogs'>
          { blogs.sort((a,b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike ={ addLike } removeBlog={ removeBlog }/>
          ) }
          </ul>
        </Togglable>
      </div>
    )
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm setUser={ setUser } setMessage={ setMessage }/>
        </Togglable>
      </div>
    )
  }
  if (user===null){
    return(
      <div id='login-form'>
        <Notification message= { message }/>
        { loginForm() }
      </div>
    )
  }
  return (
    <div id='list-blogs'>
      <Notification message={ message }/>
      { listBlogs() }
    </div>
  )
}

export default App