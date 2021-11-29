import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import TWEEN from './scripts/tween.esm.js'

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
        this.position.set(-3.95,.3,0);
        this.scale.set(.8, .8, .8);
    }
    move(){
      //x1-x2-x2.5
      this.position.x = -3.95;

      const firstmove = new TWEEN.Tween(this.position)
         .to({
            x: -1.5
         }, 1000)
         .easing(TWEEN.Easing.Linear.None)

      const secondmove = new TWEEN.Tween(this.position)
         .to({
            x: 0
         }, 150)
         .easing(TWEEN.Easing.Linear.None)
      
      const thirdmove = new TWEEN.Tween(this.position)
      .to({
         x: 3.95
      }, 150)
      .easing(TWEEN.Easing.Linear.None)

      firstmove.chain(secondmove);
      secondmove.chain(thirdmove)
      firstmove.start()
    }
    dispose() {
    }
  }