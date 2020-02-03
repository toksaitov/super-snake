import State from "./state.js";

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class PauseState extends State {
    constructor(previousState) {
        super({
            ' ': () => state = previousState
        });
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        const [x, y] = [screenWidth / 2, screenHeight / 2];
        DrawingHelpers.fillText(ctx, 'Press Space to Continue', x, y, '30px sans-serif', 'white');
    }
}