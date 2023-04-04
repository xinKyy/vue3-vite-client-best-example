import axios from 'axios'
const instance = axios.create({
  timeout: 10000,
  baseURL: '/red'
})
// 请求拦截器
instance.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  })
// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  err => {
    return Promise.reject(err)
  })

export default instance