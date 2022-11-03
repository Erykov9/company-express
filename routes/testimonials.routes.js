const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(d => d.id === req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  let id = req.body;

  let randomId = Math.floor(Math.random() * 10000).toString();

  if(!db.testimonials.find(d => d.id === randomId)) {
    id = randomId;
  } else {
    randomId = Math.floor(Math.random() * 10000).toString();
  };

  const obj = {
    id: randomId,
    author: 'Random author',
    text: 'Random text',
  }

  db.testimonials.push(obj);

  res.json({message: 'OK'})
});

router.route('/testimonials/:id').put((req, res) => {
  const dbId = db.testimonials.find(d => d.id === req.params.id);
  dbId.author = 'test'
  dbId.text = 'test test';
  

  res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  const { id } = req.params.id;
  const dbIndex = db.testimonials.findIndex(d => d.id === id);

  db.testimonials.splice(dbIndex, 1);

  return res.json({message: 'OK'});
});

module.exports = router;