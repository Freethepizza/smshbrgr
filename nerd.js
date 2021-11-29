import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import TWEEN from './scripts/tween.esm.js'

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
    move(){
      this.position.x = -3.95;
      
      const firstmove = new TWEEN.Tween(this.position)
         .to({
            x: -.8
         }, 2000)
         .easing(TWEEN.Easing.Linear.None)
      

      const secondmove = new TWEEN.Tween(this.position)
      .to({
        x:-1.5
      },250)
      .delay(250)
      .easing(TWEEN.Easing.Linear.None)
      
      const thirdmove = new TWEEN.Tween(this.position)
      .to({
        x:3.95
      },750)
      .delay(750)
      .easing(TWEEN.Easing.Linear.None)

      firstmove.chain(secondmove);
      secondmove.chain(thirdmove);
      firstmove.start()
    }
    dispose() {
    }
  }