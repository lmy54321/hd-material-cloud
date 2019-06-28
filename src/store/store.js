import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
/**
 * author：李茂源
 * time：2019-04-23
 * description：封装了网络请求方法，通过vuex即可调用请求后的数据
 */
Vue.use(Vuex)
let token = localStorage.getItem('token')
// 设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['token'] = token
axios.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
var store = new Vuex.Store({
  // 初始化数据，只要有可能的用到的最好都初始化
  state: {
    text: {name: '李茂源'},
    data: {sex: '男', age: '22'}
  },
  mutations: {
    // store中的数据只能通过commit mutation来改变
    changeData (state, obj) {
      state.data = obj
    }
  },
  actions: {
    // 封装一个ajax方法 ，data里为action以荷载方式分发时传的参数
    ajaxPost (context, data) {
      axios.post(data.url, data.submitData)
        .then(res => { // 调用接口
          data.success(res.data)
          console.log(res.data)
          context.commit('changeData', res.data) // 通过接口获取的后台数据保存到store中，等待组件取用
        }).catch(error => {
          console.log(error)
        })
    },
    ajaxGet (context, data) {
      console.log(data.submitData)
      axios.get(data.url, data.submitData)
        .then(res => { // 调用接口
          data.success(res.data)
          console.log(res.data)
          context.commit('changeData', res.data) // 通过接口获取的后台数据保存到store中，等待组件取用
        }).catch(error => {
        console.log(error)
      })
    },
    ajaxDelete (context, data) {
      axios.delete(data.url, data.submitData)
        .then(res => { // 调用接口
          data.success(res.data)
          console.log(res.data)
          context.commit('changeData', res.data) // 通过接口获取的后台数据保存到store中，等待组件取用
        }).catch(error => {
        console.log(error)
      })
    },
    ajaxPatch (context, data) {
      axios.patch(data.url, data.submitData)
        .then(res => { // 调用接口
          data.success(res.data)
          console.log(res.data)
          context.commit('changeData', res.data) // 通过接口获取的后台数据保存到store中，等待组件取用
        }).catch(error => {
        console.log(error)
      })
    }
  }
})
export default store
