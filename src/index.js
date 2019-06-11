const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const CLUSTER_URL = 'mongodb+srv://semana7:vSYCejvloEaqevRH@cluster0-y7uig.mongodb.net/semanaomni?retryWrites=true&w=majority'

mongoose.connect(CLUSTER_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(require('./routes'));

server.listen(3333, () => console.log("Running on 3333"));