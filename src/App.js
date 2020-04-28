import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, removeBlog, updateBlog } from './reducers/blogReducer'
import { setNotification, setErrorMessage } from './reducers/notificationReducer'

const App = () => {
  const [ user, setUser ] = useState(null)

  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      const user = window.localStorage.getItem('loggedInUser')
      setUser(JSON.parse(user))
      const setToken = async (user) => {
        await blogService.setToken(JSON.parse(user).token)
      }
      setToken(user)
    }
  }, [])

  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addLike = async (newBlog) => {
    dispatch(updateBlog(newBlog))
  }

  const createBlog = async (newBlog) => {
    dispatch(addBlog(newBlog))
    dispatch(setNotification({ body:`${ newBlog.title } by ${ newBlog.author } is added`, type: true }, 5000))
  }

  const deleteBlog = async (blog) => {
    dispatch(removeBlog(blog.id))
    dispatch(setErrorMessage({ body: `${ blog.title } by ${ blog.author } was removed`, type: false }, 5000))
  }

  const invalidLogin = async () => {
    dispatch(setErrorMessage({body: 'invalid credentials', type: false}, 5000))
  }

  const listBlogs = () => {
    return(
      <div>
        <h2>blogs</h2>
        <p>{ user.name } is logged in </p>
        <button id='logout' onClick={ handleClick }>log out </button>
        <h2>Create new</h2>
        <Togglable buttonLabel='new blog' ref={ blogFormRef }>
          <BlogForm addBlog={ createBlog } blogFormRef = { blogFormRef }/>
        </Togglable>
        <Togglable buttonLabel='show all blogs'>
          <ul id='list-blogs'>
          { blogs.sort((a,b) => a.likes - b.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLike ={ addLike } removeBlog={ deleteBlog }/>
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
          <LoginForm setUser ={ setUser } invalidLogin = { invalidLogin } />
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