import React from 'react'
import { useField } from '../hooks'


const LoginForm = ({ login, invalidLogin }) => {
  const username = useField('', '')
  const password = useField('password', '')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      login({ username: username.value, password: password.value })
      username.value = ''
      password.value = ''
    }
    catch(exception){
      invalidLogin()
    }
  }

  return (
    <form id='login-form' onSubmit={ handleLogin }>
      <div>
        username
        <input
          id='username' { ...username }
          />
      </div>
      <div>
        password
        <input
          id='password' { ...password }/>
      </div>
      <button id='submit-login' type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm