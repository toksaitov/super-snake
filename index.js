import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const expressServer = express();
const httpServer = http.createServer(expressServer);
const ioServer = socketIO(httpServer); 

const port = 80;
const tick = 33.3;

expressServer.use(express.static('public'));

ioServer.on('connection', socket => {
    console.log(`A new player has connected with id ${socket.id}`);

    socket.on('spawn', () => {
        console.log(`A new player with id ${socket.id} has issued a spawn command.`);

        // TODO: 1. Find a base. Disconnect if there are no bases left.
        // TODO: 2. Create a new snake

        socket.on('command', key => {
            switch (key) {
                case 'w':
                    // TODO: turn snake up
                    break;
                case 'a':
                    // TODO: turn snake left
                    break;
                case 's':
                    // TODO: turn snake down
                    break;
                case 'd':
                    // TODO: turn snake right
                    break;
            }
            
            console.log(`Player with id ${socket.id} has issued a ${key} command.`);
        });

        socket.on('disconnect', reason => {
            console.log(`The player with id ${socket.id} has disconnected.\nReason: ${reason}.`);

            // TODO: make the snake dead
        })
    });
});

setInterval(() => {
    // TODO: move snakes
    ioServer.emit('update', 'todo: replace with real snake data');
}, tick);

httpServer.listen(port, () => console.log(`Snake server is listening on port ${port}.`));
