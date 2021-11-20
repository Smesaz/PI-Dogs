const {DB_Api_Dogs} = require('../controller/api_db');
const router = require('express').Router();

router.get('/', async(req, res)=>{
    try{
    const {name}= req.query;
    const db_api_Dogs = await DB_Api_Dogs();
    const allDogs=db_api_Dogs.map(b=>{
        const obj={
            id:b.id,
            name:b.name,
            image:b.image,
            temperament:b.temperament,
            weight_min:b.weight_min,
            weight_max:b.weight_max,
        }
        return obj;
    })
    if(name){
        const filterDog= allDogs.filter(b=>{
            if(b.name.toLowerCase().includes(name.toLowerCase())) return b });
        return filterDog.length>0 ? res.send(filterDog) : res.status(404).send(`<h1>Dog Breed not Found</h1>`); 
    }
    res.send(allDogs)
    } catch (error){
        res.sendStatus(404);
    }
});

router.get('/:id', async(req,res)=>{
    try{
    const {id}= req.params;
    const db_api_Dogs = await DB_Api_Dogs();
    if(id){
    const filterDog=db_api_Dogs.filter(b=>{
      if(id==b.id) return b;  
    });
    return filterDog.length>0 ? res.send(filterDog): res.status(404).send(`<h1>Dog Breed id not Found</h1>`);
    }
    return res.status(404).send(`<h1>Dog Breed not Found</h1>`);
    } catch(error){
        res.status(404).send(error);
    }
});

module.exports= router;