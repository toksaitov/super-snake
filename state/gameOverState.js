import State from './state.js';
import MenuState from './menuState.js';

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class GameOverState extends State {
    constructor() {
        super({
            'enter': () => state = new MenuState()
        });
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        const [x, y] = [screenWidth / 2, screenHeight / 2];
        DrawingHelpers.fillText(ctx, 'Game Over', x, y, '80px sans-serif', 'red');
        DrawingHelpers.fillText(ctx, 'Press Enter to Return to Menu', x, y + 70, '30px sans-serif', 'white');
    }
}