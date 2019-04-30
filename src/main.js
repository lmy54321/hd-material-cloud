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
// 使用路由钩子函数判断是否登录
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
    next()//  继续进行管道中的下一个钩子函数
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
