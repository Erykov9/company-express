const express = require('express');
const router = express.Router();
const db = require('../db');


router.route('/seats').get((req, res) =>  {
  res.send(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.send(db.seats.find(d => d.id === req.params.id));
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  let id = req.body;

  let randomId = Math.floor(Math.random() * 10000).toString();

  if(!db.concerts.find(d => d.id === randomId)) {
    id = randomId;
  } else {
    randomId = Math.floor(Math.random() * 10000).toString();
  };

  const obj = {
    id: randomId,
    day: 1,
    seat: 666,
    client: 'RANDOMOWY ZIOMEK',
    email: 'RANDOMOWYZIOMEK@GMAIL.COM',
  };

  db.seats.push(obj);
  res.send({message: 'OK'})
});

router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params.id;
  const concertIndex = db.seats.findIndex(d => d.id === id);

  db.seats.splice(concertIndex, 1);

  return res.send({message: 'OK'});
});

router.route('/seats/:id').put((req, res) => {
  const dbId = db.seats.find(d => d.id === req.params.id);
  dbId.day = 'PUT/EDIT TEST';
  dbId.seat = 'TEST';
  dbId.client = 420;
  dbId.email = 69;
  
  res.send({message: 'OK'});
});

module.exports = router;