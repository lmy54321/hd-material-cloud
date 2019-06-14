import http from './http'
import store from '.././store'

let context = null

let url = {
  initContext (vue) {
    context = vue
  }
}

const ApiUrl = {
  login: ' '
}

function createPost (url) {
  /**
   * 如果有三个参数，则分别是请求参数，成功回调，失败回调（成功回调总是在失败回调的前一个参数）
   * 一个参数，则必是成功回调
   * 两个参数，第一个如果是函数则是回调，第二个是失败回调
   * 两个参数，第一个如果是请求参数，则第二个是成功回调
   */
  return function (params1, params2, params3) {
    let data = typeof params1 === 'object' ? params1 : {}
    let header = {}
    if (store.state.userInfo.token !== '') {
      header = {
        token: store.state.userInfo.token,
        secret: store.state.userInfo.secret
      }
    }

    http.post(store.state.api + url, data, header, 5000).then(res => {
      if (typeof params1 === 'function') {
        if (res.code === '010') {
           params1(res.data)
        } else {
          // if (res.code == '401')
          //   context.$router.push({path: "/login"});
          // //如果是错误的，则data里边保存错误，例如登录失败的错误次数
          // else {
          //   params2 && params2(res.data);
          //   context.$toast({content: res.message, position: 'middle'});
          // }
          params2 && params2(res.data)
          context.$toast({content: res.message, position: 'middle'})
        }
      } else if (typeof params2 === 'function') {
        if (res.code === '010') {
          params2(res.data)
        } else {
          // if (res.code == '401')
          //   context.$router.push({path: "/login"});
          // //如果是错误的，则data里边保存错误，例如登录失败的错误次数
          // else {
          //   params3 && params3(res.data);
          //   context.$toast({content: res.message, position: 'middle'});
          // }
          params3 && params3(res.data)
          context.$toast({content: res.message, position: 'middle'})
        }
      }
    }).catch((err) => {
      console.log(err)
      context.$toast({content: '请求超时，请稍后再试', position: 'middle'})
      // 在第一个参数是函数，第二个参数是函数的情况下，则第二个是失败回调
      if (typeof params1 === 'function' && params2 && typeof params2 === 'function') {
        params2()
       // 在第一个参数不是函数时，则第二个是成功回调，判断第三个
      } else if (params3 && typeof params3 === 'function') {
        params3()
      }
    })
  }
}

for (let item in ApiUrl) {
  url[item] = createPost(ApiUrl[item])
}

export default url
