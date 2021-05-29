import Gimbal from '../gimbal.js';

export default class G360 extends Gimbal {
    constructor() {
        super(0.175 * 15, 0.16);
    }
}
