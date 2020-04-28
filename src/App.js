import React, { useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog, removeBlog, updateBlog } from './reducers/blogReducer'
import { setNotification, setErrorMessage } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'


const App = () => {
  const blogFormRef = React.createRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      const user = window.localStorage.getItem('loggedInUser')
      const { token, ...curUser } = JSON.parse(user)
      dispatch(setUser(curUser))
      // this function is initialized because no await call inside useEffect
      const setToken = async (token) => {
        await blogService.setToken(token)
      }
      setToken(token)
    }
  }, [dispatch])

  const message = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const handleClick = () => {
    window.localStorage.clear()
    dispatch(clearUser())
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

  const login = async (u) => {
    const response = await loginService.login(u)
    const { token, ...loggedInUser } = response
    window.localStorage.setItem('loggedInUser', JSON.stringify(response))
    await blogService.setToken(token)
    dispatch(setUser(loggedInUser))
  }

  const invalidLogin = async () => {
    dispatch(setErrorMessage({body: 'invalid credentials', type: false}, 5000))
  }

  const match = useRouteMatch('/users/:id')
  const selectedUser = match ? users.find(user => user.id === match.params.id) : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

  const Menu = () => {
    return (
      <div>
        <Link to="/"> main </Link>
        <Link to="/users"> users </Link>
        <Link to="/blogs"> blogs </Link>
        { user.name } is logged in 
        <button id='logout' onClick={ handleClick }>log out </button>
      </div>
    )
  }

  const listBlogs = () => {
    return(
      <div>
        <h2>Create new</h2>
        <Togglable buttonLabel='new blog' ref={ blogFormRef }>
          <BlogForm addBlog={ createBlog } blogFormRef = { blogFormRef }/>
        </Togglable>
        <ul id='list-blogs'>
          { blogs.sort((a,b) => a.likes - b.likes).map(blog => 
            <li key={ blog.id }><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></li>
          )}
        </ul>
      </div>
    )
  }
  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel='login'>
          <LoginForm login ={ login } invalidLogin = { invalidLogin } />
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
      <Menu />
      <Notification message={ message }/>
      <h2>blogs</h2>
      <Switch>
        <Route path="/users/:id">
          <User user={ selectedUser } />
        </Route>
        <Route path="/users">
          <Users users={ users }/>  
        </Route>
        <Route path="/blogs/:id">
          <Blog blog = { matchedBlog } addLike={ addLike } removeBlog={ deleteBlog }/>
        </Route>
        <Route path="/blogs">
          { listBlogs() }
        </Route>
        <Route path="/">
          <h1>Blog App</h1>
        </Route>
      </Switch>
    </div>
  )
}

export default App