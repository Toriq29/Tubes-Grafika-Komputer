import * as THREE from '../node_modules/three/build/three.module.js'
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";


function createWall(xSize, ySize, zSize, xPos, yPos, zPos, texture, scene) {
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

export function walls(scene) {
    // load texture untuk wallpaper
    const wall1_texture = new THREE.TextureLoader().load(
        "./assets/texture/wall.jpg"
    );
    const wall2_texture = new THREE.TextureLoader().load(
        "./assets/texture/wall2.jpg"
    );
    const wall3_texture = new THREE.TextureLoader().load(
        "./assets/texture/wall3.avif"
    );
    

    // Wall Ruang Dino - Kanan
    const cube = createWall(0.5, 58, 50, 40, 1, -50, wall1_texture, scene);

    // Wall Ruang Dino - Kiri
    const cube1 = createWall(0.5, 58, 50, -40, 1, -50, wall1_texture, scene);

    // Wall Pembatas Pertama - Kanan
    const cube2 = createWall(25, 58, 1, 27, 1, -75, wall1_texture, scene);

    // Wall Ruang Fossil - Kanan
    const cube3 = createWall(0.5, 58, 150, 40, 1, -150, wall2_texture, scene);

    // Wall Ruang Fossil - Kiri
    const cube4 = createWall(0.5, 58, 150, -40, 1, -150, wall2_texture, scene);

    // Wall Pembatas Pertama - Kiri
    const cube5 = createWall(25, 58, 1, -27, 1, -75, wall1_texture, scene);

    // Wall Pembatas Kedua - Kiri
    const cube6 = createWall(55, 58, 1, -27, 1, -140, wall3_texture, scene);

    // Wall Pembatas Kedua - Kanan
    const cube7 = createWall(55, 58, 1, 27, 1, -140, wall3_texture, scene);
}

export function cieza(scene) {
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
}

