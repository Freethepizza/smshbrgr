import * as THREE from './dependencies/three.module.js';
import { GLTFLoader } from './dependencies/GLTFLoader.js';
import {OrbitControls} from './dependencies/OrbitControls.js';
import TWEEN, { Tween } from './dependencies/tween.esm.js';
import { loadAll, loadStatus } from './load.js';
import gsap from './dependencies/gsap/index.js';

//TESTS GO HERE START
var score = 0;

//TESTS GO HERE END
const scene = new THREE.Scene();

//Loading
loadAll(scene)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
mesh.position.x = 1;
mesh.position.z = .3;
mesh.visible = false;
scene.add( mesh );

/*
boundaries for iron
right: x = 0.3,
left: x = -0.6
*/ 

const t1 = gsap.timeline({repeat:-1, repeatDelay:1});
t1.to(mesh.position,{z:2.2,duration:1})
t1.to(mesh.position,{x:-1.4,duration:1})
t1.to(mesh.position,{z:.3,duration:1})
t1.play()

    


function main(){
    if(loadStatus()){
       /* var burger = scene.getObjectByName('burger');
        burger.position.x = mesh.position.x;
        burger.position.z = mesh.position.z;*/

        
    }else{
        
    }
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
    //console.log(mesh.position.x,mesh.position.z)
    main()
    document.getElementById('points').innerText = score;
}
const render = () => {renderer.render(scene,camera)}
tick();


/*
boundaries for iron
right: x = 0.3,
left: x = -0.6
*/ 
renderer.domElement.addEventListener('click', () =>{
    console.log(mesh.position.x)
    if(mesh.position.x >= -0.6 && mesh.position.x <= 0.3 ){
        console.log('hit');
        score+=1
    }else{
        console.log('no hit');
        score-=1
    }
})  
document.getElementById('points').innerText = score;
document.body.appendChild(renderer.domElement)
