import FieldView from './fieldView.js'

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class AppleView {
    static draw(ctx, apple) {
        const cellX = FieldView.centeringShiftX + apple.x * FieldView.cellWidth;
        const cellY = FieldView.centeringShiftY + apple.y * FieldView.cellHeight;

        const [x, y] = [cellX, cellY];
        const [width, height] = [FieldView.cellWidth - 1, FieldView.cellHeight - 1];
        DrawingHelpers.fillRect(ctx, x, y, width, height, apple.color);
    }
}
