const React = require('react')
const loginService = require('../services/login')


const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const username = props.username
    const password = props.password
    console.log({ username, password })
    await loginService.login({ username, password, })
    try {
      const user = await loginService.login({
        username, password,
      })
      props.setUser(user)
      props.setUsername('')
      props.setPassword('')
    }
    catch(exception){
      props.setErrorMessage('Wrong credentials')
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 500)
    }
  }

  return (
    <form onSubmit={ handleLogin }>
      <div>
        username
        <input
          type='text'
          value = { props.username }
          name='username'
          onChange={({ target }) => { props.setUsername(target.value) } } />
      </div>
      <div>
        password
        <input
          type='password'
          value = { props.password }
          name='password'
          onChange={({ target }) => { props.setPassword(target.value) } } />
      </div>
      <button type='submit'>Log in</button>
    </form>
  )
}
export default LoginForm