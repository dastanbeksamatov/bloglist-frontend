import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const add = async credentials => {
  const blog = {
    title: credentials.title,
    author: credentials.author,
    url: credentials.url,
    likes: credentials.likes
  }
  const token = `bearer ${credentials.token}`
  const response = await axios.post(
    baseUrl,
    blog,
    { headers: { Authorization: token }
    })
  return response.data
}

export default { getAll, add }