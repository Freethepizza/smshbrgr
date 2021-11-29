import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import {OrbitControls} from './scripts/OrbitControls.js';
import {BurgerObject} from './burger.js';
import {NerdObject} from './nerd.js';
import {SkaterObject} from './skater.js';
import {MuppieObject} from './muppie.js';
import {RapperObject} from './rapper.js';
import { IronObject } from './iron.js';
import TWEEN from './scripts/tween.esm.js'


const scene = new THREE.Scene();
var loader = new GLTFLoader();


const ironObject = new IronObject();
const burgerObject = new BurgerObject();
const nerdObject = new NerdObject();
const skaterObject = new SkaterObject();
const muppieObject = new MuppieObject();
const rapperObject = new RapperObject();
//scene.add(burgerObject);
//scene.add(nerdObject);
//scene.add(skaterObject);
scene.add(burgerObject);
scene.add(muppieObject);
//scene.add(rapperObject);
        function loadTable() {
            loader.load('./table.glb', (gltf) =>{
                gltf.scene.name = 'table';
                gltf.scene.position.set(0,-2.2,0);
                gltf.scene.rotation.set(0,1.55,0);
                scene.add(gltf.scene);
            });   
        }
        function loadIron() {
            loader.load('./iron.glb', (gltf) =>{
                gltf.scene.name = 'iron';
                gltf.scene.position.set(0,1.5,0);
                scene.add(gltf.scene);
            });   
        }
        loadTable()
        scene.add(ironObject);
        function randomOutput(){
            let model_number = Math.floor(Math.random() * (3 + 1));
            return model_number
        }

        

        //Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10,20,0)
        scene.add(directionalLight);

        //Camera
        const width = 5;
        const height = width * (812/375);
        const camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            100
        );
        
        
        

        camera.position.set(4,4,4);
        camera.lookAt(0,0,0)
        const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
        renderer.setSize(375, 812);
        //var controls = new OrbitControls( camera, renderer.domElement );
        var id;

        burgerObject.move();
        const animate = function () {
				requestAnimationFrame( animate );
				render()
                //controls.update();  
                TWEEN.update();
			};
        
			
        function render(){
            renderer.render( scene, camera );
        }
        animate();

        renderer.domElement.addEventListener('click', () =>{
            ironObject.move()
        })
            
        document.body.appendChild(renderer.domElement)