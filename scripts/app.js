import * as THREE from './dependencies/three.module.js';
import { GLTFLoader } from './dependencies/GLTFLoader.js';
import {OrbitControls} from './dependencies/OrbitControls.js';
import TWEEN, { Tween } from './dependencies/tween.esm.js';
import {  loadAssets } from './load.js';
import gsap from './dependencies/gsap/index.js';
import { Animation } from './animations.js';

//TESTS GO HERE START
var score = 0;

//TESTS GO HERE END
const scene = new THREE.Scene();

const animate = new Animation()


//Loading

const { kitchen, burger} = await loadAssets();
scene.add(kitchen,burger);
animate.model = burger;
animate.output();
console.log(animate.model)
animate.startAnimation()
//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(4,4,0)
scene.add(directionalLight);

//Camera
const width = 8;
const height = width * (812/375);
const camera = new THREE.OrthographicCamera(width / -2,width / 2,height / 2,height / -2, 1, 100);
camera.position.set(.2,2,4);
camera.lookAt(0,0,0);


//Main game
function gameOn(){
    /* 
    - Basic
    - Nerd
    - Skater
    - Muppie

    */
}

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
renderer.setSize(375, 812);
var controls = new OrbitControls( camera, renderer.domElement );

//Tick

const clock = new THREE.Clock();
const tick = function() {
    controls.update()
    requestAnimationFrame(tick);
    render();
    document.getElementById('points').innerText = score;  
    
    if(burger.position.x<0.3 && animate.smashStatus() == false){
        console.log('-1 punto');
    }
}

const render = () => {renderer.render(scene,camera)}
tick();



renderer.domElement.addEventListener('click', () =>{
    if(burger.position.x >= -0.6 && burger.position.x <= 0.3 ){
        console.log('hit');
        score+=1;
        animate.setSmash();
    }else{
        animate.unsetSmash();
        console.log('no hit');
        document.querySelector('.ui-board').style = 'z-index:0;display:flex';
        document.getElementById('score').innerText = score;
    }
    
})  
document.getElementById('points').innerText = score;
document.body.appendChild(renderer.domElement)
