import * as THREE from '../node_modules/three/build/three.module.js'
import * as GLTFLoader from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'

export function dinosaurus(scene, gltfPath, aniNUm, scl, r, pstn) {

    // point light
    const pointLight1 = new THREE.PointLight(0xffffff, 200, 50)
    pointLight1.position.set(pstn.x, pstn.y + 15, pstn.z)
    pointLight1.castShadow = true

    scene.add(pointLight1)
    scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00))

    // Podium
    let podium;
    let loaderr = new GLTFLoader.GLTFLoader().load('model/podium_large/scene.gltf', function (result) {
        podium = result.scene.children[0];
        podium.scale.set(0.02, 0.03, 0.04)
        podium.position.set(pstn.x, pstn.y, pstn.z)
        if(pstn.x > 0){
            podium.rotation.z = 1.6
        } 
        else {
            podium.rotation.z = 4.75
        }
        
        // podium.material = new THREE.Mesh({ receivesShadow: true });
        scene.add(podium)
    });

    return new Promise((resolve, reject) => {
        let dino;
        let animation;
        let mixer;
        let action;

        const loader = new GLTFLoader.GLTFLoader()

        loader.load(gltfPath, function (result) {
            animation = result.animations;
            mixer = new THREE.AnimationMixer(result.scene);
            action = mixer.clipAction(animation[aniNUm]);
            action.play();

            dino = result.scene.children[0];
            dino.scale.set(scl, scl, scl);

            dino.rotation.z = r
            dino.position.set(pstn.x, pstn.y, pstn.z);
            scene.add(dino);

            resolve(mixer);

        }, undefined, reject);
    });
}