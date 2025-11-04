import './assets/main.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlusSquare,
  faSearch,
  faMapMarkerAlt,
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons'

library.add(
  faUser,
  faPlusSquare,
  faSearch,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faChevronLeft,
  faChevronRight,
)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
