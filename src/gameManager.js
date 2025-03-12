export class GameManager {
    constructor() {
        this.score = 0;
        this.combo = 1;
        this.maxCombo = 1;
    }

    init() {
        this.scoreElement = document.getElementById('score');
        this.comboElement = document.getElementById('combo');
        this.updateUI();
    }

    handleInput(key) {
        // Handle key inputs for notes
        const validKeys = ['1', '2', '3', '4', ' '];
        if (validKeys.includes(key)) {
            // TODO: Check if key press matches with note timing
            this.addScore(100);
            this.increaseCombo();
        } else {
            this.resetCombo();
        }
    }

    addScore(points) {
        this.score += points * this.combo;
        this.updateUI();
    }

    increaseCombo() {
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.updateUI();
    }

    resetCombo() {
        this.combo = 1;
        this.updateUI();
    }

    updateUI() {
        this.scoreElement.textContent = `Score: ${this.score}`;
        this.comboElement.textContent = `Combo: x${this.combo}`;
    }

    update() {
        // Update game state each frame
    }
}