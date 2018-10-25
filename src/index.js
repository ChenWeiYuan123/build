import Vue from 'vue';
import 'lodash';
import './css/base.css';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './route';
new Vue({
    // el: '#app',
    router: new VueRouter({
        routes,
    }),
}).$mount('#app');
