<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    created() {
        window.$bank = JSON.parse(localStorage.getItem('bank'));
    },
}
</script>
<style module>
</style>