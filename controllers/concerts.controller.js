const Concert =  require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try  {
    const seats = await Seat.find()
    let concert =  await Concert.find()

    concert = concert.map(con => {
      con.tickets = seats.filter(s => s.day === con.day).length;
      return con
    })
    
    res.json(concert);
  }
  catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getById =  async (req, res) =>  {
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.Post = async (req, res) => {
  try  {
    const {performer, genre, price, day, image}  = req.body;

    const newConcert = new Concert({ performer: performer,  genre: genre,  price: price, day: day, image: image });
    await newConcert.save();
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.Delete =  async (req, res) => {
  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ 
        message: 'OK',
        deletedFile: con
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.Put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const con = await Concert.findById(req.params.id);
    if(con) {
      con.performer = performer;
      con.genre = genre;
      con.price =  price;
      con.day = day;
      con.image = image;
      await con.save();
      res.json({ 
        message: 'OK',
        file: con
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
