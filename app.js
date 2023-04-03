const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


// socket
const io = new Server(server);
var connections = 0

// config
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('./public'))

// routes
app.get('/', (req, res) => {
    res.status(200).render('index');
});

// clients
io.on('connection', (socket) => {
    connections = Number(connections) + 1;
    console.log(`a user connected total Connections ${connections}`);
    io.emit('num_connections', { count: connections });

    // user
    socket.on('user', (user) => {
        console.log('user: ' + user);
        io.emit('user', user);
    });

    // messages
    socket.on('message', (msg) => {
        console.table(msg);
        io.emit('message', msg);
    });

    socket.on('typing', (data) => {
        if (data.typing == true)
            io.emit('display', data)
        else
            io.emit('display', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});