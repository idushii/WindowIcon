import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'

new Vue({
  el: '#app',
  render: h => h(App),
  data: {
    url_files: 'http://localhost/Stat/Data/',
    url_img: 'http://localhost/Stat/src/assets/Data/img'
  }
})
