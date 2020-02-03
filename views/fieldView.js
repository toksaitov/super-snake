import AppleView from "./appleView.js";

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class FieldView {
    static cellWidth  = 20;
    static cellHeight = 20;
    static centeringShiftX;
    static centeringShiftY;
    
    static recalculateDrawingSizes(screenWidth, screenHeight, field) {
        const fieldPixelWidth = field.width * this.cellWidth;
        const fieldPixelHeight = field.height * this.cellWidth;
        this.centeringShiftX = (screenWidth - fieldPixelWidth) / 2;
        this.centeringShiftY = (screenHeight - fieldPixelHeight) / 2;
    }

    static draw(ctx, field) {
        for (let i = 0; i < field.height; i++) {
            for (let j = 0; j < field.width; j++) {
                const cellX = this.centeringShiftX + j * this.cellWidth;
                const cellY = this.centeringShiftY + i * this.cellHeight;
                
                const [x, y] = [cellX, cellY];
                const [width, height] = [this.cellWidth - 1, this.cellHeight - 1];
                DrawingHelpers.fillRect(ctx, x, y, width, height, field.color);
            }
        }

        if (field.apple) {
            AppleView.draw(ctx, field.apple);
        }
    }
}