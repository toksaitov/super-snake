import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

import FieldModel from './public/models/fieldModel.js';
import SnakesModel from './public/models/snakesModel.js';

const expressServer = express();
const httpServer = http.createServer(expressServer);
const ioServer = socketIO(httpServer); 

const port = 80;
const tick = 33.3;

const field = new FieldModel();
const snakes = new SnakesModel(field);
field.createApple(snakes);

expressServer.use(express.static('public'));

ioServer.on('connection', socket => {
    console.log(`A new player has connected with id ${socket.id}`);

    socket.on('spawn', () => {
        console.log(`A new player with id ${socket.id} has issued a spawn command.`);

        const snake = snakes.spawnSnake(socket.id);
        if (!snake) {
            console.log(`Can't spawn a snake for the player with id ${socket.id}. The room is full.`);
            socket.disconnect();

            return;
        }

        socket.on('command', key => {
            switch (key) {
                case 'w':
                    snake.turnUp();
                    break;
                case 'a':
                    snake.turnLeft();
                    break;
                case 's':
                    snake.turnDown();
                    break;
                case 'd':
                    snake.turnRight();
                    break;
            }
            
            console.log(`Player with id ${socket.id} has issued a ${key} command.`);
        });

        socket.on('disconnect', reason => {
            console.log(`The player with id ${socket.id} has disconnected.\nReason: ${reason}.`);

            snake.isDead = true;
        })
    });
});

httpServer.listen(port, () => {
    console.log(`Snake server is listening on port ${port}.`);

    setInterval(() => {
        snakes.move();
        ioServer.emit('update', [field.serialize(), snakes.serialize()]);
    }, tick);
});
