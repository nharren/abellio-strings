'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));

app.get('/', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.get('/about', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.get('/services', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.get('/repertoire', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.get('/samples', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.get('/contact', function(request, response) {
  response.sendFile('index.html', { root: './public' });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));