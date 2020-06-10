<template>
<div class="container">
    <div id="cesiumContainer"></div>
</div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css"
import * as Cesium from "cesium/Source/Cesium.js";
let viewer;
export default {
    name: "Cesium",
    methods: {
        init() {
            //Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjMTNjMTdkNS03ZDM1LTQ0NjMtODQ4Mi00YmE2NDc1YWRmZjAiLCJpZCI6Mjg5NTksInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyIsInByIl0sImlhdCI6MTU5MTY5MzY2NX0.DmdsRRSFCcsHVKnbLSvClwk2HIAQzjeg4wzXJAjFkXk'
            viewer = new Cesium.Viewer('cesiumContainer', {
                geocoder: false,
                homeButton: false,
                sceneModePicker: false,
                baseLayerPicker: false,
                navigationHelpButton: false,
                animation: false,
                //creditContainer: 'credit',
                timeline: false,
                fullscreenButton: false,
                vrButton: false,
                shouldAnimate: true,
                terrainProvider: Cesium.createWorldTerrain()
            })

            viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
                url: 'http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}&ltype=12'
            }))

            // var tileset = new Cesium.Cesium3DTileset({
            //     url: 'http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace'
            // });

            // viewer.scene.primitives.add(tileset);
            // viewer.zoomTo(tileset);

            viewer.scene.camera.setView({
                destination: Cesium.Cartesian3.fromDegrees(117.13695602111343, 36.658375636062694, 313.2286367219722),
                orientation: {
                    heading: 6.116051,
                    pitch: -0.275007,
                    roll: 6.283185
                }
            });

            let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(117.13521490152876, 36.66775176730122, 0.0));
            let model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
                url: './obj/tower/scene.gltf',
                modelMatrix: modelMatrix,
                scale: 10.0
            }));

            viewer.scene.primitives.add(Cesium.Model.fromGltf({
                url: './obj/olive_tree/scene.gltf',
                modelMatrix: Cesium.Transforms.eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(117.13836490152876, 36.66775176730122, 0.0)),
                scale: 10.0
            }));

            let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            handler.setInputAction((event) => {
                const earthPosition = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);
                if (Cesium.defined(earthPosition)) {
                    const cartographic = Cesium.Cartographic.fromCartesian(earthPosition, viewer.scene.globe.ellipsoid, new Cesium.Cartographic());
                    const lat = Cesium.Math.toDegrees(cartographic.latitude);
                    const lng = Cesium.Math.toDegrees(cartographic.longitude);
                    const height = cartographic.height;
                    console.log([lng, lat, height])
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },
        flyTo() {
            viewer.scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(116.38621009526075, 39.98468016277832, 313.2286367219722),
                orientation: {
                    heading: 60,
                    pitch: 0,
                    roll: 0
                },
                duration: 1
            })
        }
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="less" scoped>
.container {
    height: 100vh;

    #cesiumContainer {
        height: inherit;
    }
}
</style>
