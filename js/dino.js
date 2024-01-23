import * as THREE from '../node_modules/three/build/three.module.js'
import * as GLTFLoader from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js'

export function dinosaurus(scene, gltfPath, aniNUm, scl, r, pstn) {

    // point light
    const pointLight1 = new THREE.PointLight(0xffffff, 200, 50)
    pointLight1.position.set(pstn.x, pstn.y + 15, pstn.z)
    pointLight1.castShadow = true

    scene.add(pointLight1)
    // scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00))

    // Podium
    let podium;
    let loaderr = new GLTFLoader.GLTFLoader().load('model/podium_large/scene.gltf', function (result) {
        podium = result.scene.children[0];
        podium.scale.set(0.02, 0.03, 0.04)
        podium.position.set(pstn.x, pstn.y, pstn.z)
        if (pstn.x > 0) {
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


export function informationPopUp(cameraPosition, name, description1, description2) {

    const dino = document.getElementById("popup-container");
    const nameInfo = document.getElementById("name");
    const desc1 = document.getElementById("desc1");
    const desc2 = document.getElementById("desc2");

    dino.style.display = 'block'
    nameInfo.innerHTML = name
    desc1.innerHTML = description1
    desc2.innerHTML = description2

    // if (
    //     cameraPosition.x >= batas.x1 &&
    //     cameraPosition.x <= batas.x2 &&
    //     cameraPosition.y >= 2 &&
    //     cameraPosition.y <= 4 &&
    //     cameraPosition.z <= batas.z1 &&
    //     cameraPosition.z >= batas.z2
    // ) {
    //     // Show information about Tyrannosaurus
    //     dino.style.display = 'block'
    //     nameInfo.innerHTML = name
    //     desc1.innerHTML = description1
    //     desc2.innerHTML = description2

    // } else {
    //     // Hide information if the camera is not in the specified position
    //     dino.style.display = 'none'
    // }
}



export function dinoDescription() {

    let dinoDesc = []

    let nameTyrano = "TyrannoSaurus"
    let descTyrano1 = 'Tyrannosaurus, atau sering disingkat sebagai "Tyrano-saurus," adalah genus dinosaur yang termasuk dalam kelompok Theropoda dan dikenal sebagai salah satu predator besar dari periode Late Cretaceous. Dinosaurus ini hidup sekitar 68 hingga 66 juta tahun yang lalu dan merupakan salah satu anggota terbesar dari keluarga Tyrannosauridae. Dinamakan demikian karena ukurannya yang besar dan reputasinya sebagai pemangsa puncak.'
    let descTyrano2 = 'Tyrannosaurus rex, atau T. rex, adalah spesies yang paling terkenal di dalam genus ini. Dengan ciri-ciri seperti tengkorak besar, rahang yang kuat dengan gigi yang besar, dan tubuh yang kokoh, T. rex diperkirakan merupakan salah satu predator terkuat pada zamannya. Meskipun mungkin tidak bisa berlari dengan cepat, dino ini memiliki kecerdasan yang tinggi dan gigi-gigi yang dirancang untuk merobek daging, membuatnya menjadi predator yang menakutkan dalam ekosistem prasejarah. Fosil-fosil Tyrannosaurus rex telah menjadi sumber penelitian dan ketertarikan ilmiah yang besar dalam studi paleontologi.'
    dinoDesc.push(nameTyrano)
    dinoDesc.push(descTyrano1)
    dinoDesc.push(descTyrano2)

    let nameStego = "Stegosaurus"
    let descStego1 = 'Stegosaurus adalah jenis dinosaurus herbivora yang hidup pada periode Jurassic sekitar 155 hingga 150 juta tahun yang lalu. Dinosaurus ini dikenal dengan ciri khas punggungnya yang dilapisi oleh sejumlah besar lempengan tulang besar yang disebut osteoderma. Osteoderma ini membentuk barisan deretan gada atau piringan-piringan seperti struktur yang melintang di sepanjang punggungnya. Stegosaurus memiliki dua pasang tanduk besar yang melengkung di bagian belakang tengkoraknya, sering kali dianggap sebagai alat pertahanan dari pemangsa. Meskipun tubuhnya yang besar dan berat, Stegosaurus diyakini memiliki otak kecil untuk ukuran tubuhnya, dan diperkirakan memiliki gaya hidup yang lambat dan cenderung memakan tanaman rendah.'
    let descStego2 = 'Dinosaurus ini memiliki panjang sekitar 9 meter dan tinggi sekitar 4 meter. Pada ekornya, terdapat sepasang sepasang cakar yang berujung tajam yang mungkin digunakan sebagai alat pertahanan atau untuk berkomunikasi dengan sesama Stegosaurus. Meskipun tidak memiliki gigi yang tajam, Stegosaurus memiliki gigi berkembang yang digunakan untuk mengunyah tanaman. Meskipun telah lama punah, penemuan fosil-fosil Stegosaurus telah memberikan wawasan yang berharga tentang kehidupan dan evolusi dinosaurus pada masa Jurassic.'
    dinoDesc.push(nameStego)
    dinoDesc.push(descStego1)
    dinoDesc.push(descStego2)

    let nameVelo = "Velociraptor"
    let descVelo1 = 'Velociraptor merupakan salah satu dinosaurus karnivora yang hidup pada periode Cretaceous sekitar 85 hingga 70 juta tahun yang lalu. Dinamakan "velociraptor" yang berarti "pencuri cepat" dalam bahasa Latin, dinosaurus ini dikenal dengan tubuh yang ramping dan cekung, serta kaki yang panjang yang memungkinkannya bergerak dengan cepat. Velociraptor memiliki ciri khas cakar tajam yang melengkung di setiap kaki, yang digunakan untuk merobek dan menangkap mangsa. Meskipun ukurannya relatif kecil, sekitar 2 meter panjangnya, kecerdikan dan kecepatan Velociraptor membuatnya menjadi predator yang tangguh.'
    let descVelo2 = 'Dalam kelompok, Velociraptor diyakini berburu secara berkelompok untuk menyerang mangsa yang lebih besar. Para ilmuwan telah menemukan bukti fosil Velociraptor bersama-sama dengan fosil dinosaurus yang lebih besar, menunjukkan kemungkinan strategi berburu kolektif. Keberadaan Velociraptor terkenal di kalangan masyarakat modern terutama diperkenalkan oleh film-film seperti Jurassic Park, meskipun film tersebut sering kali memberikan gambaran yang berlebihan tentang ukuran dan perilaku sebenarnya dari dinosaurus ini.'
    dinoDesc.push(nameVelo)
    dinoDesc.push(descVelo1)
    dinoDesc.push(descVelo2)

    let namePreto = "Pterodactyl"
    let descPtero1 = 'Pterodactyl, atau lebih tepatnya disebut Pterodactyloidea, adalah kelompok dinosaurus terbang yang hidup pada periode Mesozoikum, khususnya pada periode Jurassic dan Cretaceous. Meskipun sering kali disebut sebagai "pterodactyl," sebenarnya ini merujuk pada satu spesies, sedangkan Pterodactyloidea mencakup berbagai jenis dinosaurus terbang, termasuk Pteranodon dan Quetzalcoatlus. Dinosaurus ini memiliki tubuh yang ringan, sayap yang besar, dan membran sayap yang menyerupai jaring laba-laba, memungkinkan mereka untuk terbang dengan leluasa di udara. Pterodactyl umumnya memiliki tengkorak yang ringan, dengan moncong panjang dan rahang yang dilengkapi dengan gigi untuk menangkap dan memakan ikan serta hewan kecil lainnya.'
    let descPtero2 = 'Meskipun disebut sebagai dinosaurus, Pterodactyl sebenarnya lebih dekat hubungannya dengan kelompok hewan modern yang dikenal sebagai pterosaurus. Mereka adalah makhluk yang unik dalam evolusi dinosaurus, menampilkan adaptasi khusus untuk hidup dan berburu di udara. Meskipun tidak lagi ada di bumi, penemuan fosil-fosil Pterodactyl telah memberikan informasi berharga tentang sejarah evolusi dan kehidupan pada masa prasejarah.'
    dinoDesc.push(namePreto)
    dinoDesc.push(descPtero1)
    dinoDesc.push(descPtero2)

    let nameTri = "Triceratops"
    let descTri1 = 'Triceratops adalah salah satu dinosaurus herbivora terkenal yang hidup pada periode Cretaceous, sekitar 68 hingga 66 juta tahun yang lalu. Dinamakan dari kata Latin yang berarti "wajah tiga tanduk," Triceratops dikenal dengan ciri khas tanduk yang menonjol dari tengkoraknya. Tanduk pertamanya berada di bagian hidung, sedangkan dua tanduk lainnya melengkung di atas matanya. Selain tanduk, Triceratops juga memiliki lempeng tulang besar yang membentuk benteng di bagian belakang tengkoraknya. Tubuhnya yang besar dan kuat serta kaki yang kokoh membuatnya menjadi herbivora yang mampu melindungi diri dari pemangsa.'
    let descTri2 = 'Triceratops adalah salah satu dinosaurus terakhir yang hidup sebelum kepunahan massal pada akhir periode Cretaceous. Dinosaurus ini memiliki panjang sekitar 8 hingga 9 meter dan tinggi sekitar 3 meter. Makanan utamanya terdiri dari tanaman rendah dan semak-semak. Triceratops sering kali dianggap sebagai ikon dinosaurus herbivora dan menjadi salah satu spesies yang paling dikenal dalam budaya populer, sering muncul dalam buku anak-anak, film, dan berbagai media lainnya.'
    dinoDesc.push(nameTri)
    dinoDesc.push(descTri1)
    dinoDesc.push(descTri2)

    return dinoDesc

}