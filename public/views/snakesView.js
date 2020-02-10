import SnakeView from './snakeView.js';

export default class SnakesView {
    static draw(ctx, snakes) {
        for (const snake of Object.values(snakes)) {
            if (snake.isDead) { SnakeView.draw(ctx, snake) }
        }
        for (const snake of Object.values(snakes)) {
            if (!snake.isDead) { SnakeView.draw(ctx, snake) }
        }
    }
}
