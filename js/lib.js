import * as THREE from '../node_modules/three/build/three.module.js'
import * as dino from "./dino.js";
import * as fossil from "./fossil.js";

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


export function popUps(dinoDesc, fossilDesc, positionCamera) {

    const dinoo = document.getElementById("popup-container");
    const fossils = document.getElementById("popup-container");

    if (
        positionCamera.x >= 0 &&
        positionCamera.x <= 13 &&
        positionCamera.z <= -26 &&
        positionCamera.z >= -33
    ) {
        dino.informationPopUp(
            dinoDesc[0],
            dinoDesc[1],
            dinoDesc[2]
        );
        // kanan kedua
    } else if (
        positionCamera.x >= 0 &&
        positionCamera.x <= 13 &&
        positionCamera.z <= -41 &&
        positionCamera.z >= -49
    ) {
        dino.informationPopUp(
            dinoDesc[3],
            dinoDesc[4],
            dinoDesc[5]
        );
        // kanan ketiga
    } else if (
        positionCamera.x >= 0 &&
        positionCamera.x <= 13 &&
        positionCamera.z <= -56 &&
        positionCamera.z >= -63
    ) {
        dino.informationPopUp(
            dinoDesc[6],
            dinoDesc[7],
            dinoDesc[8]
        );

        // kiri pertama
    } else if (
        positionCamera.x >= -15 &&
        positionCamera.x <= -3 &&
        positionCamera.z <= -26 &&
        positionCamera.z >= -33
    ) {
        dino.informationPopUp(
            dinoDesc[9],
            dinoDesc[10],
            dinoDesc[11]
        );
        //kiri kedua
    } else if (
        positionCamera.x >= -15 &&
        positionCamera.x <= -3 &&
        positionCamera.z <= -41 &&
        positionCamera.z >= -49
    ) {
        dino.informationPopUp(
            dinoDesc[12],
            dinoDesc[13],
            dinoDesc[14]
        );

        // fossils
        // kanan pertama
    } else if (
        positionCamera.x >= 10 &&
        positionCamera.x <= 35 &&
        positionCamera.z <= -90 &&
        positionCamera.z >= -103
    ) {
        fossil.informationPopUp(
            fossilDesc[0],
            fossilDesc[1],
            fossilDesc[2]
        );
        // kanan kedua
    } else if (
        positionCamera.x >= 10 &&
        positionCamera.x <= 35 &&
        positionCamera.z <= -110 &&
        positionCamera.z >= -125
    ) {
        fossil.informationPopUp(
            fossilDesc[3],
            fossilDesc[4],
            fossilDesc[5]
        );
        // kiri pertama
    } else if (
        positionCamera.x >= -35 &&
        positionCamera.x <= -10 &&
        positionCamera.z <= -90 &&
        positionCamera.z >= -103
    ) {
        fossil.informationPopUp(
            fossilDesc[6],
            fossilDesc[7],
            fossilDesc[8]
        );

        // kiri kedua
    } else if (
        positionCamera.x >= -35 &&
        positionCamera.x <= -10 &&
        positionCamera.z <= -110 &&
        positionCamera.z >= -125
    ) {
        fossil.informationPopUp(
            fossilDesc[9],
            fossilDesc[10],
            fossilDesc[11]
        );
    } else {
        dinoo.style.display = "none";
        fossils.style.display = "none";
    }
}

