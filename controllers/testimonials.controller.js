const Testimonial =  require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try  {
    res.json(await Testimonial.find());
  }
  catch(err) {
    res.status(500).json({message: err})
  }
};

exports.getById =  async (req, res) =>  {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(!tes) res.status(404).json({ message: 'Not found' });
    else res.json(tes);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.Post = async (req, res) => {
  try  {
    const {author, text}  = req.body;
    const newTestimonial = new Testimonial({ author: author,  text: text});
    await newTestimonial.save();
    res.json({message: 'OK'});
  } catch(err) {
    res.status(500).json({message: err})
  }
};

exports.Delete =  async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ 
        message: 'OK',
        deletedFile: tes
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.Put = async (req, res) => {
  const { author, text } = req.body;

  try {
    const tes = await Testimonial.findById(req.params.id);
    if(tes) {
      tes.author = author;
      tes.text = text;
      await con.save();
      res.json({ 
        message: 'OK',
        file: tes
      });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
