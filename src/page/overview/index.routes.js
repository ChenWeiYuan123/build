import Overview from './overview.vue';
import refund from './refund.vue';
import loan from './loan.vue';
export default {
    path: 'overview',
    component: Overview,
    children: [
        {
            path: 'refund',
            component: refund,
        },
        {
            path: 'loan',
            component: loan,
        },
    ]
}
