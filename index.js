import * as THREE from './node_modules/three/build/three.module.js'

import * as lib from "./lib.js"

import * as GLTFLoader from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


let camera = lib.PerspectiveCamera()
let three = lib.threeJs(camera)


let btn1 = document.querySelector("#button1")
btn1.addEventListener('click', () => {
    three.controls.lock()
})

let keyboard = []
addEventListener('keydown', (e) => {
    keyboard[e.key] = true
})
addEventListener('keyup', (e) => {
    keyboard[e.key] = false
})

// // lighting
// lib.lighting(three.scene)

// plane 
var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500)
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xfffff0
})

var planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.receiveShadow = true
planeMesh.position.set(0, -1, 0)
planeMesh.rotation.x = -Math.PI / 2
three.scene.add(planeMesh)


// kendali
// let kendali = Object()
// kendali.x = -2
// kendali.y = 4
// kendali.z = 3.5

// let gui = new dat.GUI()
// gui.add(kendali, "x", -8, 8)
// gui.add(kendali, "y", -8, 8)
// gui.add(kendali, "z", -8, 8)

// let idx = 0
// addEventListener("keypress", (evt) => {
//     let nextAction

//     if (idx == 0) {
//         idx = 1
//     }
//     else if(idx == 1){
//         idx = 2
//     }
//     else if(idx == 2){
//         idx = 3
//     }
//     else if(idx == 3){
//         idx = 4
//     }
//     else{
//         idx = 0
//     }

//     nextAction = mixer.clipAction(animation[idx])
//     action = action.crossFadeTo(nextAction,1,true)
//     action.enabled = true
//     action.play()
// })


const geometry = new THREE.BoxGeometry( 0.5, 50, 50 ); 
const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
const cube = new THREE.Mesh( geometry, material )
cube.position.set(35,1,-50)
cube.receiveShadow = true
three.scene.add( cube );


const geometry1 = new THREE.BoxGeometry( 0.5, 50, 50 ); 
const material1 = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
const cube1 = new THREE.Mesh( geometry1, material1 )
cube1.position.set(-30,1,-50)
three.scene.add( cube1 );

const geometry2 = new THREE.BoxGeometry( 55, 50, 1 ); 
const material2 = new THREE.MeshPhongMaterial( {color: 0x00ff00} ); 
const cube2 = new THREE.Mesh( geometry2, material2 )
cube2.position.set(0,1,-75)
three.scene.add( cube2 );


let clockTyrano = new THREE.Clock()
let gltfPath = 'model/tyranosaurus/scene.gltf'
let texturePath = 'model/tyranosaurus/textures/material_0_specularGlossiness.png'
let tyranoMixer
lib.dinosaurus(three.scene, gltfPath, 4, 1.3, texturePath, 4.9, {x: 25, y:0, z:-30}).then(mixer => {
    tyranoMixer = mixer
}).catch(error => {
    console.log(error)
});

// let clockPtera = new THREE.Clock()
// gltfPath = 'model/pteradactal/scene.gltf'
// texturePath = 'model/pteradactal/textures/material0_baseColor.png'
// let pteraMixer
// lib.dinosaurus(three.scene, gltfPath, 0, 2, texturePath, {x:-10, y:-3, z:-10}).then(mixer => {
//     pteraMixer = mixer
// }).catch(error => {
//     console.log(error)
// });

// let clockStego = new THREE.Clock()
// gltfPath = 'model/stegosaurus/scene.gltf'
// texturePath = 'model/stegosaurus/textures/CH_NPC_MOB_Stego_A01_MI_HAY_normal.png'
// let stegoMixer
// lib.dinosaurus(three.scene, gltfPath, 6, 4, texturePath, {x:25, y:-1, z:-10}).then(mixer => {
//     stegoMixer = mixer
// }).catch(error => {
//     console.log(error)
// });

// let clockMega = new THREE.Clock()
// gltfPath = 'model/megalodon/scene.gltf'
// texturePath = 'model/megalodon/textures/material_0_clearcoat_roughness.png'
// let megaMixer
// lib.dinosaurus(three.scene, gltfPath, 0, 2, texturePath, {x:10, y:0, z:-10}).then(mixer => {
//     megaMixer = mixer
// }).catch(error => {
//     console.log(error)
// });

let clockVelo = new THREE.Clock()
gltfPath = 'model/velociraptor/scene.gltf'
texturePath = 'model/velociraptor/textures/Body_Mat_baseColor.png'
let veloMixer
lib.dinosaurus(three.scene, gltfPath, 1, 2, texturePath, 4.9, {x: 25, y:0, z:-40}).then(mixer => {
    veloMixer = mixer
}).catch(error => {
    console.log(error)
});

const draw = () => {
    lib.proccesKeyboard(keyboard, three.controls)

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
    // if (stegoMixer) {
    //     stegoMixer.update(clockStego.getDelta());

    // }

    three.renderer.render(three.scene, camera)
    requestAnimationFrame(draw)
}

window.addEventListener('resize', function () {
    three.renderer.setSize(this.window.innerWidth, this.window.innerHeight)
    camera.aspect = this.window.innerWidth / this.window.innerHeight
    camera.updateProjectionMatrix()
})

draw()