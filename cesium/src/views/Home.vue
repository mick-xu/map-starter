<template>
<div class="home">
    <div id="cesiumContainer"></div>
    <canvas id="threeContainer" class="canvas"></canvas>
</div>
</template>

<script>
let viewer;
const niaoChaoMap = "http://www.supermapol.com/realspace/services/3D-niaocao_water/rest/realspace";
const superMapwgs = "http://www.supermapol.com/realspace/services/map-World/rest/maps/World_Google";

import * as THREE from 'three';
import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader';
import {
    OBJLoader2
} from 'three/examples/jsm/loaders/OBJLoader2';
import {
    MTLLoader
} from 'three/examples/jsm/loaders/MTLLoader';
import {
    DDSLoader
} from 'three/examples/jsm/loaders/DDSLoader';
import {
    OBJLoader2Parallel
} from 'three/examples/jsm/loaders/OBJLoader2Parallel';
import {
    MtlObjBridge
} from 'three/examples/jsm/loaders/obj2/bridge/MtlObjBridge';
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls";
let renderer, scene, camera;
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
        initThree() {
            const canvas = document.querySelector('#threeContainer');
            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true
            });
            renderer.setSize(canvas.clientWidth, canvas.clientHeight)

            camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
            camera.position.set(0, 10, 30)

            let controls = new OrbitControls(camera, canvas);
            controls.target.set(0, 5, 0);
            //controls.update();

            scene = new THREE.Scene();

            const light = new THREE.DirectionalLight(0xffffff, 1.5);
            light.position.set(0, 5, 8)
            light.target.position.set(0, 5, 0)
            scene.add(light)
            scene.add(light.target)

            const lightBack = new THREE.DirectionalLight(0xffffff, 1.5);
            lightBack.position.set(0, 0, -8)
            scene.add(lightBack)

            const ambientLight = new THREE.AmbientLight(0x404040, 1);
            scene.add(ambientLight);

            let manager = new THREE.LoadingManager();
            manager.addHandler(/\.dds$/i, new DDSLoader())

            new MTLLoader(manager).setPath('./obj/').load('xiyangyang.mtl', mtlParseResult => {
                mtlParseResult.preload();
                const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
                materials.Material__27.side = THREE.DoubleSide
                let objLoader = new OBJLoader2();
                objLoader.setModelName("xiyangyang")
                objLoader.addMaterials(materials, true);
                objLoader.load('./obj/xiyangyang.obj', (object3d) => {
                    object3d.position.y = -10;
                    scene.add(object3d)
                })
            })

            renderer.render(scene, camera)
            requestAnimationFrame(this.render)
        },
        render() {
            requestAnimationFrame(this.render);
            this.renderCesium()
            this.renderThree()
        },
        renderCesium() {
            viewer.render();
        },
        renderThree() {
            if (this.resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            camera.fov = Cesium.Math.toDegrees(viewer.camera.frustum.fovy * 3)
            camera.updateProjectionMatrix();
            renderer.render(scene, camera)
        },
        resizeRendererToDisplaySize(renderer) {
            const canvas = renderer.domElement;
            const pixelRatio = window.devicePixelRatio;
            const width = canvas.clientWidth * pixelRatio | 0;
            const height = canvas.clientHeight * pixelRatio | 0;
            const needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }
    },
    mounted() {
        this.onload();
        this.initThree()
    },
}
</script>

<style lang="less" scoped>
.home {
    width: 100vw;
    height: 100vh;
    position: relative;

    #cesiumContainer {
        width: 100vw;
        height: 100vh;
    }

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
