const { Breed, Temperament, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Breed model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validation', () => {
    beforeEach(() => Breed.sync({ force: true }));
    describe('required attributes', () => {
      it('should throw an error if name is null', (done) => {
        Breed.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Breed.create({ name: 'Pug' });
      });
      it('should have a breed name', (done) =>{
        Breed.create({
          id:1234,
          height_min:3,
          height_max:12,
          weight_min: 5,
          weight_max: 10,
        })
        .then(()=>done('should not have been created'))
        .catch(()=>done());
      });
      it('should have a maximum height ', (done) =>{
        Breed.create({
          name:'pug',
          height_min:3,
          weight_min: 5,
          weight_max: 10,
        })
        .then(()=>done('should not have been created'))
        .catch(()=>done());
      });
      it('should have a minimum height ', (done) =>{
        Breed.create({
          name:'pug',
          height_max:15,
          weight_min: 5,
          weight_max: 10,
        })
        .then(()=>done('should not have been created'))
        .catch(()=>done());
      });
      it('should have a maximum weight ', (done) =>{
        Breed.create({
          name:'pug',
          height_min:3,
          height_max:12,
          weight_min: 5,
        })
        .then(()=>done('should not have been created'))
        .catch(()=>done());
      });
      it('should have a minimum weigth ', (done) =>{
        Breed.create({
          name:'pug',
          height_min:8,
          height_max:15,
          weight_max: 10,
        })
        .then(()=>done('should not have been created'))
        .catch(()=>done());
      });
    });
  });
});

describe('Temperament model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validation', () => {
    beforeEach(() => Temperament.sync({ force: true }));
    describe('temperaments in DB', ()=>{
      it('should work when its a valid temperament', () => {
        Temperament.create({ name: 'Dutiful' });
      });
      it('temperaments should be  string',(done)=>{ 
        Temperament.create({ name:['Wild'] })
        .then(()=>done('should not have been created'))
        .catch(()=>done())
      });
    });
  });
});
