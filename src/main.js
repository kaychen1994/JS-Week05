import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // 驗證規則
import zhTW from './zh_TW.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import App from './App.vue'
import router from './router'

Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.use(VueAxios, axios)

Object.keys(rules).forEach((rule) => { // 驗證規則
  extend(rule, rules[rule])
})

configure({ // 驗證樣式
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('tw', zhTW)

window.$ = $

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
