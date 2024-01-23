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

export function informationPopUp(
  cameraPosition,
  name,
  description1,
  description2
) {
  const fossil = document.getElementById("popup-container");
  const nameInfo = document.getElementById("name");
  const desc1 = document.getElementById("desc1");
  const desc2 = document.getElementById("desc2");

  fossil.style.display = "block";
  nameInfo.innerHTML = name;
  desc1.innerHTML = description1;
  desc2.innerHTML = description2;
}
export function fossilDescription() {
  let fossilDesc = [];

  // plateosaurus - kanan pertama
  let namePlateo = "Plateosaurus";
  let descPlateo1 =
    "Plateosaurus was a herbivorous dinosaur that lived during the Late Triassic period, approximately 214 to 204 million years ago. It was a large, quadrupedal dinosaur characterized by distinctive features.";
  let descPlateo2 =
    "Plateosaurus fossils have been found in Europe, particularly in Germany and Switzerland, making it one of the first dinosaurs to be discovered and studied. It belongs to the sauropodomorph group, which includes some of the earliest and largest herbivorous dinosaurs.";
  fossilDesc.push(namePlateo);
  fossilDesc.push(descPlateo1);
  fossilDesc.push(descPlateo2);

  // Tyrannosaurus - kanan kedua
  let nameTyranno = "Tyrannosaurus";
  let descTyranno1 =
    "Tyrannosaurus (/tɪˌrænəˈsɔːrəs, taɪ-/;) from Ancient Greek τύραννος (túrannos) 'tyrant', and σαῦρος (saûros) 'lizard') is a genus of large theropod dinosaur. The type species Tyrannosaurus rex (rex meaning 'king' in Latin), often called T. rex or colloquially T-Rex, is one of the best represented theropods. It lived throughout what is now western North America, on what was then an island continent known as Laramidia.";
  let descTyranno2 =
    "Tyrannosaurus had a much wider range than other tyrannosaurids. Fossils are found in a variety of rock formations dating to the Maastrichtian age of the Upper Cretaceous period, 72.7 to 66 million years ago. It was the last known member of the tyrannosaurids and among the last non-avian dinosaurs to exist before the Cretaceous–Paleogene extinction event.";
  fossilDesc.push(nameTyranno);
  fossilDesc.push(descTyranno1);
  fossilDesc.push(descTyranno2);

  // dodo - kiri pertama
  let nameDodo = "Dodo Fossil";
  let descDodo1 =
    "The dodo (Raphus cucullatus) is an extinct flightless bird that was endemic to the island of Mauritius, which is east of Madagascar in the Indian Ocean. The dodo's closest relative was the also-extinct and flightless Rodrigues solitaire. The two formed the subfamily Raphinae, a clade of extinct flightless birds that were a part of the family which includes pigeons and doves.";
  let descDodo2 =
    "The closest living relative of the dodo is the Nicobar pigeon. A white dodo was once thought to have existed on the nearby island of Réunion, but it is now believed that this assumption was merely confusion based on the also-extinct Réunion ibis and paintings of white dodos.";
  fossilDesc.push(nameDodo);
  fossilDesc.push(descDodo1);
  fossilDesc.push(descDodo2);

  // Triceratops - kiri kedua
  let nameTricera = "Triceratops";
  let descTricera1 =
    "Triceratops (/traɪˈsɛrətɒps/ try-SERR-ə-tops;) is a genus of chasmosaurine ceratopsian dinosaur that lived during the late Maastrichtian age of the Late Cretaceous period, about 68 to 66 million years ago in what is now western North America. The name Triceratops, which literally means three-horned face, is derived from the Greek words trí- (τρί-) meaning three, kéras (κέρας) meaning horn, and ṓps (ὤψ) meaning face.";
  let descTricera2 =
    "Triceratops had a large skull relative to its body size, among the largest of all land animals. The largest-known skull, is estimated to have been 2.5 meters (8.2 ft) in length when complete and could reach almost a third of the length of the entire animal.";
  fossilDesc.push(nameTricera);
  fossilDesc.push(descTricera1);
  fossilDesc.push(descTricera2);

  return fossilDesc;
}
