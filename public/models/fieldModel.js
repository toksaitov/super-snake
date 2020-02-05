import AppleModel from './appleModel.js'

export default class FieldModel {
    static defaultFieldWidth = 100;
    static defaultFieldHeight = 100;
    static defaultFieldColor = 'white';

    constructor(width, height, color) {
        this._width  = width  || FieldModel.defaultFieldWidth;
        this._height = height || FieldModel.defaultFieldHeight;
        this._color  = color  || FieldModel.defaultFieldColor;
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

    createApple(snakes) {
        this._apple = new AppleModel(this, snakes);
    }

    areCoordinatesInside(x, y) {
        return x >= 0 && x < this._width &&
               y >= 0 && y < this._height;
    }

    serialize() {
        return {
            'width': this._width,
            'height': this._height,
            'color': this._color,
            'apple': this._apple.serialize()
        }
    }
}