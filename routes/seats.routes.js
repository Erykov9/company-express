const express = require('express');
const router = express.Router();
const db = require('../db');
const seatsController = require('../controllers/seats.controller');
const Seat = require('../models/seat.model');


router.get('/seats', seatsController.getAll);

router.get('/seats/:id', seatsController.getById);

router.post('/seats', seatsController.Post);

router.delete('/seats/:id', seatsController.Delete);

router.put('/seats/:id', seatsController.Put);

module.exports = router;