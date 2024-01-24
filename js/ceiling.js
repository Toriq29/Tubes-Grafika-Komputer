import * as THREE from '../node_modules/three/build/three.module.js'
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export function createCeiling(width, height, segmentsX, segmentsY, texture, roughness, metalness) {
    var ceilingGeometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);
    var ceilingMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      roughness: roughness,
      metalness: metalness,
      envMap: null,
    });
  
    var ceilingMesh = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceilingMesh.receiveShadow = true;
    ceilingMesh.position.set(0, 30, 0);
    ceilingMesh.rotation.x = Math.PI / 2;
  
    return ceilingMesh;
  }