const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try  {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getById = async (req, res) =>  {
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.Post = async (req, res) => {
  try  {
    const {day, seat, client, email}  = req.body;
    const newSeat = new Seat({ day: day,  seat: seat, client: client, day: day, email: email });
    await newSeat.save();
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.Delete =  async (req, res) => {
  try {
    const sea = await Seat.findById(req.params.id);
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ 
        message: 'OK',
        deletedFile: sea
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.Put = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const sea = await Seat.findById(req.params.id);
    if(sea) {
      sea.day = day;
      sea.seat = seat;
      sea.client =  client;
      sea.email = email;
      await con.save();
      res.json({ 
        message: 'OK',
        file: sea
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
