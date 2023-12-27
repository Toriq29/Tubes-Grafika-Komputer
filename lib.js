
import * as THREE from './node_modules/three/build/three.module.js'
import * as pointerLock from './node_modules/three/examples/jsm/controls/PointerLockControls.js'
import * as GLTFLoader from './node_modules/three/examples/jsm/loaders/GLTFLoader.js'


export function PerspectiveCamera() {
    const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    cam.position.z = 7;
    cam.position.y = 1;

    return cam
}

export function threeJs(cam) {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(renderer.domElement);
    const controls = new pointerLock.PointerLockControls(cam, renderer.domElement)

    return { scene, renderer, controls }
}

export function proccesKeyboard(keyboard, controls) {
    let speed = 0.1

    if (keyboard['w']) {
        controls.moveForward(speed)
    }
    if (keyboard['s']) {
        controls.moveForward(-speed)
    }

    if (keyboard['a']) {
        controls.moveRight(-speed)
    }
    if (keyboard['d']) {
        controls.moveRight(speed)
    }
}

export function lighting(scene) {
    // point light
    const pointLight = new THREE.PointLight(0xffffff, 400, 50)
    pointLight.position.set(0, 10, -30)
    pointLight.castShadow = true
    scene.add(pointLight)
    scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0x00ff00))


}

export function dinosaurus(scene, gltfPath, aniNUm, scl, texturePath, r, pstn) {

    // point light
    const pointLight1 = new THREE.PointLight(0xffffff, 200, 50)
    pointLight1.position.set(pstn.x, pstn.y + 10, pstn.z)
    pointLight1.castShadow = true

    scene.add(pointLight1)
    scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00))

    let podium;
    let loaderr = new GLTFLoader.GLTFLoader().load('model/podium_large/scene.gltf', function (result) {
        podium = result.scene.children[0];
        podium.scale.set(0.02, 0.02, 0.04)
        podium.position.set(pstn.x, pstn.y, pstn.z)
        podium.rotation.z = 1.6
        podium.material = new THREE.Mesh({ receivesShadow: true });
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

            let textureLoader = new THREE.TextureLoader();
            textureLoader.load(texturePath, function (texture) {
                dino.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.map = texture;
                        child.material.side = THREE.DoubleSide;
                        // child.receiveShadow = true;
                        child.castShadow = true
                    }
                });
                dino.rotation.z = r
                dino.position.set(pstn.x, pstn.y, pstn.z);
                scene.add(dino);

                resolve(mixer);
            });
        }, undefined, reject);
    });
}

