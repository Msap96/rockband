import * as THREE from 'three';

export class NoteHighway {
    constructor() {
        this.notes = [];
        this.speed = 0.05;
        this.spawnInterval = 1000; // ms
        this.lastSpawnTime = 0;
    }

    init(scene) {
        this.scene = scene;
        
        // Create highway geometry
        const geometry = new THREE.PlaneGeometry(4, 20);
        const material = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a,
            transparent: true,
            opacity: 0.8
        });
        
        this.highway = new THREE.Mesh(geometry, material);
        this.highway.rotation.x = -Math.PI / 3;
        this.highway.position.z = 2;
        this.highway.position.y = -1;
        
        this.scene.scene.add(this.highway);
    }

    spawnNote() {
        const geometry = new THREE.BoxGeometry(0.8, 0.3, 0.1);
        const material = new THREE.MeshPhongMaterial({
            color: Math.random() * 0xffffff
        });
        
        const note = new THREE.Mesh(geometry, material);
        note.position.y = 8;
        note.position.x = (Math.floor(Math.random() * 4) - 1.5) * 0.8;
        note.rotation.x = -Math.PI / 3;
        
        this.notes.push(note);
        this.scene.scene.add(note);
    }

    update() {
        const currentTime = Date.now();
        
        // Spawn new notes
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.spawnNote();
            this.lastSpawnTime = currentTime;
        }

        // Update existing notes
        for (let i = this.notes.length - 1; i >= 0; i--) {
            const note = this.notes[i];
            note.position.y -= this.speed;

            // Remove notes that are out of view
            if (note.position.y < -3) {
                this.scene.scene.remove(note);
                this.notes.splice(i, 1);
            }
        }
    }
}