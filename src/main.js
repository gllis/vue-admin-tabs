// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Mock from './mock';
Vue.use(Element, { size: 'small' })

Vue.config.productionTip = false

Mock.bootstrap();

router.beforeEach((to, from, next) => {
    NProgress.start();
    console.info(to.path)
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }

    if (to.path == '/') {
        next({ path: 'index' });
    }
  
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
      next({ path: 'login' });
    } else {
      next();
    };
});
router.afterEach(()=>{
    NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
