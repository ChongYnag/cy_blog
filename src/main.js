import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import store from './store'
import marked from 'marked'
Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.prototype.$http = axios;

//marked编辑器的基本配置
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  sanitize: true,
});
//将marked继承到全局
Vue.prototype.marked = marked;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
