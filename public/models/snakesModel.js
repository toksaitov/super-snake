import SnakeModel from './snakeModel.js'

export default class SnakesModel {
    constructor(field) {
        this._snakes = {}
        this._spawnPoints = [
            { 'x': 0,                'y': 0,                'dx':  1, 'dy': 0 },
            { 'x': field.width - 1,  'y': 0,                'dx': -1, 'dy': 0 },
            { 'x': field.width - 1,  'y': field.height - 1, 'dx': -1, 'dy': 0 },
            { 'x': 0,                'y': field.height - 1, 'dx':  1, 'dy': 0 }
        ];
        this._field = field;
    }

    get snakes() {
        return this._snakes;
    }

    spawnSnake(id) {
        const spawnPoint = this._spawnPoints.shift();
        if (!spawnPoint) {
            return undefined;
        }

        const snake = this._snakes[id] =
            new SnakeModel(
                spawnPoint.x, spawnPoint.y,
                spawnPoint.dx, spawnPoint.dy,
                3,
                this._field
            );
        
        return snake;
    }

    isCollidingWithBody(x, y) {
        const snakes = Object.values(this._snakes);
        for (const snake of snakes) {
            if (snake.isCollidingWithBody(x, y)) {
                return true;
            }
        }
        return false;
    }

    move() {
        const snakes = Object.values(this._snakes);
        for (const snake of snakes) {
            snake.move(this);
        }
    }

    serialize() {
        const serializedSnakes = {};
        for (const [id, snake] of Object.entries(this._snakes)) {
            serializedSnakes[id] = snake.serialize();
        }

        return serializedSnakes;
    }
}