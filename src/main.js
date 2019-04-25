// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import './assets/css/icon.css'
import './assets/fonts/iconfont.css'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
/* eslint-disable no-new */
// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'admin' ? next() : next('/403')
  } else {
    next()
  }
})
// 注册内容
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
