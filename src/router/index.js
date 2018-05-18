import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import IndexPage from '@/views/Index'
import NotFound from '@/views/404'
import Forbidden from '@/views/403'
import User from '@/views/User'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
        path: '/',
        component: Home,
        name: 'Vue',
        children: [
          { path: 'index', component: IndexPage, name: '首页' },
          { path: '404', component: NotFound, name: 'Page Not Found'},
          { path: '403', component: Forbidden, name: '权限不足'},
          { path: 'user', component: User, name: '用户管理'}
        ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
