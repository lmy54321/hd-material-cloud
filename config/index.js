'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
   //  proxyTable: {},

    // Various Dev Server settings
    host: '192.168.1.152', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //配置转化：从3000 => 8080
    //模拟数据配的的代理服务器
    proxyTable:{
      '/api':'http://localhost:3000/',
      // 供应商申请
      '/supplierUrl': {
        target: 'http://192.168.1.102:7001/supplier', //源地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/supplierUrl': '' //路径重写
        }
      },
      // 资源服务模块
      '/resourceUrl': {
        target: 'http://192.168.1.102:7001/resource', //源地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/resourceUrl': '' //路径重写
        }
      },
      // 用户登录
      '/LoginUrl': {
        target: 'http://192.168.1.102:7001/user', //源地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/LoginUrl': '' //路径重写
        }
      },
      '/tenderingUrl': {
        target: 'http://192.168.1.102:7001/tendering', //源地址
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/tenderingUrl': '' //路径重写
        }
      }
    },

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
