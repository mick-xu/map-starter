<template>
<div id="app">
    <router-view />
</div>
</template>

<style lang="less">
html,
body {
    margin: 0;
    height: 100%;
}

#app {
    width: 100vw;
    height: 100vh;
}

.cesium-viewer-bottom,
.cesium-viewer-zoomIndicatorContainer {
    display: none !important;
}
</style>
