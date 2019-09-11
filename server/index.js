/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

// My things - start
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const websocketPort = '3001';
server.listen(websocketPort, () =>
  console.log(`Listening on port ${websocketPort}`),
);

const users = [];
const serverUsers = [];
const chatLogs = [];
io.on('connection', socket => {
  console.log('New client connected');

  socket.on('SEND_USER_TO_SERVER', user => {
    serverUsers.push({ socketId: socket.id, user });
    users.push(user);
    socket.broadcast.emit('NEW_USER_TO_CLIENTS', user);
  });

  socket.on('SEND_MESSAGE_TO_SERVER', message => {
    chatLogs.push(message);
    socket.broadcast.emit('NEW_MESSAGE_TO_CLIENTS', message);
  });

  socket.on('GET_DATA_FROM_SERVER', () => {
    socket.emit('DATA_TO_CLIENT', chatLogs);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// My things - end
