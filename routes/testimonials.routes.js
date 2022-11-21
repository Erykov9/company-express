const express = require('express');
const router = express.Router();
const testimonialController  = require('../controllers/testimonials.controller');

router.get('/testimonials/', testimonialController.getAll);

router.get('/testimonials/:id', testimonialController.getById);

router.post('/testimonials/', testimonialController.Post);

router.delete('/testimonials/:id', testimonialController.Delete);

router.put('/testimonials/:id', testimonialController.Put);
module.exports = router;