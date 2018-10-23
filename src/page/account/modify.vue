<template>
    <div>
        <button @click="back">back</button>
        <form>
            <div><label>name: </label><input type="text" disabled v-model="form.name" /></div>
            <div><label>money: </label><input type="text" v-model="form.money" /></div>
            <div><label>desc: </label><input type="text" v-model="form.desc" /></div>
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
            form: {},
            name: this.$route.query.name,
        }
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.account.filter(item => item.name === this.name)[0]));
    },
    methods: {
        back() {
            this.$router.push({path: '/account'});
        },
        submit() {
            this.modify(this.form);
        },
    }
}
</script>