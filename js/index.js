import * as THREE from "../node_modules/three/build/three.module.js";
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import * as pointerLock from "../node_modules/three/examples/jsm/controls/PointerLockControls.js";
import * as lib from "./lib.js";

let cam = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
cam.position.z = 7;
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

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  const button1 = document.getElementById("button1");
  
  setTimeout(() => {
      loader.classList.add("loader--hidden");

      loader.addEventListener("transitionend", () => {
          document.body.removeChild(loader);
          button1.classList.add("button1--visible");
      });
  }, 7000);
});

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

// load texture untuk wallpaper
const wall1_texture = new THREE.TextureLoader().load("./assets/texture/wall.jpg");
const wall2_texture = new THREE.TextureLoader().load("./assets/texture/wall2.jpg");
const wall3_texture = new THREE.TextureLoader().load("./assets/texture/wall3.avif");

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
const cube5 = new THREE.Mesh(geometry2, material2);
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
let gltfPath = "./model/dinosaurs/tyranosaurus/scene.gltf";
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
gltfPath = "./model/dinosaurs/pteradactal/scene.gltf";
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
gltfPath = "./model/dinosaurs/stegosaurus/scene.gltf";
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
  gltfPath = "./model/dinosaurs/triceratops/scene.gltf";
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

let clockVelo = new THREE.Clock()
gltfPath = './model/dinosaurs/velociraptor/scene.gltf'
let veloMixer
lib.dinosaurus(scene, gltfPath, 3, 2.5, 4.5, {x:20, y:0, z:-60}).then(mixer => {
    veloMixer = mixer
    console.log("Velociraptor loaded successfully!");
}).catch(error => {
    console.log(error)
    console.error("Error loading velociraptor:", error);
});

// -- Ruangan 2 -- 

// Fosil plateosaurus - kanan tengah
var plateosaurus_gltf = "./model/fosils/plateosaurus_skeleton/scene.gltf";
var plateosaurus_txt =
  "./model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
lib.fosils(
  scene,
  plateosaurus_txt,
  plateosaurus_gltf,
  2,
  { x: 25, y: 5, z: -100 },
  30
);

// Fosil Dodo - kiri tengah
var dodo_gltf = "./model/fosils/dodo_skeleton/scene.gltf";
var dodo_txt =
  "./model/fosils/plateosaurus_skeleton/textures/material_0_diffuse.png";
lib.fosils(scene, dodo_txt, dodo_gltf, 2, { x: -25, y: 5, z: -100 }, -30);

// Fosil Triceratops - kiri terakhir
var triceratops_gltf = "./model/fosils/triceratops_skeleton/scene.gltf";
var triceratops_txt =
  "./model/fosils/triceratops_skeleton/textures/default_baseColor.png";
lib.fosils(
  scene,
  triceratops_txt,
  triceratops_gltf,
  4,
  { x: -25, y: 2.5, z: -120 },
  -30
);

// Fosil Tyrannosaurus - kanan terakhir
var tyrannosaurus_gltf = "./model/fosils/tyrannosaurus_rex_skeleton/scene.gltf";
var tyrannosaurus_txt =
  "./model/fosils/tyrannosaurus_rex_skeleton/textures/dyno_tex_Material_u1_v1_baseColor.jpeg";
lib.fosils(
  scene,
  tyrannosaurus_txt,
  tyrannosaurus_gltf,
  4,
  { x: 25, y: 1, z: -120 },
  30
);

// gate antara ruangan 1 dan 2
let cieza;
let loaderr = new GLTFLoader.GLTFLoader().load(
  "./model/museum_wall/cieza/scene.gltf",
  function (result) {
    cieza = result.scene.children[0];
    cieza.scale.set(1.5, 1.5, 1.5);
    cieza.position.set(0, 2, -75);
    cieza.rotation.x = 0.8;

    // cieza.material = new THREE.Mesh({ receivesShadow: true });
    scene.add(cieza);
  }
);

// lighting
const pointLight1 = new THREE.PointLight(0xffffff, 200, 50);
pointLight1.position.set(0, 35, 0);
pointLight1.castShadow = true;

scene.add(pointLight1);
scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00));

// audio
let pendengar = new THREE.AudioListener();
cam.add(pendengar);

// function draw
const draw = () => {
  let delta = clock.getDelta();
  
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
