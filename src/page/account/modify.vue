<template>
    <div>
        <form>
            <div><label>id: </label><input type="text" disabled v-model="form.id" /></div>
            <div><label>name: </label><input type="text" v-model="form.name" /></div>
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
            id: this.$route.query.id,
        }
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.account.filter(item => item.id === this.id)[0]));
    },
    methods: {
        submit() {
            this.modify(this.form);
        },
    }
}
</script>
