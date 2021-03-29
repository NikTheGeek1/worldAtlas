import * as THREE from 'three/build/three.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import worldMap from '../imgs/worldColour.5400x2700.jpg';
import gebcoMap from '../imgs/gebco_bathy.5400x2700_8bit.jpg';
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from './GUI';

class WebGLBoilerplate {
    public canvas: HTMLCanvasElement;
    public renderer!: THREE.WebGLRenderer;
    public camera!: THREE.PerspectiveCamera;
    public scene!: THREE.Scene;
    public light!: THREE.PointLight;
    public orbitControls!: OrbitControls;
    public plane!: THREE.Mesh;
    public material!: THREE.MeshPhongMaterial;
    public stats!: Stats;
    public texture!: THREE.Texture;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    private createScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("black");
    }

    private createCamera(): void {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);
        this.camera.position.z = 2;
    }

    private createRenderer(): void {
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private createStats(): void {
        this.stats = Stats();
        document.body.appendChild(this.stats.dom)
    }


    private onWindowResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render();
    }

    private createPointLight(): void {
        this.light = new THREE.PointLight(0xffffff, 2);
        this.light.position.set(0, 5, 10);
        this.scene.add(this.light);
    }

    private animationLoop() {
        requestAnimationFrame(this.animationLoop.bind(this));
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    private createOrbitControls() {
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.screenSpacePanning = true;
    }

    private createPlane() {
        const geometry = new THREE.PlaneGeometry(3.6, 1.8, 360, 180);
        this.material = new THREE.MeshPhongMaterial({wireframe: true});
        this.plane = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.plane);
    }

    private createTexture() {
        this.texture = new THREE.TextureLoader().load(worldMap);
        this.material.map = this.texture;
        const displacementMap = new THREE.TextureLoader().load(gebcoMap);
        this.material.displacementMap = displacementMap;
    }

    public init(): void {
        this.createRenderer();
        this.createCamera();
        this.createScene();
        this.createPlane();
        this.createTexture();
        this.createStats();
        this.createPointLight();
        this.createOrbitControls();
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        new GUI(this).addGUIs();
        this.animationLoop();

    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }

}


export default WebGLBoilerplate;