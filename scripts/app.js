import * as THREE from './dependencies/three.module.js';
import { GLTFLoader } from './dependencies/GLTFLoader.js';
import {OrbitControls} from './dependencies/OrbitControls.js';
import TWEEN, { Tween } from './dependencies/tween.esm.js';
import { loadStatus , Burger, Kitchen, loaded } from './load.js';
import gsap from './dependencies/gsap/index.js';

//TESTS GO HERE START
var score = 0;

//TESTS GO HERE END
const scene = new THREE.Scene();
const burger = new Burger()
const kitchen = new Kitchen()

scene.add(burger);
scene.add(kitchen);
//Loading
//loadAll(scene)
burger.animate()



  


function main(){
}

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(4,4,0)
scene.add(directionalLight);

//Camera
const width = 4;
const height = width * (812/375);
const camera = new THREE.OrthographicCamera(width / -2,width / 2,height / 2,height / -2, 1, 100);
camera.position.set(.2,2,4);
camera.lookAt(0,0,0);

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
renderer.setSize(375, 812);
//var controls = new OrbitControls( camera, renderer.domElement );

//Tick
const tick = function() {
    //controls.update()
    requestAnimationFrame(tick);
    render();
    TWEEN.update();
    
    main()
    document.getElementById('points').innerText = score;
    //console.log(scene)
}

const render = () => {renderer.render(scene,camera)}
tick();


/*
boundaries for iron
right: x = 0.3,
left: x = -0.6
*/ 
renderer.domElement.addEventListener('click', () =>{
    
    if(burger.position.x >= -0.6 && burger.position.x <= 0.3 ){
        console.log('hit');
        score+=1;
        burger.scale.y = .1
        burger.stop()
        burger.resume()
    }else{
        console.log('no hit');
        score-=1
    }
    
})  
document.getElementById('points').innerText = score;
document.body.appendChild(renderer.domElement)
