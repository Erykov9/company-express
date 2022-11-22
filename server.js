const express = require('express');
const testimonials = require('./routes/testimonials.routes');
const seats = require('./routes/seats.routes');
const concerts = require('./routes/concerts.routes');
const cors = require('cors');
const path = require('path');
const app = express();
const socket = require('socket.io');
const mongoose  = require('mongoose');

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonials);
app.use('/api', seats);
app.use('/api', concerts);
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({message: 'NOT FOUND 404'});
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

mongoose.connect('mongodb+srv://Erykov9:kodilla2022@musicwebsitedb.ihzwpqr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.once('open', () =>  {
  console.log('Succesfully connected to DATABASE: musicCompanyDB!')
});

db.on('error', err => {
  console.log('Error!', err)
});
