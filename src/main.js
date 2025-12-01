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
  faEye,
  faEyeSlash,
  faSignOut,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { faUser, faClock, faUserAlt } from '@fortawesome/free-regular-svg-icons'

library.add(
  faUser,
  faPlusSquare,
  faSearch,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faChevronLeft,
  faChevronRight,
  faEye,
  faEyeSlash,
  faSignOut,
  faUserAlt,
  faAngleLeft,
  faAngleRight,
)

import VueCookies from 'vue-cookies'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(VueCookies)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
