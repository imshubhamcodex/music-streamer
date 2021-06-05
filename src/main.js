// import Vue from "vue";
// import App from "./App.vue";

import "./index.css";

import router from './router/router'

// Vue.config.productionTip = false;

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'

import '@/assets/css/style.css';

createApp(App).use(router).mount('#app')

// new Vue({
//   router,
//   render: (h) => h(App),
// }).$mount("#app");
