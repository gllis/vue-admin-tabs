import api from '../../api'
const state = {
    menus: []
}

const getters = {
    menus: state => state.menus
}   

const actions = { 
    getMenus({ commit, state }, para) {
		api.menus().then((value) => {
			state.menus = value.data;
		});
	}
}

export default {
    namespaced: true,
	state,
	getters,
	actions
};