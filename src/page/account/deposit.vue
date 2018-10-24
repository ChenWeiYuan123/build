<template>
    <div>
        <form>
            <div><label>id: </label>{{member.id}}</div>
            <div><label>name: </label>{{member.name}}</div>
            <div><label>desc: </label>{{member.desc}}</div>
            <div><label>money: </label>{{member.money}}</div>
            <div><label>deposit: </label><input type="text" v-model="form.money" /></div>
            <button @click="submit">submit</button>
        </form>
    </div>
</template>
<script>
import Bank from 'mixins/bank.js';
export default {
    mixins: [Bank],
    data() {
        return {
            member: {},
            name: this.$route.query.name,
            form: {
                money: '',
            }
        }
    },
    created() {
        this.member = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.name)[0]));
    },
    methods: {
        submit() {
            this.addMoney(this.member, this.form.money);
            const transfer = {
                date: this.getDate(),
                member: '==Cash==',
                money: this.form.money,
                desc: '==Deposit==',
            };
            this.addTransfer(this.member, transfer);
            this.modify(this.member);
        },
    }
}
</script>
