import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

export const fetcher = async (method, path, ...rest) => {
  const res = await axios[method](path, ...rest)

  return res.data
}
