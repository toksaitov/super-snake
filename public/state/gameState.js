import State from './state.js';
import PauseState from './pauseState.js';
import GameOverState from './gameOverState.js';

import FieldModel from '../models/fieldModel.js';

import FieldView from '../views/fieldView.js';
import SnakeView from '../views/snakeView.js';

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class GameState extends State {
    constructor() {
        const socket = io();
        
        socket.emit('spawn');
        socket.on('update', data => {
            console.log(data);
        });

        super({
            'w': () => socket.emit('command', 'w'),
            'a': () => socket.emit('command', 'a'),
            's': () => socket.emit('command', 's'),
            'd': () => socket.emit('command', 'd')
        });

        this._field = new FieldModel(25, 25);
        this._socket = socket;
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        FieldView.recalculateDrawingSizes(screenWidth, screenHeight, this._field);
        FieldView.draw(ctx, this._field);

        // const [x, y] = [screenWidth / 2, 55];
        // DrawingHelpers.fillText(ctx, `Score: ${this._snake.score}`, x, y, '38px sans-serif', 'white');
    }
}