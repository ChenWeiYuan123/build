<template>
    <div class="war-wrapper">
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
}
</script>
<style>
.war-wrapper {
    width: 100%;
}
.left {
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid red;
    /* background: #f66; */
}
.right {
    float: right;
    width: 50%;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid blue;
    /* background: #66f; */
}
</style>