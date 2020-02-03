import State from "./state.js";
import GameState from "./gameState.js";

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class MenuState extends State {
    constructor() {
        super({
            'enter': () => state = new GameState()
        });
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        const [x, y] = [screenWidth / 2, screenHeight / 2];
        DrawingHelpers.fillText(ctx, 'Super Snake', x, y, '80px sans-serif', 'white');
        DrawingHelpers.fillText(ctx, 'Press Enter to Start', x, y + 70, '30px sans-serif', 'white');
    }
}