import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const store = new Vuex.Store({
	state:{
		getUrl:"http://127.0.0.1:3000",
    isLogin:false, //登录信息 默认是未登录
		// getUrl:"http://127.0.0.1:3000",
    scrollWin(objData, _this) {
      $(window).unbind("scroll").on("scroll", function() {
        switch (_this.$route.path) {
          case '/picture':
            objData();
            break;
          case '/articles':
            objData(_this);
            break;
        }
      });
    },
	},

	actions,
	getters,
	mutations,
});
export default store;
