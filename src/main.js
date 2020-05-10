// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import Print from 'vue-print-nb'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
// 引入树形下拉框
import wl from 'wl-vue-select'
import 'wl-vue-select/lib/wl-vue-select.css'
import WlExplorer from 'wl-explorer'
import 'wl-explorer/lib/wl-explorer.css'
// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
import Prism from 'prismjs'
import echarts from 'echarts'
import VCharts from 'v-charts'
Vue.use(ElementUI)
Vue.use(wl)
Vue.use(WlExplorer)
Prism.highlightAll()
Vue.config.productionTip = false

Vue.use(VCharts)
Vue.prototype.$echarts = echarts

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(Print)
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
