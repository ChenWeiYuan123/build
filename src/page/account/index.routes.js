import List from './list.vue';
import Add from './add.vue';
import Modify from './modify.vue';
import Transfer from './transfer.vue';
import Deposit from './deposit.vue';
import Withdraw from './withdraw.vue';
const wrapper = { template: '<div><router-view></router-view></div>' };
export default {
    path: '/account',
    component: wrapper,
    redirect: '/account/list',
    children: [
        {
            path: 'list',
            component: List,
        },
        {
            path: 'add',
            component: Add,
        },
        {
            path: 'modify',
            component: Modify,
        },
        {
            path: 'transfer',
            component: Transfer,
        },
        {
            path: 'deposit',
            component: Deposit,
        },
        {
            path: 'withdraw',
            component: Withdraw,
        },
    ]
}
