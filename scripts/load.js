import * as THREE from './dependencies/three.module.js';
import { GLTFLoader } from './dependencies/GLTFLoader.js';

var loaded = false;
const manager = new THREE.LoadingManager();
const loader = new GLTFLoader(manager);

const loadFromFile = (
    path,model_name,
    scene_instance, 
    scale_x,
    scale_y,
    scale_z,
    position_x,
    position_y,
    position_z) => {
    loader.load(path, (glb) => {
        glb.scene.name = model_name; 
        glb.scene.scale.set(scale_x,scale_y,scale_z); 
        glb.scene.position.set(position_x,position_y,position_z);
        scene_instance.add(glb.scene);})
} 

export function loadAll(scene_instance){
    loadFromFile('../assets/burger.glb','burger',scene_instance,.3,.3,.3,1,1.1,-.3);
    loadFromFile('../assets/kitchen.glb','kitchen', scene_instance,3,3,3,0,0,0);
}

export function loadStatus(){
    return loaded;
}

function loadProgress(queue,total){
    if(queue === total){
        console.log('loaded bitch')
        loaded = true
    }
}

manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};
manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    loadProgress(itemsLoaded,itemsTotal)
};
manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};