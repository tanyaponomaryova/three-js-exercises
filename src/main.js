import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "./assets/models/Character.gltf?url";
import textureUrl from "./assets/models/Текстура.png?url";
import binUrl from "./assets/models/Character.bin?url";

console.log();
console.log();
console.log();

// Загрузка модельки
console.log(GLTFLoader);
const gltfLoader = new GLTFLoader();
gltfLoader.load(modelUrl, (gltf) => {
  console.log("success");
  console.log(gltf);
  gltf.scene.scale.set(0.25, 0.25, 0.25);
  gltf.scene.position.y = -1;
  scene.add(gltf.scene);

  // Пиксельные текстурки
  const model = gltf.scene;
  // Рекурсивно проходим по всем частям модели
  model.traverse((child) => {
    if (child.isMesh) {
      // Проверяем материал
      if (Array.isArray(child.material)) {
        // Если материал - массив (несколько материалов на mesh)
        child.material.forEach((mat) => {
          setPixelatedTexture(mat);
        });
      } else if (child.material) {
        // Если материал один
        setPixelatedTexture(child.material);
      }
    }
  });

  scene.add(model);
});
// Функция для настройки всех текстур материала
function setPixelatedTexture(material) {
  // Список всех возможных текстур в материале
  const textureProps = [
    "map",
    "normalMap",
    "roughnessMap",
    "metalnessMap",
    "aoMap",
    "emissiveMap",
    "alphaMap",
    "displacementMap",
  ];

  textureProps.forEach((prop) => {
    if (material[prop]) {
      const texture = material[prop];
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false; // Отключаем мип-мапы
      texture.needsUpdate = true; // Обновляем текстуру
    }
  });
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Создание Scene
const scene = new THREE.Scene();

// Создание Mesh
const geometryA = new THREE.BoxGeometry(0.7, 0.7, 0.7);
const materialA = new THREE.MeshBasicMaterial({ color: "red" });
const cubeA = new THREE.Mesh(geometryA, materialA);
cubeA.position.z = -1;

const geometryB = new THREE.BoxGeometry(0.5, 0.5, 2);
const materialB = new THREE.MeshBasicMaterial({ color: "#00ff00" });
const cubeB = new THREE.Mesh(geometryB, materialB);
cubeB.position.z = -1;
cubeB.position.x = 1;

//Создание Group
const group = new THREE.Group();
// group.add(cubeA);
// group.add(cubeB);
// scene.add(group);

// Camera
const camera = new THREE.PerspectiveCamera(
  100,
  sizes.width / sizes.height,
  0.05,
  1000,
);
scene.add(camera);
camera.position.z = 0.5;
camera.position.x = 0.5;
camera.position.y = 0.5;
// camera.lookAt(new THREE.Vector3(0, 0, 3));

//AxesHelper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: false,
  // antialias: true,
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Размер пикселей
renderer.setPixelRatio(0.3);

// Создание OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = true;
controls.enableDamping = true;
controls.enablePan = false;
controls.target = new THREE.Vector3(0, 0.5, 0);
// controls.enableZoom = false;

function tick() {
  //Update objects
  // group.rotation.z += 0.01;
  // group.rotation.y += 0.02;
  // group.rotation.x += 0.03;

  //Render
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
}
tick();

// Ресайз
window.addEventListener("resize", () => {
  // Обновить sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Обновить camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Обновить renderer
  renderer.setSize(sizes.width, sizes.height);
});
