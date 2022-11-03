const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});

router.route('/concerts/:id').get((req, res) =>  {
  res.send(db.concerts.find(d => d.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
  const { performer, genre,  price, day, image } = req.body;
  let id = req.body;

  let randomId = Math.floor(Math.random() * 10000).toString();

  if(!db.concerts.find(d => d.id === randomId)) {
    id = randomId;
  } else {
    randomId = Math.floor(Math.random() * 10000).toString();
  };

  const obj = {
    id: randomId,
    performer: 'POST TEST',
    genre: 'Rock',
    price: 666,
    day: 343,
    image: '/img/uploads/tralala.jpg'
  };

  db.concerts.push(obj);
  res.send({message: 'OK'})
});

router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params.id;
  const concertIndex = db.concerts.findIndex(d => d.id === id);

  db.concerts.splice(concertIndex, 1);

  return res.send({message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
  const dbId = db.concerts.find(d => d.id === req.params.id);
  dbId.performer = 'PUT/EDIT TEST';
  dbId.genre = 'TEST';
  dbId.price = 420;
  dbId.day = 69;
  dbId.image = '/img/uploads/test.jpeg';
  
  res.send({message: 'OK'});
});

module.exports = router;