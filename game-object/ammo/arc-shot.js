import Bullet from '../abstract/bullet.js';
import { colours, context, spriteManager } from '../../constants/constants.js';

export default class ArcShot extends Bullet {
    constructor(drone, x, y, angle, velocity) {
        super(drone, x, y, 38, 3, angle, velocity, 1);
        this._colour = colours.ice;
        this._sprite = spriteManager.getSprite('arc-shot')
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.vector.getAngle() + (Math.PI / 180) * 90);
        context.translate(this._sprite.x, this._sprite.y);
        context.drawImage(this._sprite.sprite, 0, 0, this._sprite.width, this._sprite.height);
        context.resetTransform();
    }
}
