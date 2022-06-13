import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
import axios from "axios";
axios.defaults.baseURL='http://1.116.189.219:8000'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
