import Vue from 'vue'
import App from './App.vue'
import editOneWindow from './Pages/editOneWindow.vue'
import editPhoneOneWindow from './Pages/editPhoneOneWindow.vue'
import window from './components/window.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import axios from 'axios'

require('vue-bootstrap-elements')
Vue.component('window', window)

let routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/one/phone'
  },
  {
    path: '/one',
    name: 'editOneWindow',
    component: editOneWindow
  },
  {
    path: '/one/phone',
    name: 'editPhoneOneWindow',
    component: editPhoneOneWindow
  }
]

const router = new VueRouter({
  routes // сокращение от `routes: routes`
})

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    url_files: 'http://localhost/Stat/Data/',
    url_img: 'http://localhost/Stat/src/assets/Data/img'
  },
  router
})
