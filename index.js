import MenuState from './state/menuState.js'

function setup(ctx, w, h) {
    window.state = new MenuState(); // TODO: fix global window hack
    window.requestAnimationFrame(timestamp => draw(ctx, w, h, timestamp));
}

function draw(ctx, w, h, timestamp) {
    if (w != window.innerWidth || h != window.innerHeight) {
        w = canvas.width  = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    state.onDraw(ctx, w, h);

    window.requestAnimationFrame(timestamp => draw(ctx, w, h, timestamp));
}

function keyDown(key) {
    state.onKeyDown(key);
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const w = canvas.width  = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    setup(canvas.getContext('2d'), w, h);
    document.addEventListener('keydown', e => keyDown(e.key))
});
