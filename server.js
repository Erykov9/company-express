const express = require('express');
const testimonials = require('./routes/testimonials.routes');
const seats = require('./routes/seats.routes');
const concerts = require('./routes/concerts.routes');
const cors = require('cors');



const app = express();

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api', testimonials);
app.use('/api', seats);
app.use('/api', concerts);



app.use((req, res) => {
  res.status(404).send({message: 'NOT FOUND 404'})
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000')
})