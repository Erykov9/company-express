const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert =  require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcert1 = new Concert({ 
      _id: '5d9f1140f10a81216cfd4408',   
      performer: 'John Doe',
      genre: 'Rap',
      price: 25,
      day: 1,
      image: 'random/image.png' 
    });
    await testConcert1.save();

    const testConcert2 = new Concert({ 
      _id: '5d9f1159f81ce8d1ef2bee48',   
      performer: 'Jane Doe',
      genre: 'Pop',
      price: 30,
      day: 1,
      image: 'random/image.jpg' 
    });
    await testConcert2.save();

  });


  after(async () => {
    await Concert.deleteMany();
  });

  it('should return "ticket" attribute', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.body.ticket).to.be.not.null;
  });
});