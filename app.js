import * as THREE from './scripts/three.module.js';
import {GLTFLoader} from './scripts/GLTFLoader.js';
import {OrbitControls} from './scripts/OrbitControls.js'


const scene = new THREE.Scene();
var loader = new GLTFLoader();


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
        //First row 
        /*
        const topLeft = () => {addModel(-1.5,-1.5,'topLeft');}//Left
        const topCenter = () => {addModel(0,-1.5, 'topCenter');}//Center
        const topRight = () => {addModel(1.5,-1.5, 'topRight')}//Right
        */

        //Second row
        //const centerLeft = () => {addModel(-1.5,0,'centerLeft');}//Left
        const centerCenter = () => {addModel(0,0, 'centerCenter');}//Center
        const centerRight = () => {addModel(1.5,0, 'centerRight');}//Right

        /*
        //Third row
        const bottomLeft = () => {addModel(-1.5,1.5, 'bottomLeft');}//Left
        const bottomCenter = () => {addModel(0,1.5, 'bottomCenter');}//Center
        const bottomRight  = () => {addModel(1.5,1.5, 'bottomRight');}//Right
        */
       
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
                let burger = scene.getObjectByName('burger');
                let table = scene.getObjectByName('table');

                /*if (table){
                    table.rotation.y += 0.01;
                    console.log(table.rotation.y)
                }*/

                if (scene.getObjectByName('burger')){
                    burger.position.x += 0.05;
                    if(burger.position.x >= 3){
                        burger.position.x = -3
                    }

                }  
			};
            console.log(scene.children)
			animate();

            
            
            

        document.body.appendChild(renderer.domElement)