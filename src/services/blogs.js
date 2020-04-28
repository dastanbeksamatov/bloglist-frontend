import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async newBlog => {
  console.log(token)
  const response = await axios.post(
    baseUrl,
    newBlog,
    { headers: { Authorization: token }
    })
  return response.data
}

const update = async newBlog => {
  // eslint-disable-next-line no-unused-vars
  const { id, user, ...blog } = newBlog
  const response = await axios.put(
    `${baseUrl}/${id}`,
    blog,
    {
      headers: {
        Authorization: token
      }
    }
  )
  return response
}

const remove = async id => {
  const response = await axios.delete(
    `${baseUrl}/${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
  return response.data
}

export default {
  getAll,
  add,
  setToken,
  remove,
  update
}