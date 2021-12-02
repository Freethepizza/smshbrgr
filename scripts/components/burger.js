import * as THREE from '../dependencies/three.module.js';
import {GLTFLoader} from '../dependencies/GLTFLoader.js';
import TWEEN from '../dependencies/tween.esm.js';


const loader = new GLTFLoader();
let data = new THREE.Object3D();

export const burgerModel = () =>{
  loader.load('../../assets/burger.glb', (gltf) =>{
    gltf.scene.name = 'burger';
    return gltf.scene;
  });
}