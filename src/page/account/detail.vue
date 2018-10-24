<template>
    <div>
        <div class="operator">
            id: {{member.id}}
            name: {{member.name}}
            money: {{member.money}}
            desc: {{member.desc}}
        </div>
        <table border>
            <thead>
                <th v-for="item in headers" :key="item">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item">
                    <td>{{item.money}}</td>
                    <td>{{item.member}}</td>
                    <td>{{item.desc}}</td>
                    <td>{{item.date}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Bank from 'mixins/bank.js';
export default {
    mixins: [Bank],
    data() {
        return {
            headers: [
                'money',
                'member',
                'desc',
                'date',
            ],
            data: [],
            member: {},
            name: this.$route.query.name,
        }
    },
    created() {
        this.member = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.name)[0]));
        this.data = this.member.transfer;
    },
}
</script>
<style>
.operator{
    padding: 20px 0px;
}
.table{
    border: solid 1px #eee;
}
</style>
