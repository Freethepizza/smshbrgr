import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';

export class BurgerObject extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './burger.glb';
      this.onCreate();
    }
    onCreate() {
      new GLTFLoader().load(
        this.modelUrl,
        gltf => {
          this.updateTransform();
          this.add(gltf.scene);
        }
      );
    }
    updateTransform() {
        this.name = 'burger';
        this.position.set(-1.5,.3,0);
        this.scale.set(.8, .8, .8);
    }
    dispose() {
    }
  }