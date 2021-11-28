import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';

export class NerdObject extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './nerd.glb';
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
      this.position.set(-.2,0,0);
      this.scale.set(.5, .5, .5);
    }
    dispose() {
    }
  }