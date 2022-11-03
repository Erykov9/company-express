const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = [
  { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
  { id: '2', author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: '3', author: 'Eryk Szczepanek', text: 'Siemanko, witam w mojej kuchni'}
];

app.get('/testimonials', (req, res) => {
  res.send(db);
});

app.get('/testimonials/random', (req, res) => {
  res.send(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.send(db.find(d => d.id === req.params.id));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  let id = req.body;

  let randomId = Math.floor(Math.random() * 10000).toString();

  if(!db.find(d => d.id === randomId)) {
    id = randomId;
  } else {
    randomId = Math.floor(Math.random() * 10000).toString();
  };

  const obj = {
    id: randomId,
    author: 'Random author',
    text: 'Random text',
  }

  db.push(obj);

  res.send({message: 'OK'})
});

app.put('/testimonials/:id', (req, res) => {
  const dbId = db.find(d => d.id === req.params.id);
  dbId.author = 'test'
  dbId.text = 'test test';
  

  res.send({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const { id } = req.params.id;
  const dbIndex = db.findIndex(d => d.id === id);

  db.splice(dbIndex, 1);

  return res.send({message: 'OK'});
});



app.listen(8000, () => {
  console.log('Server is running on port: 8000')
})