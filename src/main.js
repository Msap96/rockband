import * as THREE from 'three';
import { Scene } from './scene';
import { NoteHighway } from './noteHighway';
import { GameManager } from './gameManager';

class Game {
    constructor() {
        this.scene = new Scene();
        this.noteHighway = new NoteHighway();
        this.gameManager = new GameManager();
        
        this.init();
        this.animate();
    }

    init() {
        // Initialize game components
        this.scene.init();
        this.noteHighway.init(this.scene);
        this.gameManager.init();

        // Setup event listeners
        window.addEventListener('resize', () => this.onWindowResize(), false);
        document.addEventListener('keydown', (event) => this.handleKeyPress(event));
    }

    handleKeyPress(event) {
        this.gameManager.handleInput(event.key);
    }

    onWindowResize() {
        this.scene.onResize();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.noteHighway.update();
        this.gameManager.update();
        this.scene.render();
    }
}

// Start the game
const game = new Game();