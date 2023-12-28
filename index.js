import * as THREE from './node_modules/three/build/three.module.js'

import * as lib from "./lib.js"

import * as GLTFLoader from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'

import * as pointerLock from './node_modules/three/examples/jsm/controls/PointerLockControls.js'


const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
cam.position.z = 7;
// cam.position.z = -80;
cam.position.y = 1;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new pointerLock.PointerLockControls(cam, renderer.domElement)
let clock = new THREE.Clock()
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

const wall1_texture = new THREE.TextureLoader().load('assets/texture/wall.jpg')
const wall2_texture = new THREE.TextureLoader().load('assets/texture/wall2.jpg')

let btn1 = document.querySelector("#button1")
btn1.addEventListener('click', () => {
    controls.lock()
})

controls.addEventListener('lock', () => {
    btn1.innerHTML = 'Locked';
});

controls.addEventListener('unlock', () => {
    btn1.innerHTML = 'Unlocked';
});

let keyboard = []
addEventListener('keydown', (e) => {
    keyboard[e.key] = true
})
addEventListener('keyup', (e) => {
    keyboard[e.key] = false
})

function proccesKeyboard(delta) {
    let speed = 10
    let actualSpeed = speed * delta

    if (keyboard['w']) {
        controls.moveForward(actualSpeed)
    }
    if (keyboard['s']) {
        controls.moveForward(-actualSpeed)
    }

    if (keyboard['a']) {
        controls.moveRight(-actualSpeed)
    }
    if (keyboard['d']) {
        controls.moveRight(actualSpeed)
    }
}

// plane 
var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500)
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xfffff0
})

var planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.receiveShadow = true
planeMesh.position.set(0, -1, 0)
planeMesh.rotation.x = -Math.PI / 2
scene.add(planeMesh)

const geometry = new THREE.BoxGeometry(0.5, 50, 50);
const material = new THREE.MeshPhongMaterial({
    map: wall1_texture
});
const cube = new THREE.Mesh(geometry, material)
cube.position.set(35, 1, -50)
cube.receiveShadow = true
scene.add(cube);

const geometry1 = new THREE.BoxGeometry(0.5, 50, 50);
const material1 = new THREE.MeshPhongMaterial({
    map: wall1_texture
});
const cube1 = new THREE.Mesh(geometry1, material1)
cube1.position.set(-35, 1, -50)
scene.add(cube1);

const geometry2 = new THREE.BoxGeometry(55, 50, 1);
const material2 = new THREE.MeshPhongMaterial({
    map: wall1_texture
});
const cube2 = new THREE.Mesh(geometry2, material2)
cube2.position.set(0, 1, -75)
scene.add(cube2);

const geometry3 = new THREE.BoxGeometry(0.5, 50, 50);
const material3 = new THREE.MeshPhongMaterial({
    map: wall2_texture
});
const cube3 = new THREE.Mesh(geometry3, material3)
cube3.position.set(35, 1, -100)
scene.add(cube3);

const geometry4 = new THREE.BoxGeometry(0.5, 50, 50);
const material4 = new THREE.MeshPhongMaterial({
    map: wall2_texture
});
const cube4 = new THREE.Mesh(geometry4, material4)
cube4.position.set(-35, 1, -100)
scene.add(cube4);

let clockTyrano = new THREE.Clock()
let gltfPath = 'model/dinosaurs/tyranosaurus/scene.gltf'
let texturePath = 'model/dinosaurs/tyranosaurus/textures/material_0_specularGlossiness.png'
let tyranoMixer
lib.dinosaurus(scene, gltfPath, 4, 1.3, texturePath, 4.9, { x: 25, y: 0, z: -30 }).then(mixer => {
    tyranoMixer = mixer
}).catch(error => {
    console.log(error)
});

// let clockPtera = new THREE.Clock()
// gltfPath = 'model/dinosaurs/pteradactal/scene.gltf'
// texturePath = 'model/dinosaurs/pteradactal/textures/material0_baseColor.png'
// let pteraMixer
// lib.dinosaurus(three.scene, gltfPath, 0, 2, texturePath, {x:-10, y:-3, z:-10}).then(mixer => {
//     pteraMixer = mixer
// }).catch(error => {
//     console.log(error)
// });

let clockStego = new THREE.Clock()
gltfPath = 'model/dinosaurs/stegosaurus/scene.gltf'
texturePath = 'model/dinosaurs/stegosaurus/textures/CH_NPC_MOB_Stego_A01_MI_HAY_normal.png'
let stegoMixer
lib.dinosaurus(scene, gltfPath, 3, 6, texturePath, 3, {x:25, y:0, z:-50}).then(mixer => {
    stegoMixer = mixer
}).catch(error => {
    console.log(error)
});

// let clockMega = new THREE.Clock()
// gltfPath = 'model/dinosaurs/megalodon/scene.gltf'
// texturePath = 'model/dinosaurs/megalodon/textures/material_0_clearcoat_roughness.png'
// let megaMixer
// lib.dinosaurus(three.scene, gltfPath, 0, 2, texturePath, {x:10, y:0, z:-10}).then(mixer => {
//     megaMixer = mixer
// }).catch(error => {
//     console.log(error)
// });

let clockVelo = new THREE.Clock()
gltfPath = 'model/dinosaurs/velociraptor/scene.gltf'
texturePath = 'model/dinosaurs/velociraptor/textures/Body_Mat_baseColor.png'
let veloMixer
lib.dinosaurus(scene, gltfPath, 1, 2, texturePath, 4.9, { x: 25, y: 0, z: -40 }).then(mixer => {
    veloMixer = mixer
}).catch(error => {
    console.log(error)
});

// Fosil plateosaurus
var plateosaurus_gltf = 'model/fosils/plateosaurus_skeleton/scene.gltf';
var plateosaurus_txt = 'model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png';
var platersaurus = lib.fosils(scene, plateosaurus_txt, plateosaurus_gltf, 2, {x:20, y:5, z:-100});

const draw = () => {
    let delta = clock.getDelta()
    proccesKeyboard(delta)

    if (tyranoMixer) {
        tyranoMixer.update(clockTyrano.getDelta());
    }

    // if (pteraMixer) {
    //     pteraMixer.update(clockPtera.getDelta());
    // }
    // if (megaMixer) {
    //     megaMixer.update(clockMega.getDelta());

    // }

    if (veloMixer) {
        veloMixer.update(clockVelo.getDelta());

    }
    if (stegoMixer) {
        stegoMixer.update(clockStego.getDelta());

    }

    renderer.render(scene, cam)
    requestAnimationFrame(draw)
}

window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    cam.aspect = this.window.innerWidth / this.window.innerHeight
    cam.updateProjectionMatrix()
})

draw()