<template>
    <div>
        <div class="operator">
            money: {{bankAccount.bank.money}}
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
        }
    },
    created() {
        const reverseList = _.cloneDeep(this.bankAccount.bank.transfer);
        reverseList.reverse();
        this.data = reverseList;
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
