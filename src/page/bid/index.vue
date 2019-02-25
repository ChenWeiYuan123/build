<template>
    <div>
        r1<input type="number" v-model="r1">
        r2<input type="number" v-model="r2">
        <button @click="start">start</button>
        <p>random:{{random}} mid:{{mid}} result: {{result}}</p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            result: '',
            random:0,
            mid:0,
            r1:0,
            r2:0,
        }
    },
    methods: {
        start(){
            this.random = Math.random().toFixed(3);
            this.mid = (this.r1/((+this.r1)+(+this.r2))).toFixed(3);
            if(this.random>this.mid)
                this.result = 'r2';
            else
                this.result = 'r1';
        }
    }
}
</script>
<style>

</style>
