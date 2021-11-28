import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import {OrbitControls} from './scripts/OrbitControls.js';
import {BurgerObject} from './burger.js';
import {NerdObject} from './nerd.js';
import {SkaterObject} from './skater.js';
import {MuppieObject} from './muppie.js';
import {RapperObject} from './rapper.js'


const scene = new THREE.Scene();
var loader = new GLTFLoader();


  
const burgerObject = new BurgerObject();
const nerdObject = new NerdObject();
const skaterObject = new SkaterObject();
const muppieObject = new MuppieObject();
const rapperObject = new RapperObject();
scene.add(burgerObject);
scene.add(nerdObject);
scene.add(skaterObject);
scene.add(muppieObject);
scene.add(rapperObject);



        function loadBurger() {
            loader.load('./burger.glb', (gltf) =>{
                gltf.scene.name = 'burger';
                gltf.scene.position.set(-1.5,.3,0);
                gltf.scene.scale.set(.8,.8,.8);
                gltf.scene.castShadow = true;
                scene.add(gltf.scene);
                console.log(gltf)
            });   
        }
        function loadTable() {
            loader.load('./table.glb', (gltf) =>{
                gltf.scene.name = 'table';
                gltf.scene.position.set(0,-2.2,0);
                gltf.scene.rotation.set(0,1.55,0);
                scene.add(gltf.scene);
                console.log(gltf)
            });   
        }
        function loadIron() {
            loader.load('./iron.glb', (gltf) =>{
                gltf.scene.name = 'iron';
                gltf.scene.position.set(0,1.5,0);
                gltf.scene.number = 7;
                scene.add(gltf.scene);
            });   
        }
        loadTable()
        loadBurger();
        loadIron();
        //loadBurgerAnim();
        const addModel = (x,y,name) => {
            const geometry = new THREE.CylinderGeometry(.5,.5,.2,20)
            const material = new THREE.MeshLambertMaterial({ color: 'yellow' })
            const mesh = new THREE.Mesh(geometry,material);
            mesh.position.set(x,.3,y);
            mesh.rotation.set(0,0,0);
            mesh.name = name;
            scene.add(mesh);
            console.log()
        }
       
        function randomOutput(){
            let row_number = Math.floor(Math.random() * (2 + 1));
            let model_number = Math.floor(Math.random() * (2 + 1));
            return [row_number,model_number]
        }


        //Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10,20,0)
        scene.add(directionalLight);

        //Camera
        const width = 4;
        const height = width * (812/375);
        const camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2,
            1,
            100
        );
        
        window.setInterval(function(){
            document.querySelector('#a').innerHTML = randomOutput();
            
        }, 800);


        camera.position.set(4,4,4);
        camera.lookAt(0,0,0)

        //Renderer
        const renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
        renderer.setSize(375, 812);
        var controls = new OrbitControls( camera, renderer.domElement );
        
        var id;
        const animate = function () {
				id = requestAnimationFrame( animate );
				renderer.render( scene, camera );
                controls.update();            
			};
			animate();
            
        document.body.appendChild(renderer.domElement)