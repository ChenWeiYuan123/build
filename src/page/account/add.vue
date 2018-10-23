<template>
    <div>
        <button @click="back">back</button>
        <form>
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
            form: {
                name: '',
                money: '',
                desc: '',
                transfer: [],
            }
        }
    },
    methods: {
        back() {
            this.$router.push({path: '/account'});
        },
        submit() {
            if(this.members.includes(this.form.name)) {
                window.alert('repeat name!')
            } else {
                this.form.id = this.members.length + 1;
                this.add(this.form);
            }
        },
    }
}
</script>