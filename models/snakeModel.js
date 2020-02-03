export default class SnakeModel {
    constructor(x, y, length, field) {
        this._body = [];
        for (let i = 0; i < length; ++i) {
            this._body.push({ x, y });
        }
        this._head = 0;
        this._dx = 1;
        this._dy = 0;
        this._speed = 55; // [1..60]
        this._moveRequestDivisor = Math.max(60 - this._speed, 1);
        this._moveRequestCount = 0;
        this._color = 'green';
        this._score = 0;
        this._field = field;
        this._isDead = false;
    }

    get score() {
        return this._score;
    }

    get body()  {
        return this._body;
    }

    get color() {
        return this._color;
    }

    get isDead() {
        return this._isDead;
    }

    turnUp() {
        if (this._dy !== 1) {
            this._dx = 0;
            this._dy = -1;
        }
    }

    turnDown() {
        if (this._dy !== -1) {
            this._dx = 0;
            this._dy = 1;
        }
    }

    turnLeft() {
        if (this._dx !== 1) {
            this._dx = -1;
            this._dy = 0;
        }
    }

    turnRight() {
        if (this._dx !== -1) {
            this._dx = 1;
            this._dy = 0;
        }
    }

    isCollidingWithBody(x, y) {
        for (const segment of this._body) {
            if (segment.x === x && segment.y === y) {
                return true;
            }
        }

        return false;
    }

    move() {
        if (this._isDead) return;
        if (this._moveRequestCount++ % this._moveRequestDivisor !== 0) return;

        const head = this._body[this._head];

        let nextX = head.x + this._dx;
        let nextY = head.y + this._dy;

        if (this._field.areCoordinatesInside(nextX, nextY) && !this.isCollidingWithBody(nextX, nextY)) {
            this._head = (this._head + 1) % this._body.length;
            if (this._field.apple.isColliding(nextX, nextY)) {
                this._field.createApple(this);
                this._score++;
                this._body.splice(this._head, 0, { 'x': nextX, 'y': nextY });
            } else {
                this._body[this._head] = { 'x': nextX, 'y': nextY };
            }
        } else {
            this._isDead = true;
            this._color = 'gray';
        }
    }
}