import Vue from 'vue';
import VueRouter from 'vue-router';
import 'lodash';
new Vue({
    el: '#app',
    data() {
        return {
            str: 'test123',
        }
    },
    render(h) {
        return h('h1', this.str);
    },
})