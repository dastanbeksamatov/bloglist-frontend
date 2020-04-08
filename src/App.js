import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState({ body:'', type: true })
  const [ blog, setBlog ] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    if(window.localStorage.getItem('loggedInUser')){
      setUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log({ username, password })
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception){
      setMessage({
        body: 'Wrong credentials',
        type: false
      })
      setTimeout(() => {
        setMessage({ body: '', type: true })
      }, 500)
    }
  }

  const loginForm = () => {
    return(
      <form onSubmit={ handleLogin }>
        <div>
        username
          <input
            type='text'
            value = { username }
            name='username'
            onChange={({ target }) => { setUsername(target.value) } } />
        </div>
        <div>
        password
          <input
            type='password'
            value = { password }
            name='password'
            onChange={({ target }) => { setPassword(target.value) } } />
        </div>
        <button type='submit'>Log in</button>
      </form>
    )
  }

  const listBlogs = () => {
    return(
      <div>
        <h2>blogs</h2>
        <p>{ user.name } is logged in </p>
        <button onClick={ handleClick }>log out </button>
        <h2>Create new</h2>
        <BlogForm
          blog={ blog } setBlog={ setBlog }
          user={user}
          blogs ={ blogs } setBlogs={ setBlogs }
          setMessage={ setMessage }
        />
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        ) }
      </div>
    )
  }
  const handleClick = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification message={ message }/>
      { user === null ? loginForm(): listBlogs()}
    </div>
  )
}

export default App