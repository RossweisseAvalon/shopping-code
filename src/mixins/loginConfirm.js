export default {
  // 此处编写的就是 vue组件实例的 配置项，通过一定语法可以直接混入到组件内部
  // data methods computed 生命周期函数 ...
  // 注意点：
  //  1.如果此处 和组件内，提供了同名的 data 和 methods. 则组件内优先
  //  2.如果编写了生命周期函数，则mixins中的生命周期函数 和 页面的生命周期函数，
  //    会用数组管理统一执行

  methods: {
    // 判断是否登录(token)
    loginConfirm () {
      // 判断是否有 token 值，不存在弹提示框，反之继续请求
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '在逛逛'
        }).then(() => {
          // 如果希望，跳转到登录 => 登录后在回跳回来，需要跳转中携带参数(当前路径地址)
          // this.$route.fullPath (会包含查询参数)
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
