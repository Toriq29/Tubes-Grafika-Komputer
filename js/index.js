import * as THREE from "../node_modules/three/build/three.module.js";
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as pointerLock from "../node_modules/three/examples/jsm/controls/PointerLockControls.js";
// import * as lib from "./lib.js";
import * as wall from "./wall.js";
import * as dino from "./dino.js";
import * as fossil from "./fossil.js";

let cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
cam.position.z = 7;
cam.position.y = 3;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
let controls = new pointerLock.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const button1 = document.getElementById("button1");

  setTimeout(() => {
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
      button1.style.opacity = "1";
    });
  }, 4000);
});

let btn1 = document.querySelector("#button1");
let textPress = document.getElementById("textPress");

btn1.addEventListener("click", () => {
  controls.lock();
});

controls.addEventListener("lock", () => {
  btn1.style.opacity = "0";
});

controls.addEventListener("unlock", () => {
  textPress.innerText = "Press To View";
  btn1.style.opacity = "1";
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

// load texture untuk wallpaper
const wall1_texture = new THREE.TextureLoader().load("./assets/texture/wall.jpg");
const wall2_texture = new THREE.TextureLoader().load("./assets/texture/wall2.jpg");
const wall3_texture = new THREE.TextureLoader().load("./assets/texture/wall3.avif");
const plane_texture = new THREE.TextureLoader().load("./assets/texture/wood.jpg");

plane_texture.wrapS = THREE.RepeatWrapping;
plane_texture.wrapT = THREE.RepeatWrapping;
plane_texture.repeat.set(50, 50)

// plane
var plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);
var planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xfffff0,
  roughness: 0.5,
  metalness: 1,
  map: plane_texture,
});

var planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

// -- WALL --

// Wall Ruang Dino - Kanan
const cube = wall.createWall(0.5, 58, 50, 40, 1, -50, wall1_texture, scene);

// Wall Ruang Dino - Kiri
const cube1 = wall.createWall(0.5, 58, 50, -40, 1, -50, wall1_texture, scene);

// Wall Pembatas Pertama - Kanan
const cube2 = wall.createWall(25, 58, 1, 27, 1, -75, wall1_texture, scene);

// Wall Ruang Fossil - Kanan
const cube3 = wall.createWall(0.5, 58, 150, 40, 1, -150, wall2_texture, scene);

// Wall Ruang Fossil - Kiri
const cube4 = wall.createWall(0.5, 58, 150, -40, 1, -150, wall2_texture, scene);

// Wall Pembatas Pertama - Kiri
const cube5 = wall.createWall(25, 58, 1, -27, 1, -75, wall1_texture, scene);

// Wall Pembatas Kedua - Kiri
const cube6 = wall.createWall(55, 58, 1, -27, 1, -140, wall3_texture, scene);

// Wall Pembatas Kedua - Kanan
const cube7 = wall.createWall(55, 58, 1, 27, 1, -140, wall3_texture, scene);

// -- DINO --

// Dino Kanan - 1
let clockTyrano = new THREE.Clock();
let gltfPath = "./model/dinosaurs/tyranosaurus/scene.gltf";
let tyranoMixer;
dino
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

// Dino Kiri - 1
let clockPtera = new THREE.Clock();
gltfPath = "./model/dinosaurs/pteradactal/scene.gltf";
let pteraMixer;
dino
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

// Dino Kanan - 2
let clockStego = new THREE.Clock();
gltfPath = "./model/dinosaurs/stegosaurus/scene.gltf";
let stegoMixer;
dino
  .dinosaurus(scene, gltfPath, 3, 7, 3, { x: 20, y: 0, z: -45 })
  .then((mixer) => {
    stegoMixer = mixer;
  })
  .catch((error) => {
    console.log(error);
  });

// Dino Kiri - 2
let clockTri = new THREE.Clock();
gltfPath = "./model/dinosaurs/triceratops/scene.gltf";
let triMixer;
dino
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

// Dino Kanan - 3
let clockVelo = new THREE.Clock()
gltfPath = './model/dinosaurs/velociraptor/scene.gltf'
let veloMixer
dino.dinosaurus(scene, gltfPath, 3, 2.5, 4.5, { x: 20, y: 0, z: -60 }).then(mixer => {
  veloMixer = mixer
  console.log("Velociraptor loaded successfully!");
}).catch(error => {
  console.log(error)
  console.error("Error loading velociraptor:", error);
});

// -- Ruangan 2 -- 

// Fosil plateosaurus - kanan pertama
var plateosaurus_gltf = "./model/fosils/plateosaurus_skeleton/scene.gltf";
var plateosaurus_txt =
  "./model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
fossil.fossils(
  scene,
  plateosaurus_txt,
  plateosaurus_gltf,
  2,
  { x: 25, y: 5, z: -100 },
  30
);

// Fosil Dodo - kiri pertama
var dodo_gltf = "./model/fosils/dodo_skeleton/scene.gltf";
var dodo_txt =
  "./model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
fossil.fossils(scene, dodo_txt, dodo_gltf, 2, { x: -25, y: 5, z: -100 }, -30);

// Fosil Triceratops - kiri kedua
var triceratops_gltf = "./model/fosils/triceratops_skeleton/scene.gltf";
var triceratops_txt =
  "./model/fosils/triceratops_skeleton/textures/default_baseColor.png";
fossil.fossils(
  scene,
  triceratops_txt,
  triceratops_gltf,
  4,
  { x: -25, y: 2.5, z: -120 },
  -30
);

// Fosil Tyrannosaurus - kanan kedua
var tyrannosaurus_gltf = "./model/fosils/tyrannosaurus_rex_skeleton/scene.gltf";
var tyrannosaurus_txt =
  "./model/fosils/tyrannosaurus_rex_skeleton/textures/dyno_tex_Material_u1_v1_baseColor.jpeg";
fossil.fossils(
  scene,
  tyrannosaurus_txt,
  tyrannosaurus_gltf,
  4,
  { x: 25, y: 1, z: -120 },
  30
);

// Gate antara ruangan 1 dan 2
let cieza;
let loaderr = new GLTFLoader.GLTFLoader().load(
  "./model/museum_wall/cieza/scene.gltf",
  function (result) {
    cieza = result.scene.children[0];
    cieza.scale.set(1.5, 1.5, 1.5);
    cieza.position.set(0, 2, -80);
    cieza.rotation.x = 0.8;
    scene.add(cieza);
  }
);

// ATAP
const ceiling_texture = new THREE.TextureLoader().load("./assets/texture/ceiling.jpg");
ceiling_texture.wrapS = THREE.RepeatWrapping;
ceiling_texture.wrapT = THREE.RepeatWrapping;
ceiling_texture.repeat.set(30, 30)

// Ceiling
var ceilingGeometry = new THREE.PlaneGeometry(1000, 1000, 500, 500);
var ceilingMaterial = new THREE.MeshLambertMaterial({
  map: ceiling_texture, // Set the texture for the ceiling
  roughness: 0.5,
  metalness: 0, // Set metalness to 0
  envMap: null, // Set envMap to null to disable reflections
});

var ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
ceilingMesh.receiveShadow = true;
ceilingMesh.position.set(0, 50, 0); // Set the y-coordinate to the desired height
ceilingMesh.rotation.x = Math.PI / 2; // Rotate the ceiling to be horizontal
scene.add(ceilingMesh);

// lighting tengah
const pointLight1 = new THREE.PointLight(0xffffff, 200, 50);
pointLight1.position.set(0, 35, 0);
pointLight1.castShadow = true;

// Ambient Light (Warmer)
var ambientLightWarm = new THREE.AmbientLight(0xffffff, 0.3); // Warmer color, Intensity: 0.5
scene.add(ambientLightWarm);

scene.add(pointLight1);
// scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00));

// audio
let pendengar = new THREE.AudioListener();
cam.add(pendengar);

let dinoDesc = dino.dinoDescription()

const dinoo = document.getElementById("popup-container");

let positionCamera = controls.getObject().position


// function draw
const draw = () => {
  let delta = clock.getDelta();

  console.log(controls.getObject().position)

  if (positionCamera.x >= 0 &&
    positionCamera.x <= 13 &&
    positionCamera.z <= -26 &&
    positionCamera.z >= -33) {
    dino.informationPopUp(controls.getObject().position, dinoDesc[0], dinoDesc[1], dinoDesc[2])

  }
  else if (positionCamera.x >= 0 &&
    positionCamera.x <= 13 &&
    positionCamera.z <= -41 &&
    positionCamera.z >= -49) {
    dino.informationPopUp(controls.getObject().position, dinoDesc[3], dinoDesc[4], dinoDesc[5])
  }
  else if (positionCamera.x >= 0 &&
    positionCamera.x <= 13 &&
    positionCamera.z <= -56 &&
    positionCamera.z >= -63) {
    dino.informationPopUp(controls.getObject().position, dinoDesc[6], dinoDesc[7], dinoDesc[8])
  }
  else if (positionCamera.x >= -15 &&
    positionCamera.x <= -3 &&
    positionCamera.z <= -26 &&
    positionCamera.z >= -33) {
    dino.informationPopUp(controls.getObject().position, dinoDesc[9], dinoDesc[10], dinoDesc[11])
  }
  else if (positionCamera.x >= -15 &&
    positionCamera.x <= -3 &&
    positionCamera.z <= -41 &&
    positionCamera.z >= -49) {
    dino.informationPopUp(controls.getObject().position, dinoDesc[12], dinoDesc[13], dinoDesc[14])
  }
  else {
    dinoo.style.display = 'none'
  }






  proccesKeyboard(delta);

  if (tyranoMixer) {
    tyranoMixer.update(clockTyrano.getDelta());
  }

  if (pteraMixer) {
    pteraMixer.update(clockPtera.getDelta());
  }

  if (veloMixer) {
    veloMixer.update(clockVelo.getDelta());
  }

  if (stegoMixer) {
    stegoMixer.update(clockStego.getDelta());
  }

  if (triMixer) {
    triMixer.update(clockTri.getDelta());
  }

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
