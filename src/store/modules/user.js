import { getInfo, setInfo } from '@/utils/storage'
export default {
  // 开启命名空间
  namespaced: true,
  // 数据
  state () {
    return {
      // 个人权证相关
      userInfo: getInfo()
    }
  },
  // 计算属性
  getters: {
  },
  // 方法 所用mutations的第一个参数都是state
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  // 异步
  actions: {
    // 退出登录
    loginOut (context) {
      // 个人信息重置
      context.commit('setUserInfo', {})

      // 购物车信息重置 （跨模块 cart setCartList）
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
