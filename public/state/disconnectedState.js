import State from './state.js';
import MenuState from './menuState.js';

import DrawingHelpers from '../utilities/drawingHelpers.js';

export default class DisconnectedState extends State {
    constructor(reason) {
        super({
            'enter': () => state = new MenuState()
        });

        this._reason = reason;
    }

    onDraw(ctx, screenWidth, screenHeight) {
        super.onDraw(ctx, screenWidth, screenHeight);

        const [x, y] = [screenWidth / 2, screenHeight / 2];
        DrawingHelpers.fillText(ctx, 'Disconnected', x, y, '80px sans-serif', 'red');
        DrawingHelpers.fillText(ctx, this._reason, x, y + 70, '45px sans-serif', 'DarkRed');
        DrawingHelpers.fillText(ctx, 'Press Enter to Return to Menu', x, y + 160, '30px sans-serif', 'white');
    }
}
