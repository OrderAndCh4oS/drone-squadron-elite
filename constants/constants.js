import ParticleManager from '../manager/particle-manager.js';
import DroneManager from '../manager/drone-manager.js';
import GameGrid from '../user-interface/game-grid.js';
import Debug from '../dev/debug.js';
import Background from '../service/background.js';
import AudioManager from '../manager/audio-manager.js';
import SpriteManager from '../manager/sprite-manager.js';
import { chassis, gimbals, scanners, steering, thrusters } from './utilities.js';
import { weapons } from './weapons.js';
import ScoreManager from '../manager/score-manager.js';
import CardViewer from '../card-viewer/card-viewer.js';

export const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const cardViewer = new CardViewer();
export const highScoreEl = document.getElementById('high-score')
export const scoresEl = document.getElementById('scores')
export const playerOneScoreEl = document.getElementById('player-one-score')
export const playerTwoScoreEl = document.getElementById('player-two-score')
export const colours = {
    black: '#515151',
    white: '#b3dce2',
    orange: '#ee6c09',
    acid: '#08f50c',
    ice: '#08f5c6',
    red: '#d20931',
    greyOne: '#fafafa',
    greyTwo: '#cdcdcd',
    greyThree: '#8d8d8d',
    green: '#3ff37b',
    blue: '#2b59e5',
    candy: '#FF2BE4',
    toxic: '#33FF9F',
    'constructivist-real': '#FF4100',
    'order-and-chaos': '#FFF73D',
    'pistachio-and-peach': '#9C36B3',
    'warm-grey': '#F2DABD',
};

export const startButton = document.getElementById('start-button');
export const continueButton = document.getElementById('continue-button');
export const stopButton = document.getElementById('stop');
export const loading = document.getElementById('loading');
export const cardButtonHolder = document.getElementById('card-button-holder');
export const game = {
    rank: 0,
    state: 'stopped',
};
export const friction = 0.8;
export const context = canvas.getContext('2d');
export const debug = new Debug();
export const background = new Background();
export const grid = new GameGrid();
export const squadrons = [];
export const dm = new DroneManager();
export const pm = new ParticleManager();
export const audioManager = new AudioManager();
export const scoreManager = new ScoreManager();
export const spriteManager = new SpriteManager([
    {
        name: 'pulse-shot', filePath: './assets/projectiles/pulse-shot.png',
        width: 8, height: 11,
        x: -4, y: -6,
    },
    {
        name: 'phase-shot', filePath: './assets/projectiles/phase-shot.png',
        width: 10, height: 13,
        x: -5, y: -6.5,
    },
    {
        name: 'fusion-shot', filePath: './assets/projectiles/fusion-shot.png',
        width: 14, height: 9,
        x: -7, y: -4.5,
    },
    {
        name: 'plasma-shot', filePath: './assets/projectiles/plasma-shot.png',
        width: 20, height: 13,
        x: -10, y: -6.5,
    },
    {
        name: 'arc-shot', filePath: './assets/projectiles/arc-shot.png',
        width: 6, height: 6,
        x: -6, y: -3,
    },
]);
export const colourHex = [
    'constructivist-real',
    'candy',
    'warm-grey',
    'toxic',
    'pistachio-and-peach',
    'order-and-chaos'
];
export const chassisValues = Object.values(chassis);
export const weaponValues = Object.values(weapons);
export const scannerValues = Object.values(scanners);
export const thrusterValues = Object.values(thrusters);
export const steeringValues = Object.values(steering);
export const gimbalValues = Object.values(gimbals);
