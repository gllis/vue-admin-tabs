import Vue from 'vue';
import Vuex from 'vuex';
import menu from './modules/menu'
import users from './modules/users'

Vue.use(Vuex);

/**
 * Vuex全局状态管理
 * @param options {Array} 用于渲染tabs的数组
 */
const store = new Vuex.Store({
	state: {
		options: [],
		activeIndex: '/',
	},
	modules: {
        menu,
        users
	},
	mutations: {
		// 添加tabs
		add_tabs(state, data) {
            let has = false;
            this.state.options.forEach(v => {
                if (v.name == data.name) {
                    has = true;
                    return;
                }
            })
            if (!has) {
                this.state.options.push(data);
            }
		},
		// 删除tabs
		delete_tabs(state, route) {
			let index = 0;
			for (let option of state.options) {
				if (option.route === route) {
					break;
				}
				index++;
			}
			this.state.options.splice(index, 1);
		},
		// 设置当前激活的tab
		set_active_index(state, index) {
			this.state.activeIndex = index;
		},
		set_width(state, w) {
			this.state.contentWidth = w;
		}
	}
});


export default store;