import * as THREE from "../node_modules/three/build/three.module.js";
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as pointerLock from "../node_modules/three/examples/jsm/controls/PointerLockControls.js";
import * as lib from "./lib.js";
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
const plane_texture = new THREE.TextureLoader().load(
  "./assets/texture/wood.jpg"
);

plane_texture.wrapS = THREE.RepeatWrapping;
plane_texture.wrapT = THREE.RepeatWrapping;
plane_texture.repeat.set(50, 50);

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

wall.walls(scene)

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
let clockVelo = new THREE.Clock();
gltfPath = "./model/dinosaurs/velociraptor/scene.gltf";
let veloMixer;
dino
  .dinosaurus(scene, gltfPath, 3, 2.5, 4.5, { x: 20, y: 0, z: -60 })
  .then((mixer) => {
    veloMixer = mixer;
    console.log("Velociraptor loaded successfully!");
  })
  .catch((error) => {
    console.log(error);
    console.error("Error loading velociraptor:", error);
  });

// -- Ruangan 2 --

fossil.fosils(scene)

// Gate antara ruangan 1 dan 2

wall.cieza(scene)

// ATAP
const ceiling_texture = new THREE.TextureLoader().load(
  "./assets/texture/ceiling.jpg"
);
ceiling_texture.wrapS = THREE.RepeatWrapping;
ceiling_texture.wrapT = THREE.RepeatWrapping;
ceiling_texture.repeat.set(30, 30);

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

let dinoDesc = dino.dinoDescription();
let fossilDesc = fossil.fossilDescription();

let positionCamera = controls.getObject().position;

// function draw
const draw = () => {
  let delta = clock.getDelta();
  proccesKeyboard(delta);

  console.log(controls.getObject().position);
  // kanan pertama
  
  lib.popUps(dinoDesc, fossilDesc, positionCamera)


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
