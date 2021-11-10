const { Router } = require('express');
const router = Router();

const { Breed, Temperament } = require('../db');

const axios = require('axios');
require('dotenv').config();
const {API_KEY}= process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ApiDogs= async()=>{
    const All_data_Api= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const data_Api = await All_data_Api.data.map(b=>{
        const obj = {
            id: b.id,
            name: b.name,
            image: b.image.url,
            temperament: b.temperament,
            weight_min: b.weight.metric.split('-').map(e=>e.trim())[0],
            weight_max: b.weight.metric.split('-').map(e=>e.trim())[1],
            height_min: b.height.metric.split('-').map(e=>e.trim())[0],
            height_max: b.height.metric.split('-').map(e=>e.trim())[1],
            life_span: b.life_span,
            bred_for: b.bred_for,
            breed_group: b.breed_group,
        }
        return obj;
    });
    return data_Api;
}
const DBDogs = async ()=>{
     return await Breed.findAll({
         include: {
             model: Temperament,
             attributes:["name"],
             through: {
                 attributes:[],
             },
         }
     })
}

const DB_Api_Dogs= async()=>{
    const apiDogs = await ApiDogs();
    const dbDogs= await DBDogs();
    const allDogs= [...apiDogs,...dbDogs];
    return allDogs;
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', async(req, res)=>{
    const {name}= req.query;
    const db_api_Dogs = await DB_Api_Dogs();
    const allDogs=db_api_Dogs.map(b=>{
        const obj={
            name:b.name,
            image:b.image,
            temperament:b.temperament || b.temperaments,
            weight_min:b.weight_min,
            weight_max:b.weight_max,
        }
        return obj;
    })
    if(name){
        const filterDog= allDogs.filter(b=>{
            if(b.name.toLowerCase().includes(name.toLowerCase())) return b });
        return filterDog.length>0 ? res.send(filterDog) : res.status(400).send(`<h1>Dog Breed not Found</h1>`); 
    }
    res.send(allDogs)
});

router.get('/dogs/:id', async(req,res)=>{
    const {id}= req.params;
    const db_api_Dogs = await DB_Api_Dogs();
    if(id){
    const filterDog=db_api_Dogs.filter(b=>{
      if(id==b.id) return b;  
    });
    return filterDog.length>0 ? res.send(filterDog): res.status(404).send(`<h1>Dog Breed id not Found</h1>`);
    }
    return res.status(404).send(`<h1>Dog Breed not Found</h1>`);
});

router.get('/temperament', async(req,res)=>{
    try{const db_api_Dogs = await DB_Api_Dogs();
    const filter_temperaments = db_api_Dogs.map(b=>b.temperament || b.temperaments);
    const fl= filter_temperaments.map(e=>e&& e.split(', ')).flat() ;
    const fl2=fl.filter(b=>{if(b) return b});
    const A = new Set(fl2)
    const result=[...A];

    result.forEach(async(e)=>{
        await Temperament.findOrCreate({
            where:{name: e,},
            defaults:{
                name:e,
            }
        })
    });
    res.send(result);
    } catch (error){
        res.status(404).send(error);
    }

    

});

router.post("/dog", async (req, res) => {
    let {
      name,
      life_span,
      temperament,
      height_min,
      height_max,
      weight_min,
      weight_max,
      image,
    } = req.body;
  
    // no le pasamos los temperamentos, realizamos la funcion aparte
    let dogCreated = await Breed.create({
      name,
      life_span,
      height_min,
      height_max,
      weight_min,
      weight_max,
      image,
    });
    //encontrar los temperamentos que me llegen por body(formulario)
    //los temeramentos los encuentro en Temperament,
    let temperamentDb = await Temperament.findAll({
            where: { name: temperament },
        });
        console.log("tempe",temperamentDb.map(e=>e.temperament));
    dogCreated.addTemperament(temperamentDb);
    res.send("perro creado");
  });

module.exports = router;
