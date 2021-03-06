import Vue from 'vue'

require('vue-bootstrap-elements')

import window from './components/window.vue'
import windowEvents from './components/windowEvents.vue'
import multiWindow from './components/multiWindow.vue'
import WindowIconGenerate from './WindowIconGenerate.vue'

Vue.component('multiWindow', multiWindow)
Vue.component('windowEvents', windowEvents)
Vue.component('WindowIconGenerate', WindowIconGenerate)//*/

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    url_files: 'http://localhost/Stat/Data/',
    url_img: 'http://localhost/Stat/src/assets/Data/img',
    showOverlay: false
  },
})
