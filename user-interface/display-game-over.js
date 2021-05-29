import { canvas, colours, squadrons } from '../constants/constants.js';
import DisplayData from './display-data.js';

export default class GameOver extends DisplayData {
    constructor() {
        super(canvas.width / 2, canvas.height / 2 - 70, colours.white, 'center', 32);
    }

    draw(rank) {
        if(squadrons.length !== 2) return;
        if(squadrons[0].health > squadrons[1].health) {
            this.addLine(squadrons[0].name + ' Wins');
            this.addLine(`Level ${rank} Cleared`);
            this.colour = squadrons[0].colour
        } else if(squadrons[1].health > squadrons[0].health) {
            this.addLine(squadrons[1].name + ' Wins');
            this.addLine('Game Over');
            this.colour = squadrons[0].colour
        } else {
            this.addLine('Draw');
        }
        super.draw();
    }
}
