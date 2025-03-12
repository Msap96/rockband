import * as THREE from 'three';

export class Scene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        
        // Stage lighting
        this.lights = [];
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Setup camera
        this.camera.position.z = 5;

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);

        // Add stage lights
        this.setupStageLights();

        // Add stage geometry
        this.setupStage();
    }

    setupStageLights() {
        const colors = [0xff0000, 0x00ff00, 0x0000ff];
        colors.forEach((color, index) => {
            const light = new THREE.SpotLight(color, 1);
            light.position.set(Math.cos(index * Math.PI * 2 / 3) * 3, 2, Math.sin(index * Math.PI * 2 / 3) * 3);
            light.lookAt(0, 0, 0);
            this.scene.add(light);
            this.lights.push(light);
        });
    }

    setupStage() {
        // Create stage platform
        const geometry = new THREE.BoxGeometry(10, 0.2, 5);
        const material = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const stage = new THREE.Mesh(geometry, material);
        stage.position.y = -2;
        this.scene.add(stage);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        // Animate stage lights
        this.lights.forEach((light, index) => {
            const time = Date.now() * 0.001;
            light.position.x = Math.cos(time + index * Math.PI * 2 / 3) * 3;
            light.position.z = Math.sin(time + index * Math.PI * 2 / 3) * 3;
            light.lookAt(0, 0, 0);
        });

        this.renderer.render(this.scene, this.camera);
    }
}