export default class Chassis {

    constructor(health) {
        this._health = health;
    }

    get health() {
        return this._health;
    }
}
