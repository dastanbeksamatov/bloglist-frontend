import React, { useState } from 'react'
import loginService from '../services/login'
import propTypes from 'prop-types'


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
    <form id='login-form' onSubmit={ handleLogin }>
      <div>
        username
        <input
          id='username'
          type='text'
          value = { username }
          name='username'
          onChange={ ({ target }) => { setUsername(target.value) } } />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value = { password }
          name='password'
          onChange={ ({ target }) => { setPassword(target.value) } } />
      </div>
      <button id='submit-login' type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm

LoginForm.propTypes = {
  setMessage: propTypes.func.isRequired,
  setUser: propTypes.func.isRequired
}