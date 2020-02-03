export default class DrawingHelpers {
    static fillRect(ctx, x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fill();
    }

    static clearScreen(ctx, screenWidth, screenHeight) {
        this.fillRect(ctx, 0, 0, screenWidth, screenHeight, 'black');
    }

    static fillText(ctx, text, x, y, font, color, align) {
        ctx.fillStyle = color;
        ctx.textAlign = align || 'center';
        ctx.font = font;
        ctx.fillText(text, x, y);
    }
}
