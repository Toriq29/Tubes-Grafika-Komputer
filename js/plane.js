import * as THREE from '../node_modules/three/build/three.module.js'
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export function createPlane(width, height, segmentsX, segmentsY, color, roughness, metalness, texture) {
    var planeGeometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    var planeMaterial = new THREE.MeshLambertMaterial({
      color: color,
      roughness: roughness,
      metalness: metalness,
      map: texture,
    });
  
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.receiveShadow = true;
    planeMesh.position.set(0, -1, 0);
    planeMesh.rotation.x = -Math.PI / 2;
  
    return planeMesh;
  }