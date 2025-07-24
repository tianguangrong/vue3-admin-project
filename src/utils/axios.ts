import axios, { 
  type AxiosInstance, 
  type InternalAxiosRequestConfig, 
  type AxiosResponse,
  type AxiosError
} from "axios";
import { ElNotification } from 'element-plus'

const service:AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com',
  timeout: 5000
})
service.interceptors.request.use((config:InternalAxiosRequestConfig) => {
  console.log(config);
  return config
}, (error:AxiosError) => {
  ElNotification({
    title:'Error',
    duration: 5000,
    type: 'error',
    message: error.message
  })
  return Promise.reject(error)
})
service.interceptors.response.use((response:AxiosResponse) => {
  console.log(response);
  debugger
  const { code, message } = response['data']
  if (code === 200 && message === '登录成功') {
    ElNotification({
      title:'Success',
      duration: 2000,
      type: 'success',
      message: message
    })
  } else {
    ElNotification({
      title:'Error',
      duration: 5000,
      type: 'error',
      message: message
    })
  }
  return response['data'];
}, (error:AxiosError) => {
  ElNotification({
    title:'Error',
    duration: 5000,
    type: 'error',
    message: error.message
  })
  return Promise.reject(error)
});
export default service;