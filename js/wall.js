import * as THREE from '../node_modules/three/build/three.module.js'

export function createWall(xSize, ySize, zSize, xPos, yPos, zPos, texture, scene) {
    const geometry = new THREE.BoxGeometry(xSize, ySize, zSize);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
    });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(xPos, yPos, zPos);
    wall.receiveShadow = true;
    scene.add(wall);

    return wall; 
}