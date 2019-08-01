import Vue from 'vue'
import App from './App'
// import './utils/gio-minp/index'
import gio from './utils/gio-minp/index'
gio('send', {})
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
