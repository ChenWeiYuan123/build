<template>
    <div>
        <form>
            <label>From: </label>{{this.fromMember.name}}<br>
            <label>Rest: </label>{{this.fromMember.money}}
            <div>
                <label>Type: </label>
                <input type="radio" id="person" value="person" v-model="transferType" />
                <label for="person">person:</label>
                <input type="radio" id="company" value="company" v-model="transferType" />
                <label for="company">company</label>
            </div>
            <div>
                <label>Member: </label>
                <!-- <input type="text" v-model="form.member" /> -->
                <select v-model="form.member">
                    <option v-for="item in bankAccount[transferType]" :key="item">{{item.name}}</option>
                </select>
            </div>
            <div>
                <label>Money: </label>
                <input type="text" v-model="form.money" />
            </div>
            <div>
                <label>Desc: </label>
                <input type="text" v-model="form.desc" />
            </div>
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
            transferType: 'person',
            picked: '',
            form: {
                member: '',
                money: '',
                desc: '',
            },
            name: this.$route.query.name,
            fromMember: {
                name:'',
                money:'',
            },
        }
    },
    created() {
        this.fromMember = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.name)[0]));
    },
    methods: {
        submit() {
            const money = Number(this.form.money);
            if(Number(this.fromMember.money) < money) {
                window.alert('not enought money!')
            } else {
                this.toMember = JSON.parse(JSON.stringify(this.bankAccount[this.transferType].filter(item => item.name === this.form.member)[0]));
                const date = (new Date()).toLocaleString();
                this.form.date = date;
                const fromTransfer = JSON.parse(JSON.stringify(this.form));
                const toTransfer = JSON.parse(JSON.stringify(this.form));
                fromTransfer.money = '-' + this.form.money;
                toTransfer.member = this.fromMember.name;
                this.toMember.money = Number(this.toMember.money) + money;
                this.toMember.transfer ? this.toMember.transfer.push(toTransfer) : [toTransfer];
                this.fromMember.money = Number(this.fromMember.money) - money;
                this.fromMember.transfer ? this.fromMember.transfer.push(fromTransfer) : [fromTransfer];
                this.modify(this.fromMember);
                this.modify(this.toMember, this.transferType);
            }
        }
    }
}
</script>
