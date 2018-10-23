<template>
    <div>
        <div class="operator">
            <button @click="save">Save</button>
            <button @click="toAdd">Add</button>
        </div>
        <table border>
            <thead>
                <th v-for="item in headers" :key="item">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in account" :key="item">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.money}}</td>
                    <td>
                        <template v-if="item.transfer">
                            <ul>
                                <li v-for="log in showTransfer(item.transfer)">{{log}}</li>
                            </ul>
                            <router-link v-if="item.transfer.length > 5" to="/">More</router-link>
                        </template>
                    </td>
                    <td>
                        <router-link :to="{path: 'modify', query: {name: item.name}}">Modify</router-link>
                        <router-link :to="{path: 'transfer', query: {name: item.name}}">Transfer</router-link>
                        <a @click="deleteItem(item)">Delete</a>
                    </td>
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
                'id',
                'name',
                'money',
                'transfer',
                'operator'
            ],
        }
    },
    methods: {
        toAdd() {
            this.$router.push({path: '/account/add'});
        },
        deleteItem(item) {
            this.deleteMember(item);
        },
        showTransfer(list) {
            let str = list.map(item => `${item.money} -> ${item.member}(${item.desc}/${item.date})`);
            str = str.slice(0, 5);
            return str;
        }
    }
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