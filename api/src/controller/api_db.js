const axios = require('axios');

require('dotenv').config();
const {API_KEY}= process.env;

const { Breed, Temperament } = require('../db');

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
     let dbDogs=await Breed.findAll({include:{
         model: Temperament,
         attributes: ['name'],
     },});
     return dbDogs.map(b=>{
         return {
             id: b.id+1000,
             name: b.name,
             height_min: b.height_min,
             height_max: b.height_max,
             weight_min: b.weight_min,
             weight_max: b.weight_max,
             life_span: b.life_span,
             image:b.image,
             temperament:b.dataValues.temperaments.map(t=>t.name).join(", "),
         }
     })
}
const DB_Api_Dogs = async()=>{
    const apiDogs = await ApiDogs();
    const dbDogs= await DBDogs();
    const allDogs= [...apiDogs,...dbDogs];
    return allDogs;
}

module.exports={
    DB_Api_Dogs,
}