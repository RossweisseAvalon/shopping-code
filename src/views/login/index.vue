<template>
  <div class="loginBox">
    <!-- 头部 -->
    <van-nav-bar fixed title="会员登录" left-arrow @click-left="onClickLeft"/>
    <div class="formBox">
      <div class="head">
        <h1>手机号登录</h1>
        <p>未注册的手机号将自动注册</p>
      </div>
      <div class="form">
        <input v-model="mobile" maxlength="11" type="text" placeholder="请输入手机号">
      </div>
      <div class="form">
        <input v-model="picCode" maxlength="4" type="text" placeholder="请输入图形验证码">
        <img  v-if="picUrl" :src="picUrl" @click="getPicCode" alt="">
      </div>
      <div class="form">
        <input v-model="smsCode" type="text" placeholder="请输入短信验证码246810">
        <button :disabled="second<60" @click="getCode">
          {{ totalSecond === second ? '获取验证码' : second + '后重新发送' }}
        </button>
      </div>
      <div @click="login" class="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器id
      mobile: '18879751532', // 手机号
      picCode: 'aaaa', // 用户输入的图形验证码
      smsCode: '246810' // 短信验证码
    }
  },

  // 进页面时获取图形验证码图片和唯一标识
  async created () {
    this.getPicCode()
  },

  methods: {
    // 获取图形验证码
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64 // 存储地址
      this.picKey = key // 存储唯一标识
    },

    // 封装校验手机号和验证码是否合法 通过返回true，则false
    valiFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 获取短信验证码
    async getCode () {
      // 校验手机号验证码
      if (!this.valiFn()) {
        return
      }

      // 当前没有定时器开着，且 totalSecond 和 second（秒数归位） 一致才可以开始倒计时
      if (!this.timer || this.totalSecond === this.second) {
        // 预期：如果响应的status非200，最好抛出一个promise异常，await只会等待成功的promise
        // 发送请求
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('获取成功')
        this.second--
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second === 0) {
            clearInterval(this.timer) // 停止定时器
            this.timer = null // 重置定时器id
            this.second = this.totalSecond // 归位
          }
        }, 1000)
      }
    },

    // 登录
    async login () {
      // 校验手机号验证码
      if (!this.valiFn()) {
        return
      }
      // 校验短信验证码
      // if (this.smsCode !== '246810') {
      //   this.$toast('请输入正确的短信验证码')
      //   return
      // }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$toast('登录成功')
      // 将个人权证数据存在vuex
      this.$store.commit('user/setUserInfo', res.data)

      // 进行判断，地址栏是否有回跳地址
      // 有 => 说明其他页面拦截到登录，需要回跳。反之正常去首页
      const url = this.$route.query.backUrl || '/user'
      this.$router.replace(url)
    },

    onClickLeft () {
      if (this.$route.query.backUrl) {
        this.$router.replace(this.$route.query.backUrl)
      } else {
        this.$router.go(-1)
      }
    }
  },
  // 离开页面时关闭定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.loginBox {
  padding-top: 46px;
}
  .head{
    padding: 20px 25px;
    h1{
      font-weight: normal;
    }
    p{
      opacity: .5;
    }
  }
  .form{
    display: flex;
    margin: 10px 40px;
    border-bottom: 1px solid #dfdede;
    input{
      width: 250px;
      margin: 20px 0px;
      border: none;
    }
    img{
      width: 100px;
      height: 30px;
      align-self: center ;
    }
    button{
      width: 100px;
      font-size: 13px;
      border: none;
      background-color: transparent;
      color: #e55913;
    }
  }
  .login{
    margin: 30px 40px;
    height: 40px;
    background-color: orange;
    border-radius: 20px;
    line-height: 40px;
    color: white;
    text-align: center;
  }
</style>
