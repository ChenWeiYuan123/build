<template>
    <div>
        <p>Sum: {{sum}}</p>
        <p>personSum: {{personSum}}</p>
        <p>companySum: {{companySum}}</p>
        <p>Liability: {{liability}}</p>
        <p>ratio: {{ratio}}</p>
        <p>canLoadNum: {{canLoadNum}}</p>
        <div>
            <loan :canLoadNum="canLoadNum"></loan>
            <refund></refund>
        </div>
    </div>
</template>
<<script>
import Bank from 'mixins/bank.js';
import refund from './refund.vue';
import loan from './loan.vue';
export default {
    mixins: [Bank],
    components: {
        refund,
        loan,
    },
    data() {
        return {
            personSum: 0,
            companySum: 0,
            liability: 0,
            ratio: 0.5,
        }
    },
    computed: {
        sum() {
            return this.personSum + this.companySum;
        },
        canLoadNum() {
            return this.sum * this.ratio + this.liability;
        }
    },
    created() {
        this.personSum = this.person.reduce((init, item) => {
            init += parseInt(item.money);
            return init;
        }, 0);
        this.companySum = this.company.reduce((init, item) => {
            init += parseInt(item.money);
            return init;
        }, 0);
        this.liability = this.bankAccount.bank ? this.bankAccount.bank.money : 0;
    },
}
</script>
