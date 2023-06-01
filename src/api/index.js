import request from '@/utils/request'
import response from '@/utils/response'
export const getBlock = (data) => {
  return request({
    url: '/api/getBlock',
    method: 'POST',
    data
  })
}
export const getTransation = (data) => {
  return request({
    url: '/api/getTransaction',
    method: 'GET',
    data: {}
  })
}
export const getAddr = (data) => {
  return request({
    url: '/api/getAddr',
    method: 'POST',
    data
  })
}
export const getTransactionDetail = (data) => {
  return request({
    url: '/api/getTransactionDetail',
    method: 'POST',
    data
  })
}
export const getContract = (data) => {
  return request({
    url: '/api/getContract',
    method: 'POST',
    data
  })
}
export const getWebrelay = (data) => {
  return response({
    url: '/api/web3relay',
    method: 'POST',
    data
  })
}

