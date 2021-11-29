import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import { AnimationClip } from './scripts/three.module.js';
import { VectorKeyframeTrack } from './scripts/three.module.js';
import { AnimationMixer } from './scripts/three.module.js';
import TWEEN, { Tween } from './scripts/tween.esm.js'

export class BurgerObject extends THREE.Group {
    constructor() {
      super();
      this.modelUrl = './burger.glb';
      this.onCreate();
      this.animEnded = false;
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
        this.position.set(-3.95,.3,0);
        this.scale.set(.8, .8, .8);
    }
    move(){ 
      this.position.x = -3.95;
      
      const firstmove = new TWEEN.Tween(this.position)
         .to({
            x: 1.5
         }, 2000)
         .easing(TWEEN.Easing.Linear.None)
      

      const secondmove = new TWEEN.Tween(this.position)
      .to({
        x:3.95
      },1000)
      .delay(0)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(() => {this.animEnded = true;
      })
  

      firstmove.chain(secondmove);
      firstmove.start()
      }
      
    
    dispose() {
    }
  }