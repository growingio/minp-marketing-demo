import Vue from 'vue'

const gio = require('./utils/gio-minp/index').default;
const gioConfig = require('./utils/gio-minp/gioConfig').default;
gio('setConfig', gioConfig);

import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
