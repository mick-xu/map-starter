<template>
<div class="home">
    <div id="cesiumContainer"></div>
</div>
</template>

<script>
let viewer;
const niaoChaoMap = "http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace";
const superMapwgs = "http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google"

export default {
    name: 'Home',
    components: {

    },
    methods: {
        onload() {
            viewer = new Cesium.Viewer('cesiumContainer');
            viewer.imageryLayers.addImageryProvider(new Cesium.SuperMapImageryProvider({
                url: superMapwgs
            }));
            var scene = viewer.scene;
            scene.globe.depthTestAgainstTerrain = false;
            var camera = scene.camera;
            var promise = scene.open(niaoChaoMap);
            Cesium.when(promise, function (layers) {
                camera.setView({
                    destination: new Cesium.Cartesian3.fromDegrees(116.38621009526075, 39.98468016277832, 313.2286367219722),
                    orientation: {
                        heading: 6.116051,
                        pitch: -0.275007,
                        roll: 6.283185
                    }
                });

                init();
            });
        },
        init() {

        }
    },
    mounted() {
        this.onload();
    },
}
</script>

<style lang="less" scoped>
.home {
    width: 100vw;
    height: 100vh;
}
</style>
