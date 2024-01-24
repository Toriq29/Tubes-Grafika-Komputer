import * as THREE from "../node_modules/three/build/three.module.js";
import * as GLTFLoader from "../node_modules/three/examples/jsm/loaders/GLTFLoader.js";

export function dinosaurus(scene, gltfPath, aniNUm, scl, r, pstn) {
  // point light
  const pointLight1 = new THREE.PointLight(0xffffff, 200, 50);
  pointLight1.position.set(pstn.x, pstn.y + 15, pstn.z);
  pointLight1.castShadow = true;

  scene.add(pointLight1);
  // scene.add(new THREE.PointLightHelper(pointLight1, 0.2, 0x00ff00))

  // Podium
  let podium;
  let loaderr = new GLTFLoader.GLTFLoader().load(
    "model/podium_large/scene.gltf",
    function (result) {
      podium = result.scene.children[0];
      podium.scale.set(0.02, 0.03, 0.04);
      podium.position.set(pstn.x, pstn.y, pstn.z);
      if (pstn.x > 0) {
        podium.rotation.z = 1.6;
      } else {
        podium.rotation.z = 4.75;
      }

      // podium.material = new THREE.Mesh({ receivesShadow: true });
      scene.add(podium);
    }
  );

  return new Promise((resolve, reject) => {
    let dino;
    let animation;
    let mixer;
    let action;

    const loader = new GLTFLoader.GLTFLoader();

    loader.load(
      gltfPath,
      function (result) {
        animation = result.animations;
        mixer = new THREE.AnimationMixer(result.scene);
        action = mixer.clipAction(animation[aniNUm]);
        action.play();

        dino = result.scene.children[0];
        dino.scale.set(scl, scl, scl);

        dino.rotation.z = r;
        dino.position.set(pstn.x, pstn.y, pstn.z);
        scene.add(dino);

        resolve(mixer);
      },
      undefined,
      reject
    );
  });
}

export function informationPopUp(
  name,
  description1,
  description2
) {
  const dino = document.getElementById("popup-container");
  const nameInfo = document.getElementById("name");
  const desc1 = document.getElementById("desc1");
  const desc2 = document.getElementById("desc2");

  dino.style.display = "block";
  nameInfo.innerHTML = name;
  desc1.innerHTML = description1;
  desc2.innerHTML = description2;

}

export function dinoDescription() {
  let dinoDesc = [];
  // dino kanan - pertama
  let nameTyrano = "Tyrannosaurus";
  let descTyrano1 =
    'Tyrannosaurus (/tɪˌrænəˈsɔːrəs, taɪ-/;) is a genus of large theropod dinosaur. The type species Tyrannosaurus rex (rex meaning "king" in Latin), often called T. rex or colloquially T-Rex, is one of the best represented theropods. It lived throughout what is now western North America, on what was then an island continent known as Laramidia. Tyrannosaurus had a much wider range than other tyrannosaurids. Fossils are found in a variety of rock formations dating to the Maastrichtian age of the Upper Cretaceous period, 72.7 to 66 million years ago. It was the last known member of the tyrannosaurids and among the last non-avian dinosaurs to exist before the Cretaceous–Paleogene extinction event.';
  let descTyrano2 =
    "Tyrannosaurus is the type genus of the superfamily Tyrannosauroidea, the family Tyrannosauridae, and the subfamily Tyrannosaurinae; in other words it is the standard by which paleontologists decide whether to include other species in the same group. Other members of the tyrannosaurine subfamily include the North American Daspletosaurus and the Asian Tarbosaurus, both of which have occasionally been synonymized with Tyrannosaurus. Tyrannosaurids were once commonly thought to be descendants of earlier large theropods such as megalosaurs and carnosaurs, although more recently they were reclassified with the generally smaller coelurosaurs.";
  dinoDesc.push(nameTyrano);
  dinoDesc.push(descTyrano1);
  dinoDesc.push(descTyrano2);

  // dino kanan - kedua
  let nameStego = "Stegosaurus";
  let descStego1 =
    "Stegosaurus (/ˌstɛɡəˈsɔːrəs/;) is a genus of herbivorous, four-legged, armored dinosaur from the Late Jurassic, characterized by the distinctive kite-shaped upright plates along their backs and spikes on their tails. Fossils of the genus have been found in the western United States and in Portugal, where they are found in Kimmeridgian- to Tithonian-aged strata, dating to between 155 and 145 million years ago. Of the species that have been classified in the upper Morrison Formation of the western US, only three are universally recognized: S. stenops, S. ungulatus and S. sulcatus. The remains of over 80 individual animals of this genus have been found.";
  let descStego2 =
    "Stegosaurus would have lived alongside dinosaurs such as Apatosaurus, Diplodocus, Camarasaurus and Allosaurus, the latter of which may have preyed on it. With a length of up to 30 feet, Stegosaurus exhibited a unique posture with longer hindlimbs, likely facilitating slow, lumbering movement. While its exact purpose remains debated, the bony plates may have played a role in thermoregulation, aiding the dinosaur in regulating body temperature. Fossil discoveries in North America, particularly in states like Colorado and Wyoming, have contributed to our understanding of this iconic dinosaur, placing Stegosaurus among the well-known and popularized prehistoric creatures in the realm of paleontology.";
  dinoDesc.push(nameStego);
  dinoDesc.push(descStego1);
  dinoDesc.push(descStego2);

  // dino kanan - ketiga
  let nameVelo = "Velociraptor";
  let descVelo1 =
    "Velociraptor (/vəˌlɒsɪˈræptər, vəˈlɒsɪræptər/;) is a genus of small dromaeosaurid dinosaurs that lived in Asia during the Late Cretaceous epoch, about 75 million to 71 million years ago. Two species are currently recognized, although others have been assigned in the past. The type species is V. mongoliensis, named and described in 1924. Fossils of this species have been discovered in the Djadochta Formation, Mongolia. A second species, V. osmolskae, was named in 2008 for skull material from the Bayan Mandahu Formation, China.";
  let descVelo2 =
    "Velociraptor is one of the dinosaur genera most familiar to the general public due to its prominent role in the Jurassic Park films. In reality, however, Velociraptor was roughly the size of a turkey, considerably smaller than the approximately 2 m (6.6 ft) tall and 90 kg (200 lb) reptiles seen in the novels and films (which were based on members of the related genus Deinonychus). Today, Velociraptor is well known to paleontologists, with over a dozen described fossil skeletons. One particularly famous specimen preserves a Velociraptor locked in combat with a Protoceratops.";
  dinoDesc.push(nameVelo);
  dinoDesc.push(descVelo1);
  dinoDesc.push(descVelo2);

  
  let namePtero = "Pterosaurs";
  let descPtero1 =
    'Pterosaurs (/ˈtɛrəsɔːr, ˈtɛroʊ-/; from Greek pteron and sauros, meaning "wing lizard") are an extinct clade of flying reptiles in the order Pterosauria. They existed during most of the Mesozoic: from the Late Triassic to the end of the Cretaceous (228 to 66 million years ago). Pterosaurs are the earliest vertebrates known to have evolved powered flight. Their wings were formed by a membrane of skin, muscle, and other tissues stretching from the ankles to a dramatically lengthened fourth finger.';
  let descPtero2 =
    "Pterosaurs are often referred to by popular media or the general public as flying dinosaurs, but dinosaurs are defined as the descendants of the last common ancestor of the Saurischia and Ornithischia, which excludes the pterosaurs. Pterosaurs are nonetheless more closely related to birds and other dinosaurs than to crocodiles or any other living reptile, though they are not bird ancestors. Pterosaurs are also colloquially referred to as pterodactyls, particularly in fiction and journalism. However, technically, pterodactyl may refer to members of the genus Pterodactylus, and more broadly to members of the suborder Pterodactyloidea of the pterosaurs.";
  dinoDesc.push(namePtero);
  dinoDesc.push(descPtero1);
  dinoDesc.push(descPtero2);

  let nameTricera = "Triceratops";
  let descTricera1 =
    'Triceratops (/traɪˈsɛrətɒps/ try-SERR-ə-tops;) is a genus of chasmosaurine ceratopsian dinosaur that lived during the late Maastrichtian age of the Late Cretaceous period, about 68 to 66 million years ago in what is now western North America. It was one of the last-known non-avian dinosaurs and lived until the Cretaceous–Paleogene extinction event 66 million years ago. The name Triceratops, which literally means three-horned face, is derived from the Greek words trí- (τρί-) meaning three, kéras (κέρας) meaning horn, and ṓps (ὤψ) meaning face.';
  let descTricera2 =
    "Bearing a large bony frill, three horns on the skull, and a large, four-legged body, exhibiting convergent evolution with bovines and rhinoceroses, Triceratops is one of the most recognizable of all dinosaurs and the best-known ceratopsian. It was also one of the largest, up to 8–9 metres (26–30 ft) long and 5–9 metric tons (5.5–9.9 short tons) in body mass. It shared the landscape with and was most likely preyed upon by Tyrannosaurus, though it is less certain that two adults would battle in the fanciful manner often depicted in museum displays and popular media. The functions of the frills and three distinctive facial horns on its head have inspired countless debates. Traditionally, these have been viewed as defensive weapons against predators. More recent interpretations find it probable that these features were primarily used in species identification, courtship, and dominance display, much like the antlers and horns of modern ungulates.";
  dinoDesc.push(nameTricera);
  dinoDesc.push(descTricera1);
  dinoDesc.push(descTricera2);

  return dinoDesc;
}
