import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

/**
 * author：李茂源
 * time：2019-04-23
 * description：封装了网络请求方法，通过vuex即可调用请求后的数据
 */
Vue.use(Vuex)

const store = new Vuex.Store({
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
    ajax (context, data) {
      axios.get(data.url, context.state.text)
        .then(res => { // 调用接口
          console.log(res.data)
          context.commit('changeData', res.data) // 通过接口获取的后台数据保存到store中，等待组件取用
        }).catch(error => {
          console.log(error)
        })
    }
  }
})
export default store
