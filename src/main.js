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
import Viewer from 'v-viewer'// 图片预览
import 'viewerjs/dist/viewer.css'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
// 图片预览插件
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }})
Viewer.setDefaults({
  Options: {
    'inline': true, // 启用 inline 模式
    'button': true, // 显示右上角关闭按钮
    'navbar': true, // 显示缩略图导航
    'title': true, // 显示当前图片的标题
    'toolbar': true, // 显示工具栏
    'tooltip': true, // 显示缩放百分比
    'movable': true, // 图片是否可移动
    'zoomable': true, // 图片是否可缩放
    'rotatable': true, // 图片是否可旋转
    'scalable': true, // 图片是否可翻转
    'transition': true, // 使用 CSS3 过度
    'fullscreen': true, // 播放时是否全屏
    'keyboard': true, // 是否支持键盘
    'url': 'data-source' // 设置大图片的 url
  }
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
