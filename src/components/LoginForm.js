import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setMessage }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

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



  return (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          type='text'
          value = { username }
          name='username'
          onChange={ ({ target }) => { setUsername(target.value) } } />
      </div>
      <div>
        password
        <input
          type='password'
          value = { password }
          name='password'
          onChange={ ({ target }) => { setPassword(target.value) } } />
      </div>
      <button type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm