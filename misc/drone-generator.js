import { weapons } from '../constants/weapons.js';
import { chassis, gimbals, scanners, steering, thrusters } from '../constants/utilities.js';
import nameGenerator from './name-generator.js';

const droneGenerator = () => {
    const chassisKeys = Object.keys(chassis);
    const weaponKeys = Object.keys(weapons);
    const scannerKeys = Object.keys(scanners);
    const thrusterKeys = Object.keys(thrusters);
    const steeringKeys = Object.keys(steering);
    const gimbalKeys = Object.keys(gimbals);
    return ({
        name: nameGenerator(),
        weapon: ~~(Math.random() * weaponKeys.length),
        gimbal: ~~(Math.random() * gimbalKeys.length),
        scanner: ~~(Math.random() * scannerKeys.length),
        steering: ~~(Math.random() * steeringKeys.length),
        thruster: ~~(Math.random() * thrusterKeys.length),
        chassis: ~~(Math.random() * chassisKeys.length),
    });
}

export default droneGenerator;
