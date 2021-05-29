export default class ScoreManager {
    _playerOneScore = 0
    _playerTwoScore = 0

    get playerOneScore() {
        return this._playerOneScore;
    }

    get playerTwoScore() {
        return this._playerTwoScore;
    }

    tallyKill(bullet, drone) {
        switch(bullet.squadId) {
            case 1:
                this._playerOneScore += ~~(drone.value * 100) * 100;
                break;
            case 2:
                this._playerTwoScore += ~~(drone.value * 100) * 100;
                break;
        }
    }

    reset() {
        this._playerOneScore = 0
        this._playerTwoScore = 0
    }

    resetPlayerOne() {
        this._playerOneScore = 0
    }

    resetPlayerTwo() {
        this._playerTwoScore = 0
    }
}
