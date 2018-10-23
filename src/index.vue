<template>
    <div>
        <div class="nav">
            <router-link to="/account">Index</router-link>
            <router-link to="/set">Set Account</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
}
</script>
<style>
.nav {
    padding: 20px 0px;
}
</style>