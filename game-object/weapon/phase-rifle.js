import Weapon from '../abstract/weapon.js';
import { audioManager, context } from '../../constants/constants.js';
import PhaseShot from '../ammo/phase-shot.js';

export default class PhaseRifle extends Weapon {
    constructor(drone, x, y, angle, gimbal) {
        const fireRate = 8;
        const round = PhaseShot;
        super(drone, 'Phase Rifle', '#577', x, y, angle, gimbal, round, fireRate);
    }

    draw() {
        context.translate(this.position.x, this.position.y);
        context.rotate(this.gimbal.vector.getAngle() + this.droneAngle);
        context.beginPath();
        context.lineTo(10, -2);
        context.lineTo(10, 2);
        context.lineTo(0, 2);
        context.lineTo(0, -2);
        this.applyStroke();
        this.applyFill();
        context.resetTransform();
    }

    fire() {
        super.fire();
        audioManager.play('phase-rifle', 0.7);
    }
}
