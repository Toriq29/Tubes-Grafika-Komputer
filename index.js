import * as THREE from "./node_modules/three/build/three.module.js";

import * as lib from "./lib.js";

import * as GLTFLoader from "./node_modules/three/examples/jsm/loaders/GLTFLoader.js";

import * as pointerLock from "./node_modules/three/examples/jsm/controls/PointerLockControls.js";

let cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
cam.position.z = 7;
// cam.position.z = -80;
cam.position.y = 1;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new pointerLock.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

// load texture untuk wallpaper
const wall1_texture = new THREE.TextureLoader().load("assets/texture/wall.jpg");
const wall2_texture = new THREE.TextureLoader().load(
  "assets/texture/wall2.jpg"
);
const wall3_texture = new THREE.TextureLoader().load(
  "assets/texture/wall3.avif"
);

let btn1 = document.querySelector("#button1");
btn1.addEventListener("click", () => {
  controls.lock();
});

controls.addEventListener("lock", () => {
  btn1.innerHTML = "Locked";
});

controls.addEventListener("unlock", () => {
  btn1.innerHTML = "Unlocked";
});

let keyboard = [];
addEventListener("keydown", (e) => {
  keyboard[e.key] = true;
});
addEventListener("keyup", (e) => {
  keyboard[e.key] = false;
});

// settingan keyboard untuk navigasi
function proccesKeyboard(delta) {
  let speed = 10;
  let actualSpeed = speed * delta;

  if (keyboard["w"]) {
    controls.moveForward(actualSpeed);
  }
  if (keyboard["s"]) {
    controls.moveForward(-actualSpeed);
  }

  if (keyboard["a"]) {
    controls.moveRight(-actualSpeed);
  }
  if (keyboard["d"]) {
    controls.moveRight(actualSpeed);
  }
}

// plane
var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xfffff0,
});

var planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

// wall ruangan dino - kanan
const geometry = new THREE.BoxGeometry(0.5, 50, 50);
const material = new THREE.MeshPhongMaterial({
  map: wall1_texture,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(40, 1, -50);
cube.receiveShadow = true;
scene.add(cube);

// wall ruangan dino - kiri
const geometry1 = new THREE.BoxGeometry(0.5, 50, 50);
const material1 = new THREE.MeshPhongMaterial({
  map: wall1_texture,
});
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.set(-40, 1, -50);
scene.add(cube1);

// wall pembatas pertama - kanan
const geometry2 = new THREE.BoxGeometry(25, 50, 1);
const material2 = new THREE.MeshPhongMaterial({
  map: wall1_texture,
});
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(27, 1, -70);
scene.add(cube2);

// wall ruangan fossil - kanan 
const geometry3 = new THREE.BoxGeometry(0.5, 50, 150);
const material3 = new THREE.MeshPhongMaterial({
  map: wall2_texture,
});
const cube3 = new THREE.Mesh(geometry3, material3);
cube3.position.set(40, 1, -150);
scene.add(cube3);

// wall ruangan fossil - kiri
const geometry4 = new THREE.BoxGeometry(0.5, 50, 150);
const material4 = new THREE.MeshPhongMaterial({
  map: wall2_texture,
});
const cube4 = new THREE.Mesh(geometry4, material4);
cube4.position.set(-40, 1, -150);
scene.add(cube4);

// wall pembatas pertama - kiri
const geometry5 = new THREE.BoxGeometry(25, 50, 1);
const material5 = new THREE.MeshPhongMaterial({
  map: wall1_texture,
});
const cube5 = new THREE.Mesh(geometry5, material5);
cube5.position.set(-27, 1, -70);
scene.add(cube5);

// wall pembatas kedua - kiri
const geometry6 = new THREE.BoxGeometry(25, 50, 1);
const material6 = new THREE.MeshPhongMaterial({
  map: wall3_texture,
});
const cube6 = new THREE.Mesh(geometry6, material6);
cube6.position.set(-27, 1, -140);
scene.add(cube6);

// wall pembatas kedua - kanan
const geometry7 = new THREE.BoxGeometry(25, 50, 1);
const material7 = new THREE.MeshPhongMaterial({
  map: wall3_texture,
});
const cube7 = new THREE.Mesh(geometry7, material7);
cube7.position.set(27, 1, -140);
scene.add(cube7);

// dino sebelah kanan - 1
let clockTyrano = new THREE.Clock();
let gltfPath = "model/dinosaurs/tyranosaurus/scene.gltf";
let tyranoMixer;
lib
  .dinosaurus(scene, gltfPath, 2, 1.7, 4.9, {
    x: 20,
    y: 0,
    z: -30,
  })
  .then((mixer) => {
    tyranoMixer = mixer;
  })
  .catch((error) => {
    console.log(error);
  });

// dino sebelah kiri - 1
let clockPtera = new THREE.Clock();
gltfPath = "model/dinosaurs/pteradactal/scene.gltf";
let pteraMixer;
lib
  .dinosaurus(scene, gltfPath, 0, 2.5, 1.5, {
    x: -20,
    y: 0,
    z: -30,
  })
  .then((mixer) => {
    pteraMixer = mixer;
  })
  .catch((error) => {
    console.log(error);
  });

// dino sebelah kanan - 2
let clockStego = new THREE.Clock();
gltfPath = "model/dinosaurs/stegosaurus/scene.gltf";
let stegoMixer;
lib
  .dinosaurus(scene, gltfPath, 3, 7, 3, { x: 20, y: 0, z: -45 })
  .then((mixer) => {
    stegoMixer = mixer;
  })
  .catch((error) => {
    console.log(error);
  });
// dino sebelah kiri - 2
let clockTri = new THREE.Clock();
gltfPath = "model/dinosaurs/triceratops/scene.gltf";
let triMixer;
lib
  .dinosaurus(scene, gltfPath, 0, 2, 1.5, {
    x: -20,
    y: 0,
    z: -45,
  })
  .then((mixer) => {
    triMixer = mixer;
  })
  .catch((error) => {
    console.log(error);
  });

// let clockOuro = new THREE.Clock()
// gltfPath = 'model/dinosaurs/ouroboros/scene.gltf'
// texturePath = "model/dinosaurs/ouroboros/textures/snake_baseColor.png";
// let ouroMixer
// lib.dinosaurus(scene, gltfPath, 1, 7, texturePath, 2, {x: 30, y:0, z: -60}).then(mixer => {
//     ouroMixer = mixer
// }).catch(error=> {
//         console.log(error)
// });

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
let veloMixer
lib.dinosaurus(scene, gltfPath, 3, 2.5, 4.5, { x: 20, y: 0, z: -60 }).then(mixer => {
  veloMixer = mixer
  console.log("Velociraptor loaded successfully!");
}).catch(error => {
  console.log(error)
  console.error("Error loading velociraptor:", error);
});

// -- Ruangan 2 -- 

// Fosil plateosaurus - kanan tengah
var plateosaurus_gltf = "model/fosils/plateosaurus_skeleton/scene.gltf";
var plateosaurus_txt =
  "model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
lib.fosils(
  scene,
  plateosaurus_txt,
  plateosaurus_gltf,
  2,
  { x: 25, y: 5, z: -100 },
  30
);

// Fosil Dodo - kiri tengah
var dodo_gltf = "model/fosils/dodo_skeleton/scene.gltf";
var dodo_txt =
  "model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
lib.fosils(scene, dodo_txt, dodo_gltf, 2, { x: -25, y: 5, z: -100 }, -30);

// Fosil Triceratops - kiri terakhir
var triceratops_gltf = "model/fosils/triceratops_skeleton/scene.gltf";
var triceratops_txt =
  "model/fosils/triceratops_skeleton/textures/default_baseColor.png";
lib.fosils(
  scene,
  triceratops_txt,
  triceratops_gltf,
  4,
  { x: -25, y: 2.5, z: -120 },
  -30
);

// Fosil Tyrannosaurus - kanan terakhir
var tyrannosaurus_gltf = "model/fosils/tyrannosaurus_rex_skeleton/scene.gltf";
var tyrannosaurus_txt =
  "model/fosils/tyrannosaurus_rex_skeleton/textures/dyno_tex_Material_u1_v1_baseColor.jpeg";
lib.fosils(
  scene,
  tyrannosaurus_txt,
  tyrannosaurus_gltf,
  4,
  { x: 25, y: 1, z: -120 },
  30
);

// Fosil mammoth // ini di comment dlu bentar
// var mammoth_gltf = 'model/fosils/mammoth/scene.gltf';
// var mammoth_txt = 'model/fosils/mammoth/textures/material_0_baseColor.jpeg';
// lib.fosils(scene, mammoth_txt, mammoth_gltf, 0.5, { x: 0, y: -1, z: -85 }, 0);

// Fosil Pteranodon
// var pteranodon_gltf = 'model/fosils/pteranodon_skeleton/scene.gltf';
// var pteranodon_txt = 'model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png';
// lib.fosils(scene, pteranodon_txt, pteranodon_gltf, 1, {x:20, y:3, z:-120});

// Fossil Irish deer
// var deer_gltf = "model/fosils/irish_deer/scene.gltf";
// var deer_txt = "model/fosils/irish_deer/textures/legs_diffuse.png";
// lib.fosils(scene, deer_txt, deer_gltf, 5, { x: -25, y: -1, z: -80 }, 240);

// fossil sea cow
// var cow_gltf = 'model/fosils/sea_cow/scene.gltf';
// var cow_txt = 'model/fosils/sea_cow/textures/material_0_baseColor.png';
// lib.fosils(scene, cow_txt, cow_gltf, 7, {x: 20, y:3, z:-80}, 0);


// gate antara ruangan 1 dan 2
let cieza;
let loaderr = new GLTFLoader.GLTFLoader().load(
  "model/museum_wall/cieza/scene.gltf",
  function (result) {
    cieza = result.scene.children[0];
    cieza.scale.set(1.5, 1.5, 1.5);
    cieza.position.set(0, 2, -75);
    cieza.rotation.x = 0.8;

    // cieza.material = new THREE.Mesh({ receivesShadow: true });
    scene.add(cieza);
  }
);

// untuk barrier di setiap model (belum bisa)
// var barrier_gltf = "model/barrier/scene.gltf";
// var barrier_txt = new THREE.TextureLoader().load(
//   "model/barrier/textures/Scene_Root_baseColor.png"
// );
// var loader = new GLTFLoader.GLTFLoader();

// loader.load(barrier_gltf, function (barrier) {
//   barrier.traverse(function (child) {
//     if (child.isMesh) {
//       child.material.map = barrier_txt;
//     }
//   });
//   barrier.position.set(0, 1, -40);
//   barrier.scale.set(0.5, 0.5, 0.5);
//   scene.add(barrier);
// });

// let barrier;
// let loaderrr = new GLTFLoader.GLTFLoader().load("model/barrier/scene.gltf", function (result) {
//   barrier = result.scene.children[0];
//   barrier.scale.set(2, 2, 2);
//   barrier.position.set(0, 10, -50);
//   barrier.rotation.x = 0.8;

//   scene.add(barrier);
//   console.log("test")
// });

// lighting
const pointLight1 = new THREE.PointLight(0xffffff, 200, 50);
pointLight1.position.set(0, 35, 0);
pointLight1.castShadow = true;

scene.add(pointLight1);
scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00));

// Membuat tembok tidak dapat ditembus
controls.prevPosition = new THREE.Vector3();

function checkCollision() {
  const camPos = controls.getObject().position;
  const minDistance = 2;

  // const cubes = [cube, cube1, cube2, cube3, cube4, cube5, cube6, cube7];
  const cubes = [cube, cube1, cube3, cube4];

  let collided = false; 

  for (let i = 0; i < cubes.length; i++) {
    const cubePos = cubes[i].position;
    const cubeWidth = 0.5;
    const cubeDepth = 50;

    const distanceX = Math.abs(camPos.x - cubePos.x);
    const distanceZ = Math.abs(camPos.z - cubePos.z);

    if (
      distanceX < (cubeWidth / 2 + minDistance) &&
      distanceZ < (cubeDepth / 2 + minDistance)
    ) {
      collided = true; 
      break; 
    }
  }

  if (collided) {
    controls.getObject().position.copy(controls.prevPosition);
  } else {
    controls.prevPosition.copy(controls.getObject().position);
  }
}



const draw = () => {
  let delta = clock.getDelta();

  proccesKeyboard(delta);

  if (tyranoMixer) {
    tyranoMixer.update(clockTyrano.getDelta());
  }

  if (pteraMixer) {
    pteraMixer.update(clockPtera.getDelta());
  }

  // if (megaMixer) {
  //     megaMixer.update(clockMega.getDelta());
  // }

  if (veloMixer) {
    veloMixer.update(clockVelo.getDelta());
  }

  if (stegoMixer) {
    stegoMixer.update(clockStego.getDelta());
  }

  // if (ouroMixer) {
  //   ouroMixer.update(clockOuro.getDelta());
  // }

  if (triMixer) {
    triMixer.update(clockTri.getDelta());
  }

  checkCollision();
  renderer.render(scene, cam);
  requestAnimationFrame(draw);
};

// resize2a
window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  cam.aspect = this.window.innerWidth / this.window.innerHeight;
  cam.updateProjectionMatrix();
});

draw();
