import {
    audioManager,
    background,
    canvas, cardButtonHolder, cardViewer,
    colourHex,
    colours,
    continueButton,
    debug,
    dm,
    game,
    grid, highScoreEl,
    loading,
    playerOneScoreEl,
    playerTwoScoreEl,
    pm,
    scoreManager,
    scoresEl,
    squadrons,
    startButton,
    stopButton,
} from './constants/constants.js';
import { deltaTime } from './service/delta-time.js';
import SquadronFactory from './factory/squadron-factory.js';
import UI from './user-interface/ui.js';
import GameOver from './user-interface/display-game-over.js';
import enemyQueue from './data/enemy-drones/enemy-queue.js';

let fpsInterval, startTime, now, then, elapsed;
let highScore = window.localStorage.getItem('drone-squadron-high-score') || 0;
debug.initialiseListeners();

startButton.onclick = async function() {
    startButton.style.display = 'none';
    cardButtonHolder.style.display = 'none';
    canvas.style.display = 'block'
    await cardViewer.deinit();
    document.getElementById('debug-bar').style.display = 'flex';
    await initialise();
};

continueButton.onclick = async function() {
    continueButton.style.display = 'none';
    await initialise();
};

stopButton.onclick = async () => {
    cardButtonHolder.style.display = 'block';
    continueButton.style.display = 'none';
    await cardViewer.init();
    game.state = 'stopped';
    game.rank = 0;
    canvas.style.display = 'none'
    scoreManager.reset();
    audioManager.stop('music');
    startButton.style.display = 'block';
    document.getElementById('debug-bar').style.display = 'none';
    scoresEl.style.display = 'none';
};

window.onresize = async() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    background.update();
    background.draw();
};

window.onload = async() => {
    loading.style.display = 'block';
    await cardViewer.init();
    highScoreEl.innerText = highScore;
    await audioManager.setAudioFile('explosion', 'assets/audio/sound/explosion_1.wav');
    await audioManager.setAudioFile('pulse-rifle', 'assets/audio/sound/pulse-rifle.wav');
    await audioManager.setAudioFile('arc-gun', 'assets/audio/sound/arc-gun.wav');
    await audioManager.setAudioFile('phase-rifle', 'assets/audio/sound/phase-rifle.wav');
    await audioManager.setAudioFile('fusion-cannon', 'assets/audio/sound/fusion-cannon.wav');
    await audioManager.setAudioFile('plasma-cannon', 'assets/audio/sound/plasma-cannon.wav');
    await audioManager.setAudioFile('music', 'assets/audio/music.mp3', 'audio/mpeg');
    loading.style.display = 'none';
    startAnimating(60);
};

async function initialise() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    audioManager.play('music', 0.4, true);
    dm.init();
    pm.init();
    grid.init();
    await setupDrones();
    if(game.rank === 0) {
        scoreManager.resetPlayerOne();
    }
    scoreManager.resetPlayerTwo();
    scoresEl.style.display = 'flex';
    playerOneScoreEl.style.color = colours[squadrons[0].colour];
    playerTwoScoreEl.style.color = colours[squadrons[1].colour];
    continueButton.style.color = colours[squadrons[0].colour];
    continueButton.style.borderColor = colours[squadrons[0].colour];
    game.state = 'playing';
}

async function fetchEnemySquadron(rank) {
    const enemy = enemyQueue[rank];
    const enemySquadronData = await fetch(
        `./data/enemy-drones/${enemy.id}_${enemy.seed}/squadron.json`);
    return await enemySquadronData.json();
}

async function fetchPlayerSquadron() {
    const playerSquadronData = await fetch(
        `./data/player-drones/squadron.json`);
    return await playerSquadronData.json();
}

async function setupDrones() {
    squadrons.splice(0, squadrons.length);
    const enemy = await fetchEnemySquadron(game.rank);
    const player = await fetchPlayerSquadron();
    const c1 = player.colour;
    let c2;
    do {
        c2 = ~~(Math.random() * 6);
    } while(c2 === c1);
    [
        {
            id: 1, colour: colourHex[c1], name: 'Squadron ' + player.leader,
            drones: player.drones.map((d, i) => ({id: i, ...d})),
        },
        {
            id: 2, colour: colourHex[c2], name: 'Squadron ' + enemy.leader,
            drones: enemy.drones.map((d, i) => ({id: i + player.drones.length + 1, ...d})),
        },
    ].map(s => squadrons.push(SquadronFactory.make(s)));
}

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function setFrameTimeData() {
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}

function animate() {
    background.draw();
    deltaTime.update();
    if(game.state === 'playing' || game.state === 'game-over') {
        pm.update();
        dm.update();
        grid.draw();
        grid.log();
        playerOneScoreEl.innerText = scoreManager.playerOneScore.toString();
        playerTwoScoreEl.innerText = scoreManager.playerTwoScore.toString();
        UI.displaySquadData();
        if(game.state === 'playing' && squadrons[0]?.health > 0 && squadrons[1]?.health <= 0) {
            game.rank++;
            if(game.rank !== 100) continueButton.style.display = 'block';
        }
        if(game.state === 'playing' && squadrons[0]?.health <= 0 && squadrons[1]?.health > 0) {
            game.rank = 0;
            if(scoreManager.playerOneScore > highScore) {
                highScore = scoreManager.playerOneScore;
                window.localStorage.setItem('drone-squadron-high-score', highScore);
                highScoreEl.innerText = highScore;
            }
        }
        if(squadrons[0]?.health <= 0 || squadrons[1]?.health <= 0) game.state = 'game-over';
    }
    if(game.state === 'game-over') {
        new GameOver().draw(game.rank);
    }
    requestAnimationFrame(animate);
    setFrameTimeData();
}
