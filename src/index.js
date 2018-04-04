import Vue from 'vue'

import window from './components/window.vue'
import windowEvents from './components/windowEvents.vue'
import multiWindow from './components/multiWindow.vue'
import WindowIconGenerate from './WindowIconGenerate.vue'

Vue.component('multiWindow', multiWindow)
Vue.component('windowEvents', windowEvents)
Vue.component('WindowIconGenerate', WindowIconGenerate)