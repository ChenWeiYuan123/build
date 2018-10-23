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
            json: localStorage.getItem('bank'),
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
    width: 600px;
    height: 200px;
}
</style>
