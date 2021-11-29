import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import { AnimationClip } from './scripts/three.module.js';
import { VectorKeyframeTrack } from './scripts/three.module.js';
import { AnimationMixer } from './scripts/three.module.js';
import TWEEN, { Tween } from './scripts/tween.esm.js'

export class IronObject extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './iron.glb';
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
        this.position.set(0,1.5,0);
    }
    move(){ 
        this.position.y = 1.5;

        const firstmove = new TWEEN.Tween(this.position)
         .to({
            y: 0
         }, 100)
         .easing(TWEEN.Easing.Linear.None)

        const secondmove = new TWEEN.Tween(this.position)
        .to({y:1.5},50)
        .delay(100)
        .easing(TWEEN.Easing.Linear.None)

        firstmove.chain(secondmove);
        firstmove.start()
      }
      
    
    dispose() {
    }
  }