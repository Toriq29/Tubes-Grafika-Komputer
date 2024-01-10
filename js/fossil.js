import * as THREE from "../node_modules/three/build/three.module.js";
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export function fossils(scene, fosiltxt, fosilGltf, scl, pstn, rtt) {
  var loader = new GLTFLoader.GLTFLoader();
  var texture = new THREE.TextureLoader().load(fosiltxt);

  var pointLight = new THREE.PointLight(0xffffff, 400, 50);
  pointLight.position.set(pstn.x, pstn.y + 20, pstn.z);
  pointLight.castShadow = true;
  scene.add(pointLight);
  scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0x00ff00));

  loader.load(fosilGltf, function (fosil) {
    fosil.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = texture;
      }
    });
    fosil.scene.position.set(pstn.x, pstn.y, pstn.z);
    fosil.scene.scale.set(scl, scl, scl);
    fosil.scene.rotation.set(0, rtt, 0);
    scene.add(fosil.scene);
  });

  var podium_gltf = "model/aztec_podium/scene.gltf";
  var podium_txt = new THREE.TextureLoader().load(
    "model/aztec_podium/textures/None_baseColor.png"
  );

  loader.load(podium_gltf, function (podium) {
    podium.scene.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = podium_txt;
      }
    });
    podium.scene.position.set(pstn.x, -1, pstn.z - 1);
    podium.scene.scale.set(0.5, 0.5, 0.5);
    scene.add(podium.scene);
  });
}
