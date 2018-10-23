<template>
    <div>
        <form>
            <label>From: </label>{{this.name}}<br>
            <label>Rest: </label>{{this.member.money}}
            <div>
                <label>Member: </label>
                <select>
                    <option v-for="member in members" :value="member">{{member}}</option>
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
            form: {
                member: '',
                money: '',
                desc: '',
            },
            name: this.$route.query.name,
            member: {},
        }
    },
    created() {
        this.member = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.name)[0]));
    },
    submit() {
        // const money = parseInt(this.form.money);

        this.toMember = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.form.name)[0]));
        const date = (new Date()).toLocaleString();
        this.form.date = date;
        const fromTransfer = JSON.parse(JSON.stringify(this.form));
        const toTransfer = JSON.parse(JSON.stringify(this.form));
        fromTransfer.money = '-' + this.form.money;
        toTransfer.member = this.member.name;
        debugger
        // this.member.transfer.push(transfer);
        // this.modify(this.member);
    }
}
</script>