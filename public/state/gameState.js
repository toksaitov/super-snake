import State from './state.js';
import GameOverState from './gameOverState.js';

import FieldModel from '../models/fieldModel.js';
import SnakesView from '../views/snakesView.js';

import FieldView from '../views/fieldView.js';

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class GameState extends State {
    constructor() {
        const socket = io();
        
        socket.emit('spawn');
        socket.on('update', data => {
            this._field = data[0];
            this._snakes = data[1];
        });

        super({
            'w': () => socket.emit('command', 'w'),
            'a': () => socket.emit('command', 'a'),
            's': () => socket.emit('command', 's'),
            'd': () => socket.emit('command', 'd')
        });

        this._field = new FieldModel();
        this._snakes = {};
        this._socket = socket;
    }

    get _snake() {
        const id = this._socket.id;
        if (id) {
            return this._snakes[id];
        }

        return undefined;
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        if (this._snake && this._snake.isDead) {
            state = new GameOverState();
            this._socket.disconnect();
        }

        FieldView.recalculateDrawingSizes(screenWidth, screenHeight, this._field);
        FieldView.draw(ctx, this._field);
        SnakesView.draw(ctx, this._snakes);

        if (this._snake) {
            const [x, y] = [screenWidth / 2, 55];
            DrawingHelpers.fillText(ctx, `Score: ${this._snake.score}`, x, y, '38px sans-serif', 'white');
        }
    }
}