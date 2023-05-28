import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faXmark, faUser, faEye } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faXmark, faUser, faEye);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')

import "bootstrap/dist/js/bootstrap.js"
