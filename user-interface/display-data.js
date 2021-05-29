import { colours, context } from '../constants/constants.js';

export default class DisplayData {
    constructor(x, y, colour, align = 'left', size = 16) {
        this.x = x;
        this.y = y;
        this.align = align;
        this.size = size;
        this.lines = [];
        this._colour = colour;
    }

    set colour(value) {
        this._colour = value;
    }

    addLine(text) {
        this.lines.push(text);
    }

    textStyle() {
        context.textAlign = this.align;
        context.font = this.size + 'px Verdana';
        context.fillStyle = colours[this._colour];
    }

    draw() {
        this.textStyle();
        this.lines.map((line, index) => {
            context.fillText(
                line,
                this.x,
                this.y + (index + 1) * (this.size * 1.2),
            );
        });
    }
}
