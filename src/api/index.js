import axios from 'axios';

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8080/';

export default {
    /**
     * 用户登录
     */
    login(params) {
        return axios.post('/user/login', params)
    },
    logout(params) {
        return axios.post('/user/logout', params)
    },
    menus(params) {
        return axios.post('/menus')
    },
    users(params) {
        return axios.post('/user/listpage',params)
    },
    removeUser(params) {
        return axios.get('/user/remove', {params: params});
    },
    batchremoveUsers(params) {
        return axios.get('/user/batchremove', {params: params})
    }
}