const db = [
  { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
  { id: '2', author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: '3', author: 'Eryk Szczepanek', text: 'Siemanko, witam w mojej kuchni'}
];


let randomId = Math.floor(Math.random() * 4 + 1).toString();
console.log(randomId)

if(!db.find(d => d.id === randomId)) {
  console.log(db)
  id = randomId;
}
