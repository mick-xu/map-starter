<template>
<div>
    <canvas id="threeContainer" class="canvas"></canvas>
</div>
</template>

<script>
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
    name: 'ThreeJs',
    methods: {
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
            this.renderThree()
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
    mounted () {
        this.initThree();
    },
}
</script>

<style lang="less" scoped>

</style>
