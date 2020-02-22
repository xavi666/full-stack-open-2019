import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = newObject => {
  return axios.post(baseUrl, newObject);
}

export default { getAll, create }