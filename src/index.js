import Vue from 'vue';
// import 'lodash';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import routes from './route.js';
new Vue({
    // el: '#app',
    router: new VueRouter({
        routes,
    }),
}).$mount('#app');