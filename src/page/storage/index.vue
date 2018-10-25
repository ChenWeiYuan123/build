<template>
    <div>
        <textarea class="textarea" v-model="json"></textarea>
        <br>
        <button @click="save">save</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            json: JSON.stringify(JSON.parse(localStorage.getItem('bank')),2,2),
        }
    },
    methods: {
        save() {
            localStorage.setItem('bank', this.json );
            location.reload();
        },
    },
}
</script>
<style>
.textarea{
    width: 1000px;
    height: 500px;
}
</style>
