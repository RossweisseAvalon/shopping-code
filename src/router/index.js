import Vue from 'vue'
import VueRouter from 'vue-router'
// 如果导入的是index开头的文件只需要 / 到文件夹
import layout from '@/views/layout'
import home from '@/views/layout/home'
import category from '@/views/layout/category'
import cart from '@/views/layout/cart'
import user from '@/views/layout/user'

import store from '@/store'

const login = () => import('@/views/login')
const myorder = () => import('@/views/myorder')
const pay = () => import('@/views/pay')
const prodetail = () => import('@/views/prodetail')
const search = () => import('@/views/search')
const searchList = () => import('@/views/search/list')
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        { path: '/home', component: home },
        { path: '/category', component: category },
        { path: '/cart', component: cart },
        { path: '/user', component: user }
      ]
    },
    { path: '/login', component: login },
    { path: '/myorder', component: myorder },
    { path: '/pay', component: pay },
    // 动态路由传参，确认是哪一个商品，路由参数中携带 id
    { path: '/prodetail/:id', component: prodetail },
    { path: '/search', component: search },
    { path: '/searchlist', component: searchList }
  ]
})

// 所有的路由在真正被访问之前都会经过全局前置守卫
// 只有全局前置守卫放行了，才会到达对应的页面
// 全局前置守卫
// to:  到哪里去，到哪去的完整信息对象 (路径，参数)
// from:从哪里来，从哪来的完整信息对象 (路径，参数)
// next():是否放行
// (1)next() 直接放行
// (2)next(路径) 进行拦截，拦截到next里面的配置的路劲

// 定义一个数组存放需要权限才能访问的路劲
const authUrls = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  // 判断 to.path（当前正访问的页面路径）在不在需要权限才能访问的 authUrls 中
  if (!authUrls.includes(to.path)) {
    // 非权限页面，直接放行
    next()
    return
  }
  // 是权限页面，需判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
