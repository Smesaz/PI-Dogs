/* eslint-disable import/no-extraneous-dependencies */
const expect  = require('chai').expect;
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Breed, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  height_min:6,
  height_max:12,
  weight_min:10,
  weight_max:18,
};

describe('routes /Dogs', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Breed.sync({ force: true })
    .then(() => Breed.create(dog)));
  describe('GET /dogs', () => {
    it('searching all breeds', () =>
      agent.get('/dogs').expect(200)
    );
    it('should get 200 when searching the specific breed`s name', () =>
      agent.get('/dogs?name=Pug').expect(200)
    );
    it('should get 404 when searching a incorrect breed`s name', () =>
      agent.get('/dogs?name=wdwd').expect(404)
    );
  });
  beforeEach(() => Temperament.sync({ force: true }));
  describe('GET /temperament', () => {
    it('searching all temperaments in the dogs api', () =>{
      return Temperament.create({})
      .then(()=>{
        return agent.get('/temperament')
        .expect(200);
      })
      .then(Temperaments=>{
        expect(Temperaments.body[0]).to.equal('Stubborn');
        expect(Temperaments.body[10]).to.equal('Happy');
        expect(Temperaments.body[60]).to.equal('Joyful');
        expect(Temperaments.body[120]).to.equal('Diligent');
        expect(Temperaments.body[123]).to.equal('Vigilant');
        
      })
    });
  });
  describe('POST /dog', () => {
    it('Receive the data collected from the controller form ', () =>{
      return agent.post('/dog')
      .send({
      name:"Pug",
      life_span:"15 years",
      temperament:["Stubborn", "Curious", "Clever", "Adventurous", "Active","Fun-loving"],
      height_min:6,
      height_max:12,
      weight_min:10,
      weight_max:18,
      })
      .expect(200)
    });
    it('should get 400 if the required params were not register',()=>{
      return agent.post('/dog')
      .send({
      name:"Pug",
      life_span:"15 years",
      temperament:["Stubborn", "Curious", "Clever", "Adventurous", "Active","Fun-loving"],
      })
      .expect(400)
    })
    it('should get 400 if the required params were not register',()=>{
      return agent.post('/dog')
      .send({
      life_span:"15 years",
      temperament:["Stubborn", "Curious", "Clever", "Adventurous", "Active","Fun-loving"],
      height_min:6,
      height_max:12,
      weight_min:10,
      weight_max:18, 
    })
      .expect(400)
    })
  });
});
