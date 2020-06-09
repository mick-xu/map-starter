<template>
<div class="home">
    <router-link to="/supermap">SuperMap Cesium</router-link>
</div>
</template>

<script>



export default {
    name: 'Home',
    components: {
    },
    methods: {
    },
    mounted() {
    },
}
</script>

<style lang="less" scoped>
.home {
    padding: 16px;
    

    .canvas {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
}
</style>
