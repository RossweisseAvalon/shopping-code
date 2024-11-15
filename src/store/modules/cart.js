import { changeCount, delSelect, getCartList } from '@/api/cart'
// import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: [] // 购物车列表
    }
  },
  getters: {
    // 所用的商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecken !== false)
    },
    // 选中的总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods.goods_price_min * item.goods_num, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecken === true)
    }
  },
  mutations: {
    // 提供一个设置 cartList 的 mutation
    setCartList (state, newList) {
      state.cartList = newList
    },
    // 复选框切换状态
    toggleCheck (state, goodsId) {
      // 让对应的 id 项，状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecken = !goods.isChecken
    },
    // 全选框状态切换
    toggleAllCkeck (state, flag) {
      // 让所有的复选框同步设置
      state.cartList.forEach(item => {
        item.isChecken = flag
      })
    },

    // 本地更新购物车商品数量
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 异步获取购物车列表
    async getCartAction (context) {
      const res = await getCartList()
      // 后台返回的数据中不包含复选框的状态，为了将来的功能
      // 需要手动维护数据，给每一项，添加一个 isChecked 状态 （标记当前复选框是否选中）
      res.data.list.forEach(item => {
        item.isChecken = true
      })
      // 购物车列表赋值
      context.commit('setCartList', res.data.list)
    },

    // 购物车数量更新
    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 同步到后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },

    // 删除购物车选中商品
    async delSelectAction (context) {
      const cartIds = context.getters.selCartList.map(item => item.id)
      await delSelect(cartIds)
      // 删除成功后重新拉取最新数据(重新渲染)
      // Toast('删除成功')
      context.dispatch('getCartAction')
    }
  }
}
