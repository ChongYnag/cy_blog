import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

const store = new Vuex.Store({
	state:{
		getUrl:"http://127.0.0.1:3000",
	},
	actions,
	getters,
	mutations,
});
export default store;