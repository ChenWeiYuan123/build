<template>
    <div>
        <div class="nav">
            <router-link to="/overview">Overview</router-link>
            <router-link to="/bank">Bank</router-link>
            <router-link to="/account?type=person">Person</router-link>
            <router-link to="/account?type=company">Company</router-link>
            <router-link to="/bid">bid</router-link>
            <router-link to="/war">War</router-link>
            <router-link to="/select">Select</router-link>
            <router-link to="/storage">Storage</router-link>
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
