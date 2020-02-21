const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const ConnectFour = require('./connectfour');

app.use(express.static(__dirname + '/public/dist/public'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const game = new ConnectFour();

require('./socketinterface')(io, game);



http.listen(8000, () => console.log('Server started on port 8000'));