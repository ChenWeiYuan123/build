<template>
    <div>
        <div class="operator">
            <button @click="save">Save</button>
        </div>
        <table border>
            <thead>
                <th v-for="item in headers" :key="item">{{item}}</th>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item">
                    <td>{{item.name}}</td>
                    <td>{{item.money}}</td>
                    <td>
                        <ul>
                            <li v-for="log in showTransfer(item.transfer)">{{log}}</li>
                        </ul>
                        <router-link v-if="item.transfer.length > 5" to="/">More</router-link>
                    </td>
                    <td><router-link to="/">Go to Foo</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: [
                'name',
                'money',
                'transfer',
                'operator'
            ],
            data: window.$bank.account,
        }
    },
    methods: {
        save() {
            const json = JSON.stringify({ account: this.data });
            localStorage.setItem('bank', json );
        },
        showTransfer(list) {
            let str = list.map(item => `${item.money} -> ${item.to}(${item.desc}/${item.date})`);
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