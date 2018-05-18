import api from '../../api'
import { resolve } from 'path';
import { rejects } from 'assert';
const state = {
    obj: {
        users: [],
        total: 0
    },
    loading: true
}

const getters = {
    users: state => state.obj.users,
    total: state => state.obj.total,
    loading: state => state.loading
}   

const actions = { 
    getUsers({ commit, state }, para) {
        state.loading = true;
        api.users(para).then((v) => {
            state.obj = v.data;
            state.loading = false;
        });
    },
    removeUser({ dispatch, commit, state}, para) {
        api.removeUser(para).then( v => {
            dispatch('getUsers', { page: 1 });
        })
    },
    batchRemoveUser({dispatch, commit, state}, para) {
        api.batchremoveUsers(para).then( v => {
            dispatch('getUsers', { page: 1 });
        })
    }
    
}

export default {
    namespaced: true,
	state,
	getters,
	actions
};