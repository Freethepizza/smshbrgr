import * as THREE from './dependencies/three.module.js';
import { GLTFLoader } from './dependencies/GLTFLoader.js';
import gsap from './dependencies/gsap/index.js';

export var loaded = [];
const manager = new THREE.LoadingManager();
const loader = new GLTFLoader();

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
/*gltf => {
            this.updateTransform();
            this.add(gltf.scene);
        }*/ 
const t1 = gsap.timeline({repeat:-1, repeatDelay:1});
export class Burger extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './assets/burger.glb';
      this.onCreate();
    }
    async onCreate() {
      await loader.loadAsync(this.modelUrl)
      .then((gltf)=>{
        this.updateTransform();
        this.add(gltf.scene);
      });
    }    
    updateTransform() {
        this.scale.set(.3, .3, .3);
        this.position.set(1,0,-.3)
    }
    animate(){
        t1.to(this.position,{y:1.1,duration:1})
        t1.to(this.position,{z:2.2,duration:1})
        t1.to(this.position,{x:-1.4,duration:.5})
        t1.to(this.position,{z:-0.6,duration:1})
        t1.to(this.position,{y:0,duration:1})
        t1.play()
    }
    stop(){
        t1.pause()
    }
    resume(){
        t1.resume()
    }
    dispose() {
    }
}

export class Kitchen extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './assets/kitchen.glb';
      this.onCreate();
    }
    onCreate() {
      new GLTFLoader(manager).load(
        this.modelUrl,
        gltf => {
          this.updateTransform();
          this.add(gltf.scene);
        }
      );
    }    
    updateTransform() {
        this.scale.set(3, 3, 3);
    }
    animate(){
        const t1 = gsap.timeline({repeat:-1, repeatDelay:1});
        t1.to(this.position,{z:2.2,duration:1})
        t1.to(this.position,{x:-1.4,duration:.5})
        t1.to(this.position,{z:.3,duration:1})
        t1.play()
    }
    dispose() {
    }
  }

export function loadStatus(model){
    loaded.push(model);
}

function loadProgress(queue,total){
    if(queue === total){
        console.log('loaded bitch')
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