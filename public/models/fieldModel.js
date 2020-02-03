import AppleModel from './appleModel.js'

export default class FieldModel {
    constructor(width, height, color) {
        this._width = width;
        this._height = height;
        this._color = color || 'white';
    }

    get width() {
        return this._width;
    }
    
    get height() {
        return this._height;
    }

    get color() {
        return this._color;
    }

    get apple() {
        return this._apple;
    }

    createApple(snake) {
        this._apple = new AppleModel(this, snake);
    }

    areCoordinatesInside(x, y) {
        return x >= 0 && x < this._width &&
               y >= 0 && y < this._height;
    }
}