import Weapon from '../abstract/weapon.js';
import PulseShot from '../ammo/pulse-shot.js';
import { audioManager, context } from '../../constants/constants.js';

export default class PulseRifle extends Weapon {
    constructor(drone, x, y, angle, gimbal) {
        const fireRate = 2.3;
        const round = PulseShot;
        super(drone, 'Pulse Rifle', '#8aa', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(6, -1);
        context.lineTo(6, 1);
        context.lineTo(0, 1);
        context.lineTo(0, -1);
        this.applyStroke();
        this.applyFill();
        context.resetTransform();
    }

    fire() {
        super.fire();
        audioManager.play('pulse-rifle', 0.3);
    }
}
