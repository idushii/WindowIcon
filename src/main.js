import Vue from 'vue'
import App from './App.vue'
import index from './index.vue'
import multiWindow from './components/multiWindow.vue'
import windowEvents from './components/windowEvents.vue'
import window from './components/window.vue'

require('vue-bootstrap-elements')
Vue.component('index', index)
Vue.component('multiWindow', multiWindow)
Vue.component('windowEvents', windowEvents)

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    url_files: 'http://localhost/Stat/Data/',
    url_img: 'http://localhost/Stat/src/assets/Data/img',
    showOverlay: false
  },
})
