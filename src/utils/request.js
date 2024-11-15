import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例，将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 50000,
  headers: { platform: 'H5' }
})

// 自定义配置 - 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，并禁止点击（节流处理）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })

  // 只要有 token 就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    // config 完整信息对象
    // 正常携带 config.headers.Authorization，
    // 因携带的时是特殊 Access-Token 所以需使用 [] 形式
    config.headers['Access-Token'] = token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么（默认axios会多一层data，需要响应拦截器处理）
  if (response.data.status !== 200) {
    // 给错误提示
    Toast(response.data.message)
    // 抛出一个错误的promise
    return Promise.reject(response.data.message)
  }
  // 正确情况，走核心逻辑，清除loading效果
  Toast.clear()

  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
