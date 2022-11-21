const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concerts.controller');

router.get('/concerts/', concertController.getAll);

router.get('/concerts/:id', concertController.getById);

router.post('/concerts/', concertController.Post);

router.delete('/concerts/:id', concertController.Delete);

router.put('/concerts/:id', concertController.Put);

module.exports = router;