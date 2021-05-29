import Bullet from '../abstract/bullet.js';
import { colours, context, spriteManager } from '../../constants/constants.js';

export default class PhaseShot extends Bullet {
    constructor(drone, x, y, angle, velocity) {
        super(drone, x, y, 52, 5, angle, velocity, 16);
        this._colour = colours.acid;
        this._sprite = spriteManager.getSprite('phase-shot')
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle() + (Math.PI / 180) * 90);
        context.translate(this._sprite.x, this._sprite.y);
        context.drawImage(this._sprite.sprite, 0, 0, this._sprite.width, this._sprite.height);
        context.resetTransform();
    }
}
