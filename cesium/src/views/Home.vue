<template>
<div class="home">
    <router-link class="link" to="/supermap">SuperMap Cesium</router-link>
    <router-link class="link" to="/cesium">Cesium</router-link>
</div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    methods: {},
    mounted() {},
}
</script>

<style lang="less" scoped>
.home {
    padding: 16px;
    display: flex;

    .link {
        flex: 1;
    }
}
</style>
