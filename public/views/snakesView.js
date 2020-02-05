import SnakeView from './snakeView.js';

export default class SnakesView {
    static draw(ctx, snakes) {
        for (const snake of Object.values(snakes)) {
            SnakeView.draw(ctx, snake)
        }
    }
}
