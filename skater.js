import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';

export class SkaterObject extends THREE.Group {
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
        this.position.set(-1,.3,0);
        this.scale.set(.4, .4, .4);
    }
    dispose() {
    }
  }