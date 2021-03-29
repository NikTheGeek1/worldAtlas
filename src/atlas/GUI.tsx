import WebGLBoilerplate from "./WebGLBoilerplate";
import * as THREE from 'three/build/three.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

type materialOptions = {
    side: {
        "FrontSide": THREE.Side,
        "BackSide": THREE.Side,
        "DoubleSide": THREE.Side,
    }
};
type meshPhongMaterialData = {
    color: number,
    emissive: number,
    specular: number,
};
type planeData = {
    width: number,
    height: number,
    widthSegments: number,
    heightSegments: number,
};
class GUIClass {
    private WebGLBoilerplate: WebGLBoilerplate;
    private materialOptions: materialOptions;
    private meshPhongMaterialData: meshPhongMaterialData;
    private planeData: planeData;
    private GUI!: GUI;
    constructor(WebGLBoilerplate: WebGLBoilerplate) {
        this.WebGLBoilerplate = WebGLBoilerplate;
        this.materialOptions = {
            side: {
                "FrontSide": THREE.FrontSide,
                "BackSide": THREE.BackSide,
                "DoubleSide": THREE.DoubleSide,
            }
        };
        this.meshPhongMaterialData = {
            color: this.WebGLBoilerplate.material.color.getHex(),
            emissive: this.WebGLBoilerplate.material.emissive.getHex(),
            specular: this.WebGLBoilerplate.material.specular.getHex()
        };
        this.planeData = {
            width: 3.6,
            height: 1.8,
            widthSegments: 360,
            heightSegments: 180
        };
    }


    private createGUI(): void {
        this.GUI = new GUI();
    }

    private createMaterialGUI(): void {
        const materialFolder = this.GUI.addFolder('THREE.Material');
        materialFolder.add(this.WebGLBoilerplate.material, 'transparent');
        materialFolder.add(this.WebGLBoilerplate.material, 'opacity', 0, 1, 0.01);
        materialFolder.add(this.WebGLBoilerplate.material, 'depthTest');
        materialFolder.add(this.WebGLBoilerplate.material, 'depthWrite');
        materialFolder.add(this.WebGLBoilerplate.material, 'alphaTest', 0, 1, 0.01).onChange(() => this.updateMaterial.bind(this));
        materialFolder.add(this.WebGLBoilerplate.material, 'visible');
        materialFolder.add(this.WebGLBoilerplate.material, 'side', this.materialOptions.side).onChange(() => this.updateMaterial.bind(this));
    }

    private createMeshPhongMaterialGUI(): void {
        const meshPhongMaterialFolder = this.GUI.addFolder('THREE.meshPhongMaterialFolder');
        meshPhongMaterialFolder.addColor(this.meshPhongMaterialData, 'color').onChange(() => { this.WebGLBoilerplate.material.color.setHex(Number(this.meshPhongMaterialData.color.toString().replace('#', '0x'))) });
        meshPhongMaterialFolder.addColor(this.meshPhongMaterialData, 'emissive').onChange(() => { this.WebGLBoilerplate.material.emissive.setHex(Number(this.meshPhongMaterialData.emissive.toString().replace('#', '0x'))) });
        meshPhongMaterialFolder.addColor(this.meshPhongMaterialData, 'specular').onChange(() => { this.WebGLBoilerplate.material.specular.setHex(Number(this.meshPhongMaterialData.specular.toString().replace('#', '0x'))) });
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'shininess', 0, 1024);
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'wireframe');
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'flatShading').onChange(() => this.updateMaterial.bind(this));
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'reflectivity', 0, 1);
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'refractionRatio', 0, 1);
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'displacementScale', -1, 1, 0.01);
        meshPhongMaterialFolder.add(this.WebGLBoilerplate.material, 'displacementBias', -1, 1, 0.01);
    }

    private createTextureGUI(): void {
        const textureFolder = this.GUI.addFolder("Texture");
        textureFolder.add(this.WebGLBoilerplate.texture.repeat, 'x', 0.1, 1, 0.1);
        textureFolder.add(this.WebGLBoilerplate.texture.repeat, 'y', 0.1, 1, 0.1);
        textureFolder.add(this.WebGLBoilerplate.texture.center, 'x', 0, 1, 0.001);
        textureFolder.add(this.WebGLBoilerplate.texture.center, 'y', 0, 1, 0.001);
    }

    private createPlaneGUI(): void {
        const planePropertiesFolder = this.GUI.addFolder("PlaneGeometry");
        planePropertiesFolder.add(this.planeData, 'widthSegments', 1, 360).onChange(this.regeneratePlaneGeometry.bind(this));
        planePropertiesFolder.add(this.planeData, 'heightSegments', 1, 180).onChange(this.regeneratePlaneGeometry.bind(this));

    }

    private updateMaterial(): void {
        this.WebGLBoilerplate.material.side = Number(this.WebGLBoilerplate.material.side);
        this.WebGLBoilerplate.material.needsUpdate = true;
    }

    private regeneratePlaneGeometry(): void {
        const newGeometry = new THREE.PlaneGeometry(
            this.planeData.width, this.planeData.height, this.planeData.widthSegments, this.planeData.heightSegments
        );
        this.WebGLBoilerplate.plane.geometry.dispose();
        this.WebGLBoilerplate.plane.geometry = newGeometry;
    }

    public addGUIs(): void {
        this.createGUI();
        this.createMaterialGUI();
        this.createMeshPhongMaterialGUI();
        this.createTextureGUI();
        this.createPlaneGUI();
    }
}

export default GUIClass;