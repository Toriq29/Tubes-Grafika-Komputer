import * as THREE from '../node_modules/three/build/three.module.js'
import * as pointerLock from '../node_modules/three/examples/jsm/controls/PointerLockControls.js'

// export function PerspectiveCamera() {
//     const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
//     cam.position.z = 7;
//     cam.position.y = 1;

//     return cam
// }

// export function threeJs(cam) {
//     const scene = new THREE.Scene();
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = THREE.BasicShadowMap;
//     document.body.appendChild(renderer.domElement);
//     document.body.appendChild(renderer.domElement);
//     const controls = new pointerLock.PointerLockControls(cam, renderer.domElement)

//     return { scene, renderer, controls }
// }

// export function proccesKeyboard(keyboard, controls) {
//     let speed = 0.1

//     if (keyboard['w']) {
//         controls.moveForward(speed)
//     }
//     if (keyboard['s']) {
//         controls.moveForward(-speed)
//     }

//     if (keyboard['a']) {
//         controls.moveRight(-speed)
//     }
//     if (keyboard['d']) {
//         controls.moveRight(speed)
//     }
// }

export function lighting(scene) {
    // point light
    const pointLight = new THREE.PointLight(0xffffff, 400, 50)
    pointLight.position.set(0, 10, -30)
    pointLight.castShadow = true
    scene.add(pointLight)
    // scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0x00ff00))
}

