<template>
    <div class="loan">
        <form>
            Refund
            <div>
                <label>Type: </label>
                <input type="radio" id="person1" value="person" v-model="loanType" />
                <label for="person1">person:</label>
                <input type="radio" id="company1" value="company" v-model="loanType" />
                <label for="company1">company</label>
            </div>
            <div>
                <label>Member: </label>
                <select v-model="form.member">
                    <option v-for="item in bankAccount[loanType]" :key="item">{{item.name}}</option>
                </select>
            </div>
            <div><label>money: </label><input type="text" v-model="form.money" /></div>
            <button @click="submit">submit</button>
        </form>
    </div>
</template>
<script>
import Bank from 'mixins/bank.js';
export default {
    mixins: [Bank],
    props: ['canLoadNum'],
    data() {
        return {
            loanType: 'person',
            form: {
                money: '',
                member: '',
            },
            member: {},
        }
    },
    watch: {
        'form.member'(name){
            this.member = JSON.parse(JSON.stringify(this.bankAccount[this.loanType].filter(item => item.name === this.form.member)[0]));
        }
    },
    methods: {
        submit() {
            if(!this.member || !this.form.member) {
                window.alert('undefined');
                return;
            }
            this.addMoney(this.member, '-' + this.form.money);
            const transfer = {
                date: this.getDate(),
                member: 'bank',
                money: '-' + this.form.money,
                desc: '==Refund==',
            };
            this.addTransfer(this.member, transfer);
            this.modify(this.member, this.loanType);
            if(!this.bankAccount.bank){
                this.bankAccount.bank = {
                    money: 0,
                    transfer: [],
                }
            };
            this.addMoney(this.bankAccount.bank, this.form.money);
            const bankTransfer = {
                date: this.getDate(),
                member: this.member.name,
                money: this.form.money,
                desc: '==Refund==',
            };
            this.addTransfer(this.bankAccount.bank, bankTransfer);
            this.save();
        },
    }
}
</script>
<style>
.loan{
    padding: 20px 10px;
    border: solid 1px #eee;
}
</style>

